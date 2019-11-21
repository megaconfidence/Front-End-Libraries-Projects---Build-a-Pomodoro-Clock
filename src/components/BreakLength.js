import React from 'react';

const BreakLength = () => {
  return (
    <div className='break__lenght'>
      <div id='break-label'>Break Length</div>
      <div className='break__lenght__io'>
        <div className='break__length__down' id='break-decrement'>
          ▼
        </div>
        <div className='break__length__display' id='break-length'>
          5
        </div>
        <div className='break__length__up' id='break-increment'>
          ▲
        </div>
      </div>
    </div>
  );
};

export default BreakLength;
