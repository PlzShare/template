import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import UserContext from '../utilities/ContextProviders/UserContext';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { v4 as uuidv4 } from 'uuid';
import QuillEditor from './QuillEditor';
import Delta from 'quill-delta';
import { Stomp } from '@stomp/stompjs';
import { transform } from '@babel/core';
const EditDocument = () => {
    const params = useParams();
    const navigate = useNavigate()
    const {authUser, token} = useContext(UserContext)
    
    const [editor, setEditor] = useState(null)
    const [document, setDocument] = useState(null)
    const [sid, setSid] = useState(uuidv4());

    const [deltaNotSent] = useState([])
    const [deltaNotACKed] = useState([])
    const [isACKed] = useState([true])
    const [baseVersion] = useState([])

    const [transformedChange] = useState([])

    const fetchDocument = async () => {
        const url = `/workspaces/${params.wno}/channels/${params.cno}/documents/${params.docNo}`
        const response = await axios.get(url)
        
        baseVersion[0] = response.data.data.version
        window.document.getElementById('document-title').value = response.data.data.title

        setDocument(response.data.data)
    }

    const fetchHistory = async () => {
        const history = await axios.get(`http://localhost:4444/share-doc/history/${params.docNo}`)
        
        if(!history.data) return;
        
        history.data.forEach((changeItem) => {
            changeItem.deltas.forEach((delta) => {
                console.dir(new Delta())
                console.dir(delta)
                editor.updateContents(delta)
            })
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
        deltaNotSent.push(delta)
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

    // remote change를 local에 반영
    const updateDocument = (remoteChange) => {
        //local에 쌓아뒀던 Not ACKed delta를 undo
        if(deltaNotACKed.length > 0){
            let composedDelta = deltaNotACKed.reduce((composed, curDelta) => composed.compose(curDelta))
            console.dir(composedDelta)
            editor.updateContents(new Delta(composedDelta).invert(editor.getContents()))
        }
                
        //transform된 change 적용
        transformedChange.forEach((changeItem) => {
            changeItem.deltas.forEach((delta) => {
                console.dir(delta)
                editor.updateContents(delta)
            })

            if(changeItem.sid == sid){
                //커서 이동
                const lastDelta = changeItem.deltas[changeItem.deltas.length - 1]
                if(lastDelta.ops[1] && lastDelta.ops[1].insert){ 
                    if(typeof lastDelta.ops[1].insert == 'string'){
                        editor.setSelection(lastDelta.ops[0].retain  + lastDelta.ops[1].insert.length)
                    }else{
                        editor.setSelection(lastDelta.ops[0].retain  + 1)
                    }
                }
            }
        }) 

        //baseVersion 변경 및 버퍼 flush
        baseVersion[0] = transformedChange[transformedChange.length - 1].version;
        deltaNotACKed.splice(0)
        transformedChange.splice(0)

        isACKed[0] = true;
    }


    const publish = () => {
        if(deltaNotSent.length == 0) return;
        
        // pub을 보낸 후, 서버로 부터 ACK를 받지 않았으면
        if(!isACKed[0]) return;

        isACKed[0] = false;
        // move
        deltaNotACKed.push(...deltaNotSent.splice(0))
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!=', deltaNotACKed)   

        axios.post(`http://localhost:4444/share-doc/pub/${params.docNo}`,{
            deltas : deltaNotACKed,
            sid: sid,
            baseVersion: baseVersion[0]
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
            <QuillEditor passEditor={initEditor} callBackOnChange={handleChange} initDocumentData={document}/>
            {/* <DocumentEditor initDocumentData={document} callBackOnChange={onChange}/> */}
        </div>
    );
};
export default EditDocument;