import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../utilities/ContextProviders/UserContext';
import axios from 'axios'
import { useParams } from 'react-router';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import './nametag.scss'
import { IPContext } from '../../App';
const MemberList = ({sid, memberColors,setMemberColorWithoutRender}) => {
    const {docServer} = useContext(IPContext)
    const {authUser, token} = useContext(UserContext)
    const [members, setMembers] = useState([]);
    const [nameTags, setNameTags] = useState([]);
    
    const params = useParams()

    const backgroundColors = ['yellowgreen', 'cadetblue', 'burlywood', '#935e38',
    '#f5838e', '#8eb9e7', '#1c4673','#e7b419','#24b2c9']
    
    const onMemberJoin = (user) => {
        updateMemberList()
    }
    const onMemberLeave = (user) => {
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
        
        setMembers((prev) => {
            const updatedList = response.data.map((updatedMem) => {
                let cache = prev.find((m) => m.no == updatedMem.no)

                if(cache){
                    updatedMem.color = cache.color
                }
                return updatedMem
            });

            updatedList.forEach((mem) => {
                if(!mem.color){
                    mem.color = backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
                    setMemberColorWithoutRender(mem.no, mem.color)
                }
            })
            
            return updatedList
        })
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
            {members.map(mem => {
                return <div style={{  
                    backgroundColor: mem.color,
                    width: '50px',
                    height: '50px',
                    borderRadius: '24px',
                    textAlign:'center',
                    fontSize: '14px',
                    lineHeight: '50px',
                    fontWeight: 'bold',
                    marginRight: '20px',
                    border: '1px solid #bfbebe',
                    color: '#fff'
                }}>{mem.nickname}</div>
            })}
        </div>
    );
};

export default MemberList;