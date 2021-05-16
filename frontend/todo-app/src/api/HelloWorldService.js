import axios from 'axios'
import ApiUtils from './ApiUtils.js'

class HelloWorldService {
    executeHelloWorldService(){
        return axios.get(ApiUtils.getBasicURI()+'/hello-world');
    }

    executeHelloWorldBeanService(){
        return axios.get(ApiUtils.getBasicURI()+'/hello-world-bean');
    }

    executeHelloWorldBeanPathVariableService(name){
        return axios.get(ApiUtils.getBasicURI()+`/hello-world-bean/path-variable/${name}`);
    }
}

export default new HelloWorldService();