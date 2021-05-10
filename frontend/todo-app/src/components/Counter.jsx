import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CounterButton from './CounterButton.jsx'
import './Counter.css'

class Counter extends Component {
    // Define the initial state in a constructor
  //state => counter 0
  constructor(){
    super();
    this.state = {
      counter : 0
    }

    this.increment = this.increment.bind(this);
  }

  render() {
    return (
      <div className="Counter">      
        <CounterButton incrementMethod={this.increment}/>
        <CounterButton by={5} incrementMethod={this.increment}/>
        <CounterButton by={10} incrementMethod={this.increment}/>
        <span className="count">{this.state.counter}</span>
      </div>
    );
  }

  increment(by){    
    this.setState({
      counter: this.state.counter + by
     });     
  }
}


export default Counter;