import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import BreakLength from './components/BreakLength';
import SessionLength from './components/SessionLength';
import Timer from './components/Timer';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  // const [time, setTime] = useState(5);
  const [time, setTime] = useState(1500);
  const [isTimeStopped, setIsTimeStopped] = useState(false);
  const [isBreak, setIsBreak] = useState(true);
  const [delay, setDelay] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const audioEle = useRef();

  const handleBreakClick = e => {
    if (!isTimerRunning) {
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
    }
  };
  const handleSessionClick = e => {
    if (!isTimerRunning) {
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
    }
  };
  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTime(1500);
    setIsTimeStopped(false);
    setDelay(null);
    setIsBreak(true);
    setIsTimerRunning(false);
    audioEle.current.pause();
    audioEle.current.currentTime = 0;
  };
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };
  useInterval(() => {
    if (time === 0) {
      setDelay(null);
      setIsBreak(isBreak => !isBreak);
      swapTime();
    } else {
      setTime(time => time - 1);
    }
  }, delay);

  const swapTime = () => {
    audioEle.current.play();

    if (isBreak) {
      console.log(`it's break time`);
      setTime(breakLength * 60);
      setDelay(1000);
    } else {
      console.log(`it's not break time`);
      setTime(sessionLength * 60);
      setDelay(1000);
    }
  };

  const handleStartStop = e => {
    setIsTimerRunning(isTimerRunning => !isTimerRunning);
    setIsTimeStopped(isTimeStopped => !isTimeStopped);
    if (isTimeStopped) {
      setDelay(null);
    } else {
      setDelay(1000);
    }
  };

  return (
    <div className='app'>
      <div className='app__controls'>
        <BreakLength length={breakLength} onClick={handleBreakClick} />
        <SessionLength length={sessionLength} onClick={handleSessionClick} />
      </div>
      <div className='app__timer'>
        <Timer
          reset={handleReset}
          time={time}
          startStop={handleStartStop}
          isBreak={isBreak}
        />
      </div>
      <audio
        id='beep'
        preload='auto'
        src='https://goo.gl/65cBl1'
        ref={audioEle}
      />
    </div>
  );
}

export default App;
