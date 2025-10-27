import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';
import { Task } from '../types';
import TagIcon from './icons/TagIcon';
import CalendarIcon from './icons/CalendarIcon';
import LinkIcon from './icons/LinkIcon';

interface TaskInputProps {
  onAddTask: (taskData: Omit<Task, 'id' | 'completed'>) => void;
  allTasks: Task[];
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, allTasks }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [deadline, setDeadline] = useState('');
  const [dependencies, setDependencies] = useState<number[]>([]);

  const handleDependencyChange = (taskId: number) => {
    setDependencies(prev => 
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && duration) {
      onAddTask({
        name,
        duration: parseInt(duration, 10),
        priority,
        deadline: deadline || undefined,
        dependencies,
      });
      setName('');
      setDuration('');
      setPriority('Medium');
      setDeadline('');
      setDependencies([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="task-name" className="block text-sm font-medium text-slate-400 mb-1">Task Name</label>
        <input
          id="task-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Complete project proposal"
          required
          className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
            <label htmlFor="task-duration" className="block text-sm font-medium text-slate-400 mb-1">Duration (min)</label>
            <input
            id="task-duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 60"
            required
            min="1"
            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
        </div>
        <div>
            <label htmlFor="task-priority" className="flex items-center text-sm font-medium text-slate-400 mb-1">
              <TagIcon className="w-4 h-4 mr-1.5" />
              Priority
            </label>
            <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            >
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
            </select>
        </div>
      </div>
      <div>
          <label htmlFor="task-deadline" className="flex items-center text-sm font-medium text-slate-400 mb-1">
            <CalendarIcon className="w-4 h-4 mr-1.5" />
            Deadline (Optional)
          </label>
          <input
            id="task-deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
          />
      </div>
      {allTasks.length > 0 && (
        <div>
            <label className="flex items-center text-sm font-medium text-slate-400 mb-1">
              <LinkIcon className="w-4 h-4 mr-1.5" />
              Dependencies (Optional)
            </label>
            <div className="max-h-24 overflow-y-auto space-y-2 rounded-md border border-slate-600 p-2 bg-slate-700/50">
                {allTasks.map(task => (
                    <div key={task.id} className="flex items-center">
                        <input
                            id={`dep-${task.id}`}
                            type="checkbox"
                            checked={dependencies.includes(task.id)}
                            onChange={() => handleDependencyChange(task.id)}
                            className="h-4 w-4 rounded border-gray-300 text-brand-secondary focus:ring-brand-secondary"
                        />
                        <label htmlFor={`dep-${task.id}`} className="ml-2 block text-sm text-slate-300">{task.name}</label>
                    </div>
                ))}
            </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full flex items-center justify-center bg-brand-primary hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        Add Task
      </button>
    </form>
  );
};

export default TaskInput;