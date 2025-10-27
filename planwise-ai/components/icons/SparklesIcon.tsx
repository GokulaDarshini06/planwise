import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        <path d="M18 9h.01"></path>
        <path d="M15 6h.01"></path>
        <path d="M21 12h.01"></path>
        <path d="M3 12a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        <path d="M6 9h.01"></path>
        <path d="M9 6h.01"></path>
    </svg>
);

export default SparklesIcon;