import React from 'react';

const Timer = ({ reset, time, startStop, isBreak, isRunning }) => {
  const clockify = () => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;

  };
  return (
    <div className='timer'>
      <div className='timer__label' id='timer-label'>
        {!isBreak ? 'Time for a break!' : 'Be Productive!'}
      </div>
      <div className='timer__display' id='time-left'>
        {clockify()}
      </div>
      {/* {time.mm}:{time.ss<10?`0${time.ss}`:time.ss} */}
      <div className='timer__controls'>
        <div
          className='timer__controls__startstop'
          id='start_stop'
          onClick={startStop}
        >
          {isRunning ? 'Stop' : 'Start'}
        </div>
        <div className='timer__controls__reset' id='reset' onClick={reset}>
          Reset
        </div>
      </div>
    </div>
  );
};

export default Timer;
