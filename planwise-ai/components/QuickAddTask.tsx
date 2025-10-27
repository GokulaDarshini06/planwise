import React, { useState } from 'react';
import MagicWandIcon from './icons/MagicWandIcon';

interface QuickAddTaskProps {
    onAddTask: (task: { name: string; duration: number }) => void;
    isRearranging: boolean;
}

const QuickAddTask: React.FC<QuickAddTaskProps> = ({ onAddTask, isRearranging }) => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && duration) {
            onAddTask({ name, duration: parseInt(duration, 10) });
            setName('');
            setDuration('');
        }
    }

    return (
        <div className="mt-6 border-t-2 border-slate-700 pt-4">
            <h4 className="text-lg font-semibold text-slate-300 mb-3">Add Task & Rearrange</h4>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="New task name..."
                    required
                    disabled={isRearranging}
                    aria-label="New task name"
                    className="flex-grow w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-secondary disabled:opacity-50"
                />
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Duration (min)"
                    required
                    min="1"
                    disabled={isRearranging}
                    aria-label="New task duration in minutes"
                    className="w-full sm:w-36 bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-secondary disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={isRearranging || !name.trim() || !duration}
                    className="w-full sm:w-auto flex items-center justify-center bg-brand-primary hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                    <MagicWandIcon className="w-5 h-5 mr-2" />
                    Add
                </button>
            </form>
        </div>
    );
};

export default QuickAddTask;
