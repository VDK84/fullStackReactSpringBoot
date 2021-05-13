import React, { Component } from 'react';
import TodoDataService from '../../api/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class ListTodosComponent extends Component{
    constructor (props) {
            super(props);
            this.state = {
                todos : 
                [
                    // {id: 1, description : 'Learn React', done:false, targetDate: new Date()},
                    // {id: 2, description : 'Learn Spring', done:false, targetDate: new Date()},            
                    // {id: 3, description : 'Learn Angular', done:false, targetDate: new Date()}            
                ],
                message : null
            }

            this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
            this.refreshTodos = this.refreshTodos.bind(this);
        }

        componentDidMount(){
            // let username = ;
            this.refreshTodos();            
        }
        
        render () {
            return (
            <div>
                <h1> List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container"></div>
                <table className="table">
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
                                    <tr key={todo.id}>                                    
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={()=>this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                        }                
                    </tbody>
                </table>
            </div>);
        }

        deleteTodoClicked(id){
            console.log('deleteTodoClicked:'+id);
            TodoDataService.deleteTodo(AuthenticationService.getLoggedUser(),id)
                .then(
                    response => {
                        this.setState({message :`Todo ${id} deleted sucessfully.`});
                        this.refreshTodos();
                    }
                )
                .catch();
        }

        refreshTodos(){
            TodoDataService.retrieveAllTodos(AuthenticationService.getLoggedUser())
            .then(response =>{
                this.setState({todos : response.data});                    
            })
            .catch();
        }
    }
export default ListTodosComponent;