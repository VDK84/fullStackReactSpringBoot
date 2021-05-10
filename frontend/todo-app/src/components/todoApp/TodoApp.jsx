import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class TodoApp extends Component {
    render () {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/welcome" component={WelcomeComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                    </>
                </Router>                
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
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSucessMessage && <div>Login Successful Credentials</div>}
                {!this.state.showSucessMessage && <div>
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button onClick={this.loginClicked}>Login</button>
                </div>}
                <WelcomeComponent/>
            </div>
        );
    }

    handleChange(event){
        console.log(this.state);
        this.setState({[event.target.name]:event.target.value});
    }
    
    loginClicked(){
        if(this.state.username==='guest' && this.state.password==='guest'){
            this.props.history.push("/welcome");
            this.setState({showSucessMessage:true});
            this.setState({hasLoginFailed:false});
        } else {
            this.props.history.push("/login", {hasLoginFailed:true, showSucessMessage:false});
        }
    }
}

class WelcomeComponent extends Component{
    render () {
        return <div>Welcome in TodoApp</div>
    }
}

function ErrorComponent(){
    return <div>Opps! An Error Ocurred.</div>
}
export default TodoApp;