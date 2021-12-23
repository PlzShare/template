import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import IPContext from './IPContext';

const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState({});
    const [token, setToken] = useState();
    const navigate = useNavigate()
    const location = useLocation()
    const [roomNumber, setRoomNumber] = useState(null);
    const [noti, setNoti] = useState(null);
    const [stompClient, setStompClient] = useState({})
    const {chatServer} = useContext(IPContext)

    const fetchAuthUser = async () => {
        // loginUser 정보 가져오기
        // axios.get
        try { 
            const response = await axios.get('/users/login');

          } catch (error) {
            
            console.error(error);
          }   
    }

    const storeToken = (token) => {
        // 토큰 받음
        // axios default 설정 (모든 요청 시, Authorization Header에 Token 실어서 보내기)
        axios.defaults.headers['Authorization'] = token
        // token을 localstorage에 저장(추후 변경)
        localStorage.setItem('token', token)
        
        // token 해석해서, authUser에 로그인한 user정보 저장
        const parsedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        const userInfo = {
            no : parsedToken.no, 
            id : parsedToken.id, 
            name : parsedToken.name, 
            nickname : parsedToken.nickname, 
            profile :  parsedToken.profile
        } 
        setToken(token)
        setAuthUser(userInfo)
    }

    /**
     * Web Socket
     */
    console.log(noti, "Dfdfasdfasdf")
    const connect = () => {
        stompClient.noti = new StompJs.Client({
            webSocketFactory: () => new SockJS(`${chatServer}/websocket`),
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                stompClient.noti.subscribe(`/sub/${authUser.no}`, ({body}) => {
                    // setNoti(JSON.parse(body));
                    console.log(body);
                    console.dir(JSON.parse(body))
                    setNoti(JSON.parse(body));
                });
                
            },
            onStompError: (frame) => {
                console.error(frame);
            },
        });
        stompClient.noti.activate()
    }

    const disconnect = () => {
        stompClient.noti.deactivate();
    };

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token && token != 'undefined'){
            // 저장된 토큰이 있으면 == 로그인 한 상태이면
            // axios default 설정 (모든 요청 시, Authorization Header에 Token 실어서 보내기)
            storeToken(token)
            if(location.pathname == '/') navigate('/worklist')
        }else{
            //로그인 안한 상태면 login 페이지로 보내기
            navigate('/login')
        }

        return () => {
            if(stompClient.noti){
                disconnect()
            }
        }
    },[])

    useEffect(() => {
        if(authUser.no){
            // Websocket connect
            connect()
        }else if(stompClient.noti){
            disconnect()
        }
    }, [authUser])

    return (
        <UserContext.Provider value={{authUser, storeToken, noti, setNoti, token, setRoomNumber, roomNumber}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;