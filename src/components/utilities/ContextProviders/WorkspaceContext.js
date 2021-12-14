import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const WorkspaceContext = createContext();

export const WorkspaceContextProvider = ({children}) => {
    const [curWorkspace, setCurWorkspace] = useState({});
    
    console.log('=====================================')
    
    return (
        <WorkspaceContext.Provider value={{curWorkspace, setCurWorkspace}}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export default WorkspaceContext;