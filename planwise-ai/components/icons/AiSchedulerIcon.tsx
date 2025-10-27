import React from 'react';

const AiSchedulerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2a10 10 0 1 0 10 10" />
    <path d="M12 2a10 10 0 0 1 10 10" />
    <path d="M12 2v10l7 3.5" />
    <path d="M8 12a4 4 0 1 1 8 0c0 1.5-.9 2.8-2.2 3.5" />
    <path d="M14 10.5c0 .8-.3 1.5-.8 2" />
    <path d="M12 16v2.5" />
    <path d="M10.8 17.2a2 2 0 0 1 2.4 0" />
    <path d="M12 8V7" />
    <path d="M10 9.5a2.5 2.5 0 0 1-3.5-3.5" />
    <path d="M14 9.5a2.5 2.5 0 0 0 3.5-3.5" />
    <circle cx="12" cy="12" r=".5" fill="currentColor" />
    <circle cx="9" cy="9" r=".5" fill="currentColor" />
    <circle cx="15" cy="9" r=".5" fill="currentColor" />
  </svg>
);

export default AiSchedulerIcon;