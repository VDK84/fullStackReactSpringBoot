import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter.jsx'

class App extends Component {
  render() {
    return (
    <div className="App">
      Hello App
      <Counter/>
      <Counter by={5}/>
      <Counter by={10}/>
    </div>
  );
  }
}

export default App;
