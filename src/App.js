import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import BreakLength from './components/BreakLength';
import SessionLength from './components/SessionLength';
import Timer from './components/Timer';

function App() {
  const [app, setApp] = useState({
    breakLength: 5,
    sessionLength: 25,
    time: 1500,
    isTimeStopped: false,
    isBreak: true,
    delay: null,
    isTimerRunning: false
  });

  const audioEle = useRef();

  const handleBreakClick = e => {
    if (!app.isTimerRunning) {
      const id = e.target.id.split('-')[1];
      if (id === 'increment') {
        if (app.breakLength < 60) {
          setApp(app => ({ ...app, breakLength: app.breakLength + 1 }));
        }
      } else {
        if (app.breakLength > 1) {
          setApp(app => ({ ...app, breakLength: app.breakLength - 1 }));
        }
      }
    }
  };

  const handleSessionClick = e => {
    if (!app.isTimerRunning) {
      const id = e.target.id.split('-')[1];
      if (id === 'increment') {
        if (app.sessionLength < 60) {
          setApp(app => ({
            ...app,
            time: (app.sessionLength + 1) * 60,
            sessionLength: app.sessionLength + 1
          }));
        }
      } else {
        if (app.sessionLength > 1) {
          setApp(app => ({
            ...app,
            time: (app.sessionLength - 1) * 60,
            sessionLength: app.sessionLength - 1
          }));
        }
      }
    }
  };

  const handleReset = () => {
    setApp({
      breakLength: 5,
      sessionLength: 25,
      time: 1500,
      isTimeStopped: false,
      isBreak: true,
      delay: null,
      isTimerRunning: false
    });
    audioEle.current.pause();
    audioEle.current.currentTime = 0;
  };

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
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
    if (app.time === 0) {
      setApp(app => ({ ...app, delay: null, isBreak: !app.isBreak }));
      swapTime();
    } else {
      setApp(app => ({ ...app, time: app.time - 1 }));
    }
  }, app.delay);

  const swapTime = () => {
    audioEle.current.play();

    if (app.isBreak) {
      console.log(`it's break time`);
      setApp(app => ({ ...app, time: app.breakLength * 60, delay: 1000 }));
    } else {
      console.log(`it's not break time`);
      setApp(app => ({ ...app, time: app.sessionLength * 60, delay: 1000 }));
    }
  };

  const handleStartStop = e => {
    setApp(app => ({
      ...app,
      isTimeStopped: !app.isTimeStopped,
      isTimerRunning: !app.isTimerRunning
    }));
    if (app.isTimeStopped) {
      setApp(app => ({ ...app, delay: null }));
    } else {
      setApp(app => ({ ...app, delay: 1000 }));
    }
  };

  return (
    <div className='app'>
      <div className='app__controls'>
        <BreakLength length={app.breakLength} onClick={handleBreakClick} />
        <SessionLength
          length={app.sessionLength}
          onClick={handleSessionClick}
        />
      </div>
      <div className='app__timer'>
        <Timer
          reset={handleReset}
          time={app.time}
          startStop={handleStartStop}
          isBreak={app.isBreak}
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
