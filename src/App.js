import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './assets/scss/styles.scss';
import axios from 'axios';
import Login from './layouts/user-pages/Login';
import Register from './layouts/user-pages/Register';
import WorkList from './layouts/WorkList';
export default function App() {
  axios.defaults.baseURL = '/api'
  // axios
  //   .get('/workspaces/1/channels/1/documents')
  //   .then((response) => {
  //     console.dir(response)
  //   })
  // fetch('/api/workspaces/1/channels/1/documents')
  return (
    <BrowserRouter>
      
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>

        {/* <Route path='/workspace' component={Worksp}/> */}

        <Route path='/worklist' component={WorkList}/>

        <Route path='/' component={DashboardLayout} />
      </Switch>
    </BrowserRouter>
  );
}