import axios from "axios";
import {API_URL} from '../../Constants.js'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class AuthenticationService {

    executeBasicAuthenticationService(username, password){
        return axios.get(API_URL+'/basicAuth',{headers: {authorization: this.createBasicAuthHeader(username, password)}});
    }
    
    executeJWTAuthenticationService(username, password){
        return axios.post(API_URL+'/authenticate', this.getJsonUsernamePassword(username, password));
    }

    getJsonUsernamePassword(username, password){
        return {
            username,
            password
        };
    }

    registerSuccessfulLogin(username, password){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosAuthInterceptor(this.createBasicAuthHeader(username, password));
    }

    registerSuccessfulLoginForJWT(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosAuthInterceptor(this.createJWTToken(token));
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);   
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user===null? false: true;
    }

    getLoggedUser(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user===null? '': user;        
    }

    createBasicAuthHeader(username, password){
        return 'Basic ' + window.btoa(username + ":" + password);        
    }

    createJWTToken(token){
        return 'Bearer ' + token;        
    }

    setupAxiosAuthInterceptor(headersAuthorization){        
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn){
                    config.headers.authorization = headersAuthorization
                }
                return config;
            }
        );
    }
}

export default new AuthenticationService();