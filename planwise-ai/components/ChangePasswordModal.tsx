import React, { useState } from 'react';
import { useAuth } from '../auth/useAuth';

interface ChangePasswordModalProps {
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { changePassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
        setError("New password must be at least 6 characters long.");
        return;
    }
    
    setIsLoading(true);
    try {
      await changePassword({ currentPassword, newPassword });
      setSuccess("Password updated successfully!");
      setTimeout(() => {
        onClose();
      }, 1500); // Close modal after success message
    } catch (err: any) {
      setError(err.message || "Failed to update password.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-30 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-slate-800 w-full max-w-md rounded-lg shadow-xl border border-slate-700 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-100">Change Password</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">&times;</button>
        </div>
        
        {error && <div className="bg-red-900/50 text-red-300 p-3 rounded-md mb-4 text-sm" role="alert">{error}</div>}
        {success && <div className="bg-green-900/50 text-green-300 p-3 rounded-md mb-4 text-sm" role="alert">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-slate-400 mb-1">
              Current Password
            </label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
          </div>
          
          <div className="space-y-4 pt-2 border-t border-slate-700/50">
            <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-slate-400 mb-1">
                New Password
                </label>
                <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                />
            </div>
            <div>
                <label htmlFor="confirm-new-password" className="block text-sm font-medium text-slate-400 mb-1">
                Confirm New Password
                </label>
                <input
                id="confirm-new-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
                type="button"
                onClick={onClose}
                className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
                Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !!success}
              className="bg-brand-secondary hover:bg-blue-500 disabled:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;