import React from 'react';
import gail from '../assets/images/gail.png';

const Logo2 = () => {
  return (
    <div >
      <img
        src={gail}
        alt="jobify"
        className="logo"
        style={{ width: '65px', height: '65px', marginLeft: 'auto' }} // Added marginLeft: 'auto'
      />
    </div>
  );
};

export default Logo2;
