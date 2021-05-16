import axios from "axios";
import apiUtils from "../../api/ApiUtils";

class AuthenticationService {

    executeBasicAuthenticationService(username, password){
        return axios.get(apiUtils.getBasicURI()+'/basicAuth',{headers: {authorization: this.createBasicAuthHeader(username, password)}});
    }

    registerSuccessfulLogin(username, password){
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosAuthInterceptor(this.createBasicAuthHeader(username, password));
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser');   
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser');
        return user===null? false: true;
    }

    getLoggedUser(){
        let user = sessionStorage.getItem('authenticatedUser');
        return user===null? '': user;        
    }

    createBasicAuthHeader(username, password){
        return 'Basic ' + window.btoa(username + ":" + password);        
    }

    setupAxiosAuthInterceptor(basicAuthHeader){        
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn){
                    config.headers.authorization = basicAuthHeader
                }
                return config;
            }
        );
    }
}

export default new AuthenticationService();