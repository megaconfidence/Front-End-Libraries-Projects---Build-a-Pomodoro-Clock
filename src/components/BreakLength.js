import React from 'react';

const BreakLength = ({ length, onClick }) => {
  return (
    <div className='break__lenght'>
      <div id='break-label' className='break__label'>
        Break Length
      </div>
      <div className='break__lenght__io'>
        <div
          className='break__length__ctrl break__length__ctrl--left'
          id='break-decrement'
          onClick={onClick}
        >
          -
        </div>
        <div className='break__length__display' id='break-length'>
          {length}
        </div>
        <div
          className='break__length__ctrl break__length__ctrl--right'
          id='break-increment'
          onClick={onClick}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default BreakLength;
