import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import BreakLength from './components/BreakLength';
import SessionLength from './components/SessionLength';
import Timer from './components/Timer';

function App() {
  const [app, setApp] = useState({
    breakLength: 5,
    sessionLength: 25,
    // time: 5,
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
      setApp(app => ({ ...app, time: app.breakLength * 60, delay: 1000 }));
    } else {
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

  const sessionHero = (
    <>
      {' '}
      <img className='app__hero__image' src='./clock1.png' alt='clock' />
    </>
  );
  const breakHero = (
    <>
      {' '}
      <img className='app__hero__image' src='./clock2.png' alt='clock' />
    </>
  );

  return (
    <div className={`app ${app.isBreak ? 'app--session' : 'app--break'}`}>
      <div className='app__container'>
        <h1>Pomodoro Clock <a href='https://github.com/Confidence-Okoghenun/Front-End-Libraries-Projects---Build-a-Pomodoro-Clock'>(GitHub)</a> </h1>
        <div className='app__hero'>{app.isBreak ? sessionHero : breakHero}</div>
        <div className='app__timer'>
          <Timer
            reset={handleReset}
            time={app.time}
            startStop={handleStartStop}
            isBreak={app.isBreak}
            isRunning={app.isTimerRunning}
          />
        </div>
        <div className='app__control'>
          <BreakLength length={app.breakLength} onClick={handleBreakClick} />
          <SessionLength
            length={app.sessionLength}
            onClick={handleSessionClick}
          />
        </div>
      </div>
      <p className='inspire'>Design inspired by @rdnkta</p>
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
