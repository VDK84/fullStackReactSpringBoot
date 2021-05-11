import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'


class TodoApp extends Component {
    render () {
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent/>                    
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/welcome/:username" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>
                            <Route path="/logout" component={LogoutComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>   
                    <FooterComponent/>                 
                </Router>                
            </div>
        );
    }
}

function ErrorComponent(){
    return <div>Opps! An Error Ocurred.</div>
}
export default TodoApp;