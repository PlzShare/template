import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './assets/scss/styles.scss';

export default function App() {
  fetch('/api/workspaces/1/channels/1/documents')
  return (
    <BrowserRouter>
      <Switch>
        <Route component={DashboardLayout} />
      </Switch>
    </BrowserRouter>
  );
}
