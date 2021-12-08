import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './assets/scss/styles.scss';
import axios from 'axios';
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
        <Route component={DashboardLayout} />
      </Switch>
    </BrowserRouter>
  );
}
