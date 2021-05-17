import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: 'guest',
            password: 'password!',
            hasLoginFailed: false,
            showSucessMessage: false
        }        

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
               
    }

    render (){
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.hasLoginFailed && <div>Invalid Credentials</div>}                    
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn" onClick={this.loginClicked}>Login</button>
                </div>           
            </div>
        );
    }

    handleChange(event){
        console.log(this.state);
        this.setState({[event.target.name]:event.target.value});
    }
    
    loginClicked(){
        // if(this.state.username==='guest' && this.state.password==='guest'){
        //     this.props.history.push(`/welcome/${this.state.username}`);
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //     this.setState({showSucessMessage:true});
        //     this.setState({hasLoginFailed:false});
        // } else {
        //     this.setState({showSuccessMessage:false})
        //     this.setState({hasLoginFailed:true})
        // }

        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        // .then(
        //     response => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //         this.props.history.push(`/welcome/${this.state.username}`);
        //     }
        // )
        // .catch(
        //     error => {
        //         this.setState({showSuccessMessage:false})
        //         this.setState({hasLoginFailed:true})
        //     }
        // );

        AuthenticationService.executeJWTAuthenticationService(this.state.username, this.state.password)
        .then(
            response => {
                AuthenticationService.registerSuccessfulLoginForJWT(this.state.username, response.data.token);
                this.props.history.push(`/welcome/${this.state.username}`);
            }
        )
        .catch(
            error => {
                this.setState({showSuccessMessage:false})
                this.setState({hasLoginFailed:true})
            }
        );
    }
}

export default LoginComponent;