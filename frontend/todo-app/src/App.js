import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import Counter from './components/Counter.jsx'
import TodoApp from './components/todoApp/TodoApp.jsx'


class App extends Component {
  render() {
    return (
    <div className="App">      
      <TodoApp/>
    </div>
  );
  }
}

export default App;
