import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import UserContext from '../utilities/ContextProviders/UserContext';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { v4 as uuidv4 } from 'uuid';
import QuillEditor from './QuillEditor';
import Delta from 'quill-delta';
const EditDocument = () => {
    const params = useParams();
    const navigate = useNavigate()
    const {authUser, token} = useContext(UserContext)
    
    const [editor, setEditor] = useState(null)
    const [document, setDocument] = useState(null)
    const [sid, setSid] = useState(uuidv4());

    const [deltaNotSent] = useState([])
    const [deltaNotACKed] = useState([null])
    const [isACKed] = useState([true])
    const [baseVersion] = useState([])

    const [transformedChange] = useState([])

    window.Delta = Delta
    const fetchDocument = async () => {
        const url = `/workspaces/${params.wno}/channels/${params.cno}/documents/${params.docNo}`
        const response = await axios.get(url)
        
        baseVersion[0] = response.data.data.version
        window.document.getElementById('document-title').value = response.data.data.title

        setDocument(response.data.data)
    }

    const fetchHistory = async () => {
        const history = await axios.get(`http://localhost:4444/share-doc/history/${params.docNo}`)
        
        if(!history.data || history.data.length == 0) return;
        
        console.dir(history)
        // history.data.forEach((changeItem) => {
        //     changeItem.deltas.forEach((delta) => {
        //         console.dir(new Delta())
        //         console.dir(delta)
        //         editor.updateContents(delta)
        //     })
        // })
        history.data.forEach((changeItem) => {
            editor.updateContents(changeItem.delta)
        })

        baseVersion[0] = history.data[history.data.length - 1].version
    }


    const connectWebsocket = () => {
        const client = new StompJs.Client({
            webSocketFactory: () => new SockJS("http://localhost:4444/share-doc/ws"),
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            connectHeaders:{
                'token' : token
            },
            onConnect: () => {
                client.subscribe(`/sub/${params.docNo}`, ({body}) => {
                    onTransFormedChangeArrived(JSON.parse(body));
                },{
                    'token' :'token'
                });
            },
            onStompError: (frame) => {
                console.error(frame);
            },
        })
        client.activate();
        return client;
    }
    
///////////////////////////////////////////////////////////////////////
    // 문서 동기화
    const handleChange = (content, delta, source, editor) => {
        // console.log('===========source==============')
        // console.dir(source)
        if(source == 'user'){
            console.log('===========delta==============')
            console.dir(delta)
        }
        if(source != 'user') return;
        
        // push my delta for undo
        deltaNotSent.push({delta, baseVersion : baseVersion[0]})
    }


    // 변경사항이 도착했을 때,
    const onTransFormedChangeArrived = (remoteChange) => {
        transformedChange.push(remoteChange)
        transformedChange.sort((o1, o2) => o1.version > o2.version? 1 : -1)
 
        if(transformedChange[0].version != baseVersion[0] + 1) {
            alert('version not matched')
            return;
        }

        updateDocument(remoteChange)
    }
    
    const getTransformedOffset = (incomingCursor, incomingSid) => {
        let localCursor = 0
        let offset = 0;
        let len;

        let deltas = []
        if(deltaNotACKed[0] != null){
            deltas.push(deltaNotACKed[0])
        }
        if(deltaNotSent.length > 0){
            deltas.push(...deltaNotSent.map(d => d.delta))
        }
        const localOPs = deltas
                            .reduce((composed, curDelta) => composed.compose(curDelta))
                            .ops

        for(let localOP of localOPs){
            if(localCursor > incomingCursor) break;
            if(localCursor == incomingCursor && incomingSid < sid) break;

            if(localOP.retain) localCursor += localOP.retain
            if(localOP.insert){
                if(typeof localOP.insert == 'string'){
                    len = localOP.insert.length
                }else{
                    len = 1
                }
                offset += len;
                localCursor += len;
            }

            if(localOP.delete){
                offset -= localOP.delete
            }
        }
        return offset
    }

    // remote change를 local에 반영
    const updateDocument = (remoteChange) => {
        const editor = window.qe;
        
        baseVersion[0] = transformedChange[transformedChange.length - 1].version;
        
        console.dir(transformedChange)
        //transform된 change 적용
        //단, deltaNotSent에 있는 delta들을 고려하여 change를 적용해야 함
        transformedChange.forEach((change) => {
            if(change.sid == sid) return;
            
            if(deltaNotSent.length == 0 && deltaNotACKed[0] == null){
                editor.updateContents(change.delta)
                
                return;
            }
            
            let incomingCursor = 0;
            let retainOP

            if(!(Object.keys(change.delta.ops[0]).length == 1
                && change.delta.ops[0].retain)){
                  const offset = getTransformedOffset(incomingCursor, change.sid)
                    
                if(offset != 0){
                    retainOP = {retain: offset}
                    incomingCursor += offset;
                }
            }

            const transformedOPs = change.delta.ops.map((incomingOP) => {
                if(incomingOP.retain) incomingCursor += incomingOP.retain
                
                let len
                if(incomingOP.insert){
                    if(typeof incomingOP.insert == 'string'){
                        len = incomingOP.insert.length
                    }else {
                        len = 1
                    }
                    incomingCursor += len
                }

                if(!(Object.keys(incomingOP).length == 1 && incomingOP.retain)) return incomingOP;

                console.log('before transforemd...' , incomingOP)
                let offset = getTransformedOffset(incomingCursor, change.sid)
                if(offset != 0){
                    incomingCursor += offset
                    incomingOP.retain += offset 
                }
                console.log('transformed incoming OP... ', incomingOP)

                return incomingOP
            })

            if(retainOP){
                editor.updateContents([retainOP,...transformedOPs])
            }else{
                editor.updateContents(transformedOPs)
            }
        })
        
        
        transformedChange.splice(0)
        isACKed[0] = true;
        deltaNotACKed[0] = null;
    }

    
    const publish = () => {
        if(deltaNotSent.length == 0) return;
        
        // pub을 보낸 후, 서버로 부터 ACK를 받지 않았으면
        if(!isACKed[0]) return;
        isACKed[0] = false;
        
        const bv = deltaNotSent[0].baseVersion
        let i = 0
        for(i = 0; i < deltaNotSent.length; i++){
            if(deltaNotSent[i].baseVersion != bv) break;
        }

        const composedDelta = deltaNotSent.splice(0, i).map(d => d.delta).reduce((composed, curDelta) => composed.compose(curDelta))
        deltaNotACKed[0] = composedDelta
        axios.post(`http://localhost:4444/share-doc/pub/${params.docNo}`,{
            delta : composedDelta,
            sid: sid,
            baseVersion: bv
        })
    }

//////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if(authUser.no){
            fetchDocument()
            const client = connectWebsocket();
            return () => {
                client.deactivate()
            }
        }
    }, [authUser])
    useEffect(() => {
        if(document && editor){
            fetchHistory()
        }

    }, [document, editor])
    useEffect(() => {
        setInterval(() => {
            // alert('pub')
            publish()  
        }, 1500)

        return () => {
            publish()
        }
    },[])

    // 문서 삭제
    const deleteDoc = async () => {
        const deleteConfirmed = window.confirm('정말로 삭제하시겠습니까')
        if(deleteConfirmed){
            const url = `/workspaces/${params.wno}/channels/${params.cno}/documents/${params.docNo}`
            await axios.delete(url)
            navigate(`/workspace/${params.wno}/channel/${params.cno}`)
        }
    }

    const initEditor = (editor) => {
        setEditor(editor);
    }

    return (
        <div>
            {authUser && document && authUser.no == document.userNo ? <button className='btn-primary' onClick={deleteDoc}>삭제</button> : ''}
            <QuillEditor passEditor={initEditor} callBackOnChange={handleChange} initDocumentData={document}>
            </QuillEditor>
        </div>
    );
};
export default EditDocument;