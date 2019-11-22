import React from 'react';

const SessionLength = ({ length, onClick }) => {
  return (
    <div className='session__lenght'>
      <div id='session-label' className='session__label'>
        Session Length
      </div>
      <div className='session__lenght__io'>
        <div
          className='session__length__ctrl session__length__ctrl--left'
          id='session-decrement'
          onClick={onClick}
        >
          -
        </div>
        <div className='session__length__display' id='session-length'>
          {length}
        </div>
        <div
          className='session__length__ctrl session__length__ctrl--right'
          id='session-increment'
          onClick={onClick}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default SessionLength;
