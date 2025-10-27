
import React from 'react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "Assistant is planning..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-secondary"></div>
      <p className="text-slate-400">{message}</p>
    </div>
  );
};

export default Loader;