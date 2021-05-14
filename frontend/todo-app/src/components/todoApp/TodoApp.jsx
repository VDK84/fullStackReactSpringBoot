import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import TodoComponent from './TodoComponent.jsx'
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
                            <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>   
                    <FooterComponent/>                 
                </Router>                
            </div>
        );
    }
}

function ErrorComponent(){
    return <h2>Opps! An Error Ocurred.</h2>
}
export default TodoApp;