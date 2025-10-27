import React from 'react';

const CalendarSparkleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="m14.25 10.25 1.5 1.5 1.5-1.5m-3-3 1.5 1.5-1.5 1.5" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M16.5 13.5h.01M19.5 10.5h.01" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="m9.75 16.5 1.5 1.5 1.5-1.5m-3-3L11.25 15l-1.5 1.5" 
    />
  </svg>
);

export default CalendarSparkleIcon;
