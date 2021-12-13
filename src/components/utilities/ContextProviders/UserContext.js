import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState({
        no : 2,
        id : 'sh970807'
    });
    const [token, setToken] = useState(null);
    
    const fetchAuthUser = async () => {
        // loginUser 정보 가져오기
        // axios.get

    }

    useEffect(() => {
        if(!token){
        }else{
        }
    },[])

    return (
        <UserContext.Provider value={authUser}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;