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
    </div>
  );
  }
}

export default App;
