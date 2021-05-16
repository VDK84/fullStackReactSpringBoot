import axios from 'axios'
import ApiUtils from './ApiUtils.js'

class TodoDataService {    
    retrieveAllTodos(name){
        return axios.get(ApiUtils.getBasicURI()+`/users/${name}/todos`);
    }

    deleteTodo(name, id){
        return axios.delete(ApiUtils.getBasicURI()+`/users/${name}/todos/${id}`);
    }

    getTodo(name, id){
        return axios.get(ApiUtils.getBasicURI()+`/users/${name}/todos/${id}`);
    }
    
    updateTodo(name, id, todo){
        return axios.put(ApiUtils.getBasicURI()+`/users/${name}/todos/${id}`, todo);
    }
    createTodo(name, todo){
        return axios.post(ApiUtils.getBasicURI()+`/users/${name}/todos/`, todo);
    }
}

export default new TodoDataService();