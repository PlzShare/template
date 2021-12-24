import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, useLocation } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import './assets/scss/styles.scss';
import axios from 'axios';
import Login from './layouts/user-pages/Login';
import Mypage from './layouts/user-pages/Mypage';
import Register from './layouts/user-pages/Register';
import WorkList from './layouts/WorkList';
import Invited from './layouts/user-pages/Invited'
import NewChannels from './components/SidebarNav/components/NewChannels'
import NewDocuments from './components/SidebarNav/components/NewDocuments'
import NewChatrooms from './components/SidebarNav/components/NewChatrooms'
import {UserContextProvider} from './components/utilities/ContextProviders/UserContext';
import routes from './router'
import Noti from './components/Messenger/Noti'

import WorkspaceAdd from './layouts/WorkspaceAdd';

import EditDocument from './components/Editor/EditDocument';

export const IPContext = createContext();
export default function App() {
  axios.defaults.baseURL = '/api'
  axios.defaults.withCredentials = true;
 
  const workspacePath = '/workspace/:wno';

  // const [notiServer] = useState('http://localhost:8888');
  // const [chatServer] = useState('http://localhost:8081');
  const [docServer] = useState('http://localhost:4444/share-doc');
  
  const [notiServer] = useState('http://34.64.107.41:8888');
  const [chatServer] = useState('http://34.64.107.41:8081');
  // const [docServer] = useState('http://34.64.213.19:9999/share-doc');
  
  const [authUser,setAuthUser] = useState({})
  const [token,setToken] = useState()
  
  const updateAuthUser = (userinfo) => {
    setAuthUser(userinfo)
  }
  const updateToken = (token) => {
    setToken(token)
  }
  console.log('=================================================')
  return (
    <Router>
      <IPContext.Provider value={{notiServer, chatServer, docServer}}>
        <UserContextProvider callbackAuthUser={updateAuthUser}  callbackToken={updateToken}>
          <Routes>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/worklist' element={<WorkList/>}/>
              <Route path='/workspaceadd' element={<WorkspaceAdd/>} />
              <Route path='/mypage' element={<Mypage />} />
              <Route path='/invited' element={<Invited />} />
              <Route path='/newChannels' element={<NewChannels />} />
              <Route path='/newDocuments' element={<NewDocuments />} />
              <Route path='/newChatrooms' element={<NewChatrooms />} />

              
              <Route path={workspacePath} element={<DashboardLayout/>}>
                  {routes.filter((el) => el.path == workspacePath)[0].children.map((el) => {
                    return <Route path={el.path} element={<el.component/>} />
                  })}
                  {/* <Route path='channel/:cno/edit-document/:docNo' element={React.memo(<EditDocument/>)}/> */}
                  <Route path='channel/:cno/edit-document/:docNo' element={<EditDocument 
                  authUser={authUser}
                  token={token}
                  docServer={docServer}/>}/>
              </Route>
          </Routes>
          <Noti />
        </UserContextProvider>
      </IPContext.Provider>
    </Router>
  );
}