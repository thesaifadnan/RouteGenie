import React, { useState } from 'react';
import './Tooltip.css';

export default function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);
  
  return (
    <div className="tooltip-container">
      <div 
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div className="tooltip">
          {text}
        </div>
      )}
    </div>
  );
}