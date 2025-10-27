import React, { useState, useEffect, useRef } from 'react';
import AiSchedulerIcon from './icons/AiSchedulerIcon';
import ProfileDropdown from './ProfileDropdown';
import { User } from '../auth/authService';
import { Task } from '../types';
import UserCircleIcon from './icons/UserCircleIcon';

interface HeaderProps {
    user: User | null;
    onLogout: () => void;
    tasks: Task[];
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, tasks }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-b from-slate-800/60 to-slate-800/20 backdrop-blur-sm shadow-lg border-b border-slate-700 sticky top-0 z-20">
      <div className="container mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
            <AiSchedulerIcon className="w-8 h-8 text-brand-secondary animate-pulse-glow" />
            <h1 className="ml-3 text-2xl md:text-3xl font-bold tracking-tight text-slate-100">
            PlanWise AI
            </h1>
        </div>
        {user && (
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                    className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-brand-secondary rounded-full"
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                >
                    <span className="text-sm text-slate-400 hidden sm:block">{user.email}</span>
                    {user.profilePicture ? (
                        <img src={user.profilePicture} alt="User profile" className="w-9 h-9 rounded-full object-cover border-2 border-slate-600"/>
                    ) : (
                        <UserCircleIcon className="w-9 h-9 text-slate-400" />
                    )}
                </button>
                {isDropdownOpen && (
                    <ProfileDropdown 
                        user={user} 
                        onLogout={onLogout} 
                        tasks={tasks}
                        onClose={() => setIsDropdownOpen(false)}
                    />
                )}
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;