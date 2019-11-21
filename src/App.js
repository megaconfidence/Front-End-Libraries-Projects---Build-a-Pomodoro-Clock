import React, { useState } from 'react';
import './App.css';
import BreakLength from './components/BreakLength';
import SessionLength from './components/SessionLength';
import Timer from './components/Timer';

let intervalId;

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [time, setTime] = useState(1500);
  const [isTimeStopped, setIsTimeStopped] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const handleBreakClick = e => {
    const id = e.target.id.split('-')[1];
    if (id === 'increment') {
      if (breakLength < 60) {
        setBreakLength(breakLength => breakLength + 1);
      }
    } else {
      if (breakLength > 1) {
        setBreakLength(breakLength => breakLength - 1);
      }
    }
  };
  const handleSessionClick = e => {
    const id = e.target.id.split('-')[1];
    if (id === 'increment') {
      if (sessionLength < 60) {
        setSessionLength(sessionLength => sessionLength + 1);
        setTime((sessionLength + 1) * 60);
      }
    } else {
      if (sessionLength > 1) {
        setSessionLength(sessionLength => sessionLength - 1);
        setTime((sessionLength - 1) * 60);
      }
    }
  };
  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTime(1500);
    setIsTimeStopped(false);
    clearInterval(intervalId);
  };

  const handleStartStop = e => {
    let locatTime = time;
    setIsTimeStopped(!isTimeStopped);
    if (isTimeStopped) {
      clearInterval(intervalId);
    } else {
      intervalId = setInterval(() => {
        // locatTime -= 1;
        // console.log(locatTime);
        // if (locatTime === 0) {
        //   console.log(isBreak);
        //   setIsBreak(isBreak => !isBreak);
        //   console.log(isBreak);
        //   if (isBreak) {
        //     console.log('it is break time');
        //     setTemp('lorem 4 ipsum')
        //   } else {
        //     console.log('it not break time');
        //     setTemp('whatever')
        //   }
        //   // setTimeout(() => {}, 2000);
        // } else {
        //   setTime(time => time - 1);
        // }

        setTime(time => {
          if (isBreak) {
            console.log('this ran')
            setIsBreak(isBreak => !isBreak);
            return sessionLength*60;
          } else {
            if (time === 0) {
              setIsBreak(isBreak => !isBreak);
              return breakLength*60;
            } else {
              return time - 1;
            }
          }
        });
      }, 1000);
    }
  };

  return (
    <div className='app'>
      <div className='app__controls'>
        <BreakLength length={breakLength} onClick={handleBreakClick} />
        <SessionLength length={sessionLength} onClick={handleSessionClick} />
      </div>
      <div className='app__timer'>
        <Timer reset={handleReset} time={time} startStop={handleStartStop} />
      </div>
    </div>
  );
}

export default App;
