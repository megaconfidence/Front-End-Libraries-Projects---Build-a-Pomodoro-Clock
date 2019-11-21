import React from 'react';
import './App.css';
import BreakLength from './components/BreakLength';
import SessionLength from './components/SessionLength';

function App() {
  return (
    <div className='app'>
      <div className='app__controls'>
        <BreakLength />
        <SessionLength />
      </div>
    </div>
  );
}

export default App;
