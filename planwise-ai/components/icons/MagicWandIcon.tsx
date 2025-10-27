import React from 'react';

const MagicWandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <path d="M15 4V2"></path>
        <path d="M15 10V8"></path>
        <path d="M12.5 7.5L11 6"></path>
        <path d="M18 10l-1.5-1.5"></path>
        <path d="m2 2 4 4"></path><path d="M18 2l-2.5 2.5"></path>
        <path d="m14 6 3 3"></path><path d="M22 2 8 16"></path>
        <path d="M11.5 6.5L10 8"></path>
        <path d="M8 22l4-4"></path>
        <path d="M18 14l-4 4"></path>
    </svg>
);

export default MagicWandIcon;
