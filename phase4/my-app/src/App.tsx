import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskList } from './components/TaskList';
//import tasks from './components/save.json'

function App() {
  return (
    <div className="App">
      <TaskList proptasks={[]}/>
      
    </div>
  );
}

export default App;
