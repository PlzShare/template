import React, { createContext, useEffect, useState } from 'react';

const IPContext = createContext();

export const IPContextProvider = ({children}) => {
    // const [notiServer] = useState('http://localhost:8888');
    // const [chatServer] = useState('http://localhost:8081');
    // const [docServer] = useState('http://localhost:4444/share-doc');

    const [notiServer] = useState('http://34.64.107.41:8888');
    const [chatServer] = useState('http://34.64.107.41:8081');
    const [docServer] = useState('http://34.64.213.19:9999/share-doc');
    
    return (
        <IPContext.Provider value={{notiServer, chatServer, docServer}}>
            {children}
        </IPContext.Provider>
    );
};

export default IPContext;