import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoApp extends Component {
    render () {
        return (
            <div className="TodoApp">
                My Todo Application
                <LoginComponent/>
            </div>
        );
    }
}

class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: 'guest',
            password: 'guest'
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
               
    }
    render (){
        return (
            <div>
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleUserNameChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                <button>Login</button>
            </div>
        );
    }

    handleUserNameChange(event){
        this.setState({username:event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password:event.target.value});
    }
}

export default TodoApp;