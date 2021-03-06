import axios from 'axios';
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import UserContext from '../utilities/ContextProviders/UserContext';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { v4 as uuidv4 } from 'uuid';
import QuillEditor from './QuillEditor';
import Delta from 'quill-delta';

import './nametag.scss'
import MemberList from './MemberList';
import { IPContext } from '../../App';
import ToolbarButton from '../Messenger/ToolbarButton';

const EditDocument = ({authUser, token, docServer}) => {
    const params = useParams();
    const navigate = useNavigate()
    
    const [editor, setEditor] = useState(null)
    const [document, setDocument] = useState(null)
    const [sid, setSid] = useState(uuidv4());
    
    const [deltaNotSent] = useState([])
    const [deltaNotACKed] = useState([null])
    const [isACKed] = useState([true])
    const [baseVersion] = useState([])
    const [transformedChange] = useState([])
    const [memberColors] = useState({})
    const editorContainer = useRef(null); 
    
    window.Delta = Delta
    const fetchDocument = async () => {
        const url = `/workspaces/${params.wno}/channels/${params.cno}/documents/${params.docNo}`
        const response = await axios.get(url)
              
        baseVersion[0] = response.data.data.version
        let timer = setInterval(() => {
            if(window.document.getElementById('document-title')){
                window.document.getElementById('document-title').value = response.data.data.title
                clearInterval(timer)
            }
        }, 100) 
        window.qe.clipboard.dangerouslyPasteHTML(response.data.data.contents)
        
        setDocument(response.data.data)
    }

    const fetchHistory = async () => {
        const history = await axios.get(`${docServer}/history/${params.docNo}`)
        
        if(!history.data || history.data.length == 0) return;
        
        history.data.forEach((changeItem) => {
            window.qe.updateContents(changeItem.delta)
        })

        baseVersion[0] = history.data[history.data.length - 1].version
    }
   
    const publish = () => {
        if(deltaNotSent.length == 0) return;
        
        console.log(isACKed)
        // pub??? ?????? ???, ??????????????? ACK??? ?????? ????????????
        if(!isACKed[0]) return;
        isACKed[0] = false;
        
        const bv = deltaNotSent[0].baseVersion
        let i = 0
        for(i = 0; i < deltaNotSent.length; i++){
            if(deltaNotSent[i].baseVersion != bv) break;
        }

        const composedDelta = deltaNotSent.splice(0, i).map(d => d.delta).reduce((composed, curDelta) => composed.compose(curDelta))
        deltaNotACKed[0] = composedDelta
        axios.post(`${docServer}/pub/${params.docNo}`,{
            delta : composedDelta,
            sid: sid,
            baseVersion: bv
        })
    }

    const connectWebsocket = () => {
        const client = new StompJs.Client({
            webSocketFactory: () => new SockJS(`${docServer}/ws`),
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
                    console.dir(body)
                    onTransFormedChangeArrived(JSON.parse(body));
                },{
                    'token' : token
                });

                setInterval(() => {
                    publish()  
                }, 500)
                
                client.subscribe(`/sub/${params.docNo}/save`, async ({body}) => {
                    console.dir(body)
                    fetchDocument()
                    // onTransFormedChangeArrived(JSON.parse(body));
                },{
                    'token' : token
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
    // ?????? ?????????
    const handleChange = (content, delta, source, editor) => {
        if(source != 'user') return;
        
        // push my delta for undo
        deltaNotSent.push({delta, baseVersion : baseVersion[0]})
    }


    // ??????????????? ???????????? ???,
    const onTransFormedChangeArrived = (remoteChange) => {
        transformedChange.push(remoteChange)
        transformedChange.sort((o1, o2) => o1.version > o2.version? 1 : -1)
 
        if(transformedChange[0].version != baseVersion[0] + 1) {
            console.error('version not matched')
            return;
        }

        updateDocument(remoteChange)
    }
    
    const getTransformedOffset = (incomingCursor, incomingSid) => {
        if(deltaNotSent.length == 0 && deltaNotACKed[0] == null){
            return 0;
        }

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

    // remote change??? local??? ??????
    const updateDocument = () => {
        const editor = window.qe;
        
        baseVersion[0] = transformedChange[transformedChange.length - 1].version;
      
        //transform??? change ??????
        //???, deltaNotSent??? ?????? delta?????? ???????????? change??? ???????????? ???
        let finalCursorPos = 0
        let finalChange;

        transformedChange.forEach((change) => {
            if(change.sid == sid) return;
            
            finalChange = change;
            let incomingCursor = 0;

            // if(deltaNotSent.length == 0 && deltaNotACKed[0] == null){
            //     editor.updateContents(change.delta)
            //     return;
            // }
            
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
                window.qe.updateContents([retainOP,...transformedOPs])
            }else{
                window.qe.updateContents(transformedOPs)
            }
            finalCursorPos += incomingCursor
        })
        
        if(finalChange){
            showNameTag(finalCursorPos, finalChange);
        }
        
        transformedChange.splice(0)
       
        isACKed[0] = true;
        deltaNotACKed[0] = null;
    }
    
    
    const showNameTag = (incomingCursor, change) => {    
        
        const pos = window.qe.getBounds(incomingCursor, 0)
        const name = change.nickname
        
        const nameTag = window.document.getElementById(`${change.user}`)
        nameTag && nameTag.parentElement.removeChild(nameTag)
       
        const span = window.document.createElement('span')
        span.id = change.user
        span.classList.add('disqus-comment-count')
        span.classList.add(memberColors[change.user])
        span.style.top = `${93 + pos.top - 10}px`
        span.style.left = `${pos.left}px`
        span.style.backgroundColor = 'blue'
        span.innerText = name;

        // div.append(span);
        // span.outerHTML =  `<span id='${change.user}' class='disqus-comment-count ${memberColors[change.user]}'
        //         style='
        //             top: ${93 + pos.top - 10}px;
        //             left: ${pos.left}px;
        //             background-color: 'blue'
        //         '>${name}</span>`
            
        editorContainer.current.prepend(span)        

        setTimeout(() => {
            // let nameTag = window.document.getElementById(`${change.user}`)
            span && span.parentElement && editorContainer.current.removeChild(span);
        }, 3000)
    }
    window.showNameTag = showNameTag

//////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if(authUser.no && token){
            const client = connectWebsocket();
            fetchDocument()

            return () => {
                client.deactivate()
            }
        }
    }, [authUser, token])
    const removeTags = () => {
        const tags = window.document.getElementsByClassName('disqus-comment-count')
        for(let tag of tags){
            tag.parentElement.removeChild(tag)
        }
    }
    useEffect(() => {
        if(document){
            let timer = setInterval(() => {
                if(authUser.no && window.qe){
                    fetchHistory()
                    clearInterval(timer);
                }
            }, 100)
        }
    }, [document])
    
    useEffect(() => {
        if(editor){
            window.document.getElementsByClassName('ql-container')[0].addEventListener('scroll', removeTags)
            window.document.getElementsByClassName('ql-container')[0].addEventListener('keydown', removeTags)
        }
    }, [editor])
    // ?????? ??????
    const deleteDoc = async () => {
        const deleteConfirmed = window.confirm('????????? ????????????????????????')
        if(deleteConfirmed){
            const url = `/workspaces/${params.wno}/channels/${params.cno}/documents/${params.docNo}`
            await axios.delete(url)
            navigate(`/workspace/${params.wno}/channel/${params.cno}`)
        }
    }

    const initEditor = (editor) => {
        setEditor(editor);
    }

    const setMemberColorWithoutRender = (userNo, color) => {
        memberColors[userNo] = color;
    }
    
    const saveDoc = () => {
        publish()
        const html = window.qe.root.innerHTML;
        axios.put(`${docServer}/save/${params.docNo}`,{
            title : window.document.getElementById('document-title').value,
            contents: html
        })
        alert('?????????????????????')
        navigate(`/workspace/${params.wno}/channel/${params.cno}`)
    }
    return (
        <div>
            <div style={{display:'flex', position:'relative'}}>
                <div  style={{marginRight:'20px'}}>    
                    {authUser && document && authUser.no == document.userNo ? 
                        <ToolbarButton color="crimson" icon="ion-ios-trash" callBackOnClick={deleteDoc}/>
                        : ''}
                </div>
                <div style={{marginRight:'20px'}}>
                    <ToolbarButton color="black" icon="ion-ios-save" callBackOnClick={saveDoc}/>
                </div>
                <MemberList setMemberColorWithoutRender={setMemberColorWithoutRender} sid={sid}/>
            </div>
            <div ref={editorContainer}
                style={{position:'relative'}}>
                <QuillEditor
                    memberColors={memberColors}
                    passEditor={initEditor} 
                    callBackOnChange={handleChange} 
                   />
            </div>
        </div>
    );
};
export default React.memo(EditDocument);