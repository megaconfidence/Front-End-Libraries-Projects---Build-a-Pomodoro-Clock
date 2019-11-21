import React from 'react';

const SessionLength = ({ length, onClick }) => {
  return (
    <div className='session__lenght'>
      <div id='session-label'>Session Length</div>
      <div className='session__lenght__io'>
        <div
          className='session__length__ctrl'
          id='session-decrement'
          onClick={onClick}
        >
          &#9660;
        </div>
        <div className='session__length__display' id='session-length'>
          {length}
        </div>
        <div
          className='session__length__ctrl'
          id='session-increment'
          onClick={onClick}
        >
          &#9650;
        </div>
      </div>
    </div>
  );
};

export default SessionLength;
