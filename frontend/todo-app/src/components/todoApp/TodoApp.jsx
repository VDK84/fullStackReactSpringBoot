import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js'

class TodoApp extends Component {
    render () {
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent/>                    
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/welcome/:username" component={WelcomeComponent}/>
                            <Route path="/todos" component={ListTodosComponent}/>
                            <Route path="/logout" component={LogoutComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>   
                    <FooterComponent/>                 
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
        if(this.state.username==='guest' && this.state.password==='guest'){
            this.props.history.push(`/welcome/${this.state.username}`);
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.setState({showSucessMessage:true});
            this.setState({hasLoginFailed:false});
        } else {
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        }
    }
}

class WelcomeComponent extends Component{
    render () {
        return (
            <div>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.username}. You can manage your todos <Link to="/todos">here</Link>.
                </div>
            </div>
        );
    }
}

class HeaderComponent extends Component{
    render(){
        return (
            <header>
                <nav class="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a className="navbar-brand">TodoList</a></div>
                    <ul class="navbar-nav">
                        <li><Link class="nav-link" to="/welcome">Home</Link></li>
                        <li><Link class="nav-link" to="/todos">Todo</Link></li>
                    </ul>
                    <ul class="navbar-nav navbar-collapse justify-content-end">
                        <li><Link class="nav-link" to="/login">Login</Link></li>
                        <li><Link class="nav-link" to="/logout">Logout</Link></li>
                    </ul>                    
                </nav>
            </header>
        )
    }
}

class LogoutComponent extends Component{
    render(){
        return (
            <div>
                 <h1>You are logged out</h1>
                 <div className="container">
                     Thank You for Using Our Application.
                 </div>
            </div>
        )
    }
}

class FooterComponent extends Component{
    render(){
        return (
            <footer className="footer">
                 <span className="text-muted">All Rights Reserved 2021.</span>
            </footer>
        )
    }
}

class ListTodosComponent extends Component{
constructor (props) {
        super(props);
        this.state = {
            todos : 
            [
                {id: 1, description : 'Learn React', done:false, targetDate: new Date()},
                {id: 2, description : 'Learn Spring', done:false, targetDate: new Date()},            
                {id: 3, description : 'Learn Angular', done:false, targetDate: new Date()}            
            ]
        }
    }
    render () {
        return (
        <div>
            <h1> List Todos</h1>
            <div className="container"></div>
            <table class="table">
                <thead>
                    <tr>                        
                        <th>description</th>
                        <th>Is Completed?</th>
                        <th>Target Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.todos.map(
                            todo =>
                                <tr>                                    
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                </tr>
                        )
                    }                
                </tbody>
            </table>
        </div>);
    }
}

function ErrorComponent(){
    return <div>Opps! An Error Ocurred.</div>
}
export default TodoApp;