import React from 'react';
import logo from '../../assets/html5-logo.svg';
import { FileList } from '../FileList/FileList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <FileList />
    </div>
  );
}

export default App;
