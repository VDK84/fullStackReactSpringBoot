import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

class TodoApp extends Component {
    render () {
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent/>                    
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/welcome" component={WelcomeComponent}/>
                            <Route path="/todos" component={ListTodosComponent}/>
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
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSucessMessage && <div>Login Successful Credentials</div>}
                <div>
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button onClick={this.loginClicked}>Login</button>
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
            this.props.history.push(`/welcome/{this.state.username}`);
            this.setState({showSucessMessage:true});
            this.setState({hasLoginFailed:false});
        } else {
            this.props.history.push("/login", {hasLoginFailed:true, showSucessMessage:false});
        }
    }
}

class WelcomeComponent extends Component{
    render () {
        return <div>
                Welcome X. You can manage your todos <Link to="/todos">here</Link>.
            </div>
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
                        <li><Link class="nav-link" to="/logout">Lgout</Link></li>
                    </ul>                    
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component{
    render(){
        return (
            <div>
                 <hr/>Footer
            </div>
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
            <table>
                <thead>
                    <tr>
                        <th>id</th>
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
                                    <td>{todo.id}</td>
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