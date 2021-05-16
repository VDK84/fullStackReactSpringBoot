import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import HelloWorldService from '../../api/HelloWorldService.js';

class WelcomeComponent extends Component{
    constructor(props){
        super(props);
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccesfulResponse = this.handleSuccesfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);

        this.state = {
            welcomeMessage: ''            
        }
    }
    render () {
        return (
            <div>
                <h1>Welcome!</h1>
                {this.state.isThereAnError && <div className="error error-message">
                    {this.state.errorMessage}                    
                </div>}
                <div className="container">
                    Welcome {this.props.match.params.username}. You can manage your todos <Link to="/todos">here</Link>.
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </div>
        );
    }

    retrieveWelcomeMessage(){
    //     HelloWorldService.executeHelloWorldService()
    //     .then(response => this.handleSuccesfulResponse(response))
    //     .catch();
    // 
        //response {"message":"Hello World"}
        HelloWorldService.executeHelloWorldBeanPathVariableService(this.props.match.params.username)
        .then(response => this.handleSuccesfulResponse(response))
        .catch(error => this.handleError(error));
    }

    
    handleSuccesfulResponse(response){
        this.setState({welcomeMessage: response.data.message});
    }

    handleError(error) {        
        console.log('handleError - error:'+error);        
        let errorMessage = '';
        if(error.message){
            errorMessage += error.message;
        }
        if(error.response && error.response.data){
            errorMessage += error.response.data.message;
        }

        //ErrorComponentBelowHeader.setState({errorMessage : error.response.data.message, isThereAnError: true});
        this.setState({welcomeMessage: errorMessage});
    };
}

export default WelcomeComponent;