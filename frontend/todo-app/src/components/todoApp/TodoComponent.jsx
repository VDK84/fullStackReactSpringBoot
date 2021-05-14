import React, {Component} from 'react';
import moment from 'moment';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import TodoDataService from '../../api/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit= this.onSubmit.bind(this);
        this.validate= this.validate.bind(this);
    }

    onSubmit(values) {
       console.log('onSubmit:'+values);
       let todo = {
            id: this.state.id,
            description : values.description,
            targetDate: values.targetDate
       };
       if(this.state.id === -1){
            TodoDataService.createTodo(AuthenticationService.getLoggedUser(), todo)
            .then( () => this.props.history.push('/todos/'))
            .catch(); 
        } else {
           TodoDataService.updateTodo(AuthenticationService.getLoggedUser(), this.state.id, todo)
           .then( () => this.props.history.push('/todos/'))
           .catch();           
       }
    }

    validate(values) {
        console.log('validate:'+values); 
        let errors = {};
        if(!values.description){
            errors.description = 'Enter a Description';
        }
         else if(values.description.length<5){
             errors.description = 'Enter at least 5 Characters in Description'
         }

         if(!moment(values.targetDate).isValid()){
             errors.targetDate = 'Enter a Valid target date'
         }
        return errors;
    }

    componentDidMount() {
        if(this.state.id===-1){
            return;
        }
        TodoDataService.getTodo(AuthenticationService.getLoggedUser(),this.state.id)
        .then(response => {
            console.log(response.data);
            this.setState({
                description : response.data.description,
                targetDate : moment(response.data.targetDate).format('YYYY-MM-DD')
            })
            console.log(this.state);
        })
        .catch();
    }

    render(){
        let {description, targetDate} = this.state;
        // let description = this.state.description;
        // let targetDate = this.state.targetDate;
        return (
            <div>
                <h1>Todo Component for id: {this.props.match.params.id}</h1>
                <div className="container">
                    <Formik 
                        initialValues={{description, targetDate}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }

}

export default TodoComponent;