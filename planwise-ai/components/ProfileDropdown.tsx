import React, { useRef, useState } from 'react';
import { User } from '../auth/authService';
import { Task } from '../types';
import { useAuth } from '../auth/useAuth';
import UserCircleIcon from './icons/UserCircleIcon';
import ChangePasswordModal from './ChangePasswordModal';

interface ProfileDropdownProps {
  user: User;
  tasks: Task[];
  onLogout: () => void;
  onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, tasks, onLogout, onClose }) => {
  const { updateProfilePicture } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      try {
        await updateProfilePicture(base64);
      } catch (error) {
        console.error("Failed to update profile picture", error);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleSwitchAccount = () => {
    onLogout();
    onClose();
  }

  return (
    <>
        <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-700" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
        <div className="py-1" role="none">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
            <div className="relative">
                {user.profilePicture ? (
                    <img src={user.profilePicture} alt="User profile" className="w-12 h-12 rounded-full object-cover"/>
                ) : (
                    <UserCircleIcon className="w-12 h-12 text-slate-500" />
                )}
                <button onClick={handleImageUploadClick} className="absolute -bottom-1 -right-1 bg-brand-secondary h-5 w-5 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors" aria-label="Upload profile picture">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                </button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden"/>
            </div>
            <div>
                <p className="text-sm font-medium text-slate-200 truncate" title={user.email}>{user.email}</p>
                <p className="text-xs text-slate-400">Task Master</p>
            </div>
            </div>

            <div className="px-4 py-3">
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-300">Task Completion</span>
                    <span className="text-sm font-medium text-slate-400">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div className="bg-brand-secondary h-2.5 rounded-full transition-all duration-500" style={{width: `${completionPercentage}%`}}></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">{completedCount} of {totalCount} tasks completed</p>
            </div>
            
            <div className="border-t border-slate-700 py-1">
                <button onClick={() => setIsChangePasswordModalOpen(true)} className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50" role="menuitem">
                    Change Password
                </button>
                <button onClick={handleSwitchAccount} className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50" role="menuitem">
                    Switch Account
                </button>
                <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/50" role="menuitem">
                    Logout
                </button>
            </div>

        </div>
        </div>
        {isChangePasswordModalOpen && (
            <ChangePasswordModal 
                onClose={() => {
                    setIsChangePasswordModalOpen(false);
                    onClose(); // Also close the dropdown
                }} 
            />
        )}
    </>
  );
};

export default ProfileDropdown;