import React from 'react';

const SessionLength = () => {
  return (
    <div className='session__lenght'>
      <div id='session-label'>Session Length</div>
      <div className='session__lenght__io'>
        <div className='session__length__down' id='session-decrement'>
          ▼
        </div>
        <div className='session__length__display' id='session-length'>
          25
        </div>
        <div className='session__length__up' id='session-increment'>
          ▲
        </div>
      </div>
    </div>
  );
};

export default SessionLength;
