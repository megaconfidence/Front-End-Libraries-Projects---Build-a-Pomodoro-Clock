import React from 'react';

const BreakLength = ({ length, onClick }) => {
  return (
    <div className='break__lenght'>
      <div id='break-label'>Break Length</div>
      <div className='break__lenght__io'>
        <div
          className='break__length__ctrl'
          id='break-decrement'
          onClick={onClick}
        >
          &#9660;
        </div>
        <div className='break__length__display' id='break-length'>
          {length}
        </div>
        <div
          className='break__length__ctrl'
          id='break-increment'
          onClick={onClick}
        >
         &#9650;
        </div>
      </div>
    </div>
  );
};

export default BreakLength;
