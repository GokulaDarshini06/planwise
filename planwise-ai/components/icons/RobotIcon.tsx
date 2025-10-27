import React from 'react';

const RobotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82m5.84-2.56a16.5 16.5 0 0 0-11.62 0M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 14.5a3.987 3.987 0 0 0-3.951 3.488A8.949 8.949 0 0 0 12 21Zm7-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
    </svg>
);

export default RobotIcon;
