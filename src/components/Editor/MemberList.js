import React, { useContext, useEffect, useState } from 'react';
import IPContext from '../utilities/ContextProviders/IPContext';
import UserContext from '../utilities/ContextProviders/UserContext';
import axios from 'axios'
import { useParams } from 'react-router';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
const MemberList = ({sid}) => {
    const {docServer} = useContext(IPContext)
    const {authUser, token} = useContext(UserContext)
    const [members, setMembers] = useState([]);
    const params = useParams()
    const backgroundColors = ['yellow', 'limegreen', 'lightgrey', 'skyblue','lightseagreen', 'pupple', 'hotpink','coral','crimson']
    const onMemberJoin = (body) => {
        updateMemberList()
    }
    const onMemberLeave = (body) => {
        updateMemberList()
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
            onConnect: async () => {
                client.subscribe(`/sub/${params.docNo}/members`, ({body}) => {
                    const user = JSON.parse(body)
                    if(user.action == 'join'){
                        onMemberJoin(user)   
                    }else{
                        onMemberLeave(user)
                    }
                })
                await axios.post(`${docServer}/join/${params.docNo}?sid=${sid}`)
                updateMemberList()
                
            },
            onStompError: (frame) => {
                console.error(frame);
            },
        })
        client.activate();
        return client;
    }

    const updateMemberList = async () => {
        const response = await axios.get(`${docServer}/members/${params.docNo}`)
        console.dir(response.data)
        setMembers(response.data)
    }

    const notifyLeave = () => {
        axios.post(`${docServer}/leave/${params.docNo}?sid=${sid}`)
    }

    useEffect(() => {
        if(authUser.no){
            const client = connectWebsocket();
            return () => {
                client.deactivate()
                notifyLeave()
            }
        }
        return () => {
            notifyLeave()
        }
    }, [authUser])

    return (
        <div style={{
            display:'flex',
            marginLeft:'auto'
        }}>
            {members.map(mem => 
                <div style={{  
                    backgroundColor:backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
                    width: '50px',
                    height: '50px',
                    borderRadius: '24px',
                    textAlign:'center',
                    fontSize: '14px',
                    lineHeight: '50px',
                    fontWeight: 'bold',
                    marginRight: '20px',
                    border: 'solid 3px darkblue'
                }}>{mem.nickname}</div>)}
        </div>
    );
};

export default MemberList;