import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import UserContext from '../utilities/ContextProviders/UserContext';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { v4 as uuidv4 } from 'uuid';
import QuillEditor from './QuillEditor';
import { Stomp } from '@stomp/stompjs';
const EditDocument = () => {
    const params = useParams();
    const navigate = useNavigate()
    const [sid, setSid] = useState(uuidv4());
    const [document, setDocument] = useState(null)
    const {authUser, token} = useContext(UserContext)
    const [myChange] = useState([])

    const fetchDocument = async () => {
        const url = `/workspaces/${params.wno}/channels/${params.cno}/documents/${params.docNo}`
        const response = await axios.get(url)

        setDocument(response.data.data)
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
                    updateDocument(JSON.parse(body));
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

    const updateDocument = (change) => {
        console.dir(change)
        if(change.sid != sid)
            window.qe.updateContents(change.delta)
    }

    useEffect(() => {
        if(authUser.no){
            fetchDocument()
            const client = connectWebsocket();
            return () => {
                client.deactivate()
            }
        }
    }, [authUser])

    // 문서 삭제
    const deleteDoc = async () => {
        const deleteConfirmed = window.confirm('정말로 삭제하시겠습니까')
        if(deleteConfirmed){
            const url = `/workspaces/${params.wno}/channels/${params.cno}/documents/${params.docNo}`
            await axios.delete(url)
            navigate(`/workspace/${params.wno}/channel/${params.cno}`)
        }
    }

    // 문서 동기화
    const handleChange = (content, delta, source, editor) => {
        console.log('===========source==============')
        console.dir(source)
        if(source != 'user') return;
        console.log('===========delta==============')
        console.dir(delta)
        
        console.log('===========editor==============')
        console.dir(editor)
        
        
        // alert('dddd')
        axios.post(`http://localhost:4444/share-doc/pub/${params.docNo}`,{
            delta : delta,
            sid: sid
        })
    }
    return (
        <div>
            {authUser && document && authUser.no == document.userNo ? <button className='btn-primary' onClick={deleteDoc}>삭제</button> : ''}
            <QuillEditor initDocumentData={document} callBackOnChange={handleChange}/>
            {/* <DocumentEditor initDocumentData={document} callBackOnChange={onChange}/> */}
        </div>
    );
};
export default EditDocument;