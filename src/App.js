import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, useLocation } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import './assets/scss/styles.scss';
import axios from 'axios';
import Login from './layouts/user-pages/Login';
import Mypage from './layouts/user-pages/Mypage';
import Invite from './layouts/user-pages/Invite';
import Register from './layouts/user-pages/Register';
import WorkList from './layouts/WorkList';
import {UserContextProvider} from './components/utilities/ContextProviders/UserContext';
import routes from './router'
import Noti from './components/Messenger/Noti'
import Setting from './layouts/Setting';
import WorkspaceAdd from './layouts/WorkspaceAdd';

export default function App() {
  axios.defaults.baseURL = '/api'
  axios.defaults.withCredentials = true;
 
  const workspacePath = '/workspace/:wno';

  console.log('=================================================')
  return (
    <Router>
        <UserContextProvider>
        <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/worklist' element={<WorkList/>}/>
            <Route path='/workspaceadd' element={<WorkspaceAdd/>} />
            <Route path='/mypage' element={<Mypage />} />
            <Route path='/invite' element={<Invite />} />
            
            <Route path={workspacePath} element={<DashboardLayout/>}>
                {routes.filter((el) => el.path == workspacePath)[0].children.map((el) => {
                  return <Route path={el.path} element={<el.component/>} />
                })}
            </Route>
        </Routes>
          <Noti />
        </UserContextProvider>
    </Router>
  );
}