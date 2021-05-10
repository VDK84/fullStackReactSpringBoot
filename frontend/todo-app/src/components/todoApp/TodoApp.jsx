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

        this.handleChange = this.handleChange.bind(this);
               
    }
    render (){
        return (
            <div>
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button>Login</button>
            </div>
        );
    }

    handleChange(event){
        console.log(this.state);
        this.setState({[event.target.name]:event.target.value});
    }   
}

export default TodoApp;