import React from 'react';
import LogIn from './components/login.jsx';
import App from './App.jsx';
import { render } from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

render(
    <BrowserRouter>
        <Switch>
            <Route exact path = '/' component = {LogIn} />
            <Route path = '/tienda' component = {App} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
)