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
            password: 'guest',
            hasLoginFailed: false,
            showSucessMessage: false
        }        

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
               
    }
    render (){
        return (
            <div>
                <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>
                <ShowLoginSuccesfulMessage showSucessMessage={this.state.showSucessMessage}/>
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>Login</button>
            </div>
        );
    }

    handleChange(event){
        console.log(this.state);
        this.setState({[event.target.name]:event.target.value});
    }
    
    loginClicked(){
        if(this.state.username==='guest' && this.state.password==='guest'){
            this.setState({showSucessMessage:true});
            this.setState({hasLoginFailed:false});
        } else {
            this.setState({hasLoginFailed:true});
            this.setState({showSucessMessage:false});
        }
    }
}

function ShowInvalidCredentials(props){
    if(props.hasLoginFailed){
        return <div>Invalid Credentials</div>;
    }
    return null;
}

function ShowLoginSuccesfulMessage(props){
    if(props.showSucessMessage){
        return <div>Login Succesful Credentials</div>;
    }
    return null;
}

export default TodoApp;