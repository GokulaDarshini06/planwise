import React from 'react';

const ClipboardListIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75c0-.231-.035-.454-.1-.664M6.75 7.5h1.5v-1.5h-1.5v1.5Zm0 3h1.5v-1.5h-1.5v1.5Zm0 3h1.5v-1.5h-1.5v1.5Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 6.086a2.25 2.25 0 0 1 2.25-2.25h2.25c.133 0 .26-.05.354-.146l1.719-1.719a2.25 2.25 0 0 1 3.182 0l1.719 1.719c.094.096.221.146.354.146h2.25a2.25 2.25 0 0 1 2.25 2.25v1.316m-16.5 0h16.5m-16.5 0v9.184a2.25 2.25 0 0 0 2.25 2.25h12a2.25 2.25 0 0 0 2.25-2.25V6.086" />
  </svg>
);

export default ClipboardListIcon;
