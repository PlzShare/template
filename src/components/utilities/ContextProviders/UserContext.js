import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate()
    const location = useLocation()
    
    const fetchAuthUser = async () => {
        // loginUser 정보 가져오기
        // axios.get
    }
    
    const storeToken = (token) => {
        // 토큰 받음
        // axios default 설정 (모든 요청 시, Authorization Header에 Token 실어서 보내기)
        axios.defaults.headers['Authorization'] = token
        
        // token을 localstorage에 저장(추후 변경)
        localStorage.setItem('token', token)
        
        // token 해석해서, authUser에 로그인한 user정보 저장
        const userInfo = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).user
        setAuthUser(userInfo)
        
    }
    console.log(authUser)
    useEffect(() => {
        
        const token = localStorage.getItem("token")
        if(token){
            // 저장된 토큰이 있으면 == 로그인 한 상태이면
            // axios default 설정 (모든 요청 시, Authorization Header에 Token 실어서 보내기)
            axios.defaults.headers['Authorization'] = token 
            
            // token 해석해서, authUser에 로그인한 user정보 저장
            const userInfo = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).user
            console.log('=====================================')
            console.dir(userInfo)
            setAuthUser(userInfo)

            if(location.pathname == '/') navigate('/worklist')
            
        }else{
            //로그인 안한 상태면 login 페이지로 보내기
            navigate('/login')
        }
    },[])

    return (
        <UserContext.Provider value={{authUser, storeToken}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;