import React from 'react';
import type { Task } from '../types';
import TrashIcon from './icons/TrashIcon';
import ClipboardPlusIcon from './icons/ClipboardPlusIcon';

interface TaskListProps {
  tasks: Task[];
  onRemoveTask: (id: number) => void;
  onToggleTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onRemoveTask, onToggleTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-6 border-2 border-dashed border-slate-700 rounded-lg flex flex-col items-center justify-center space-y-3 min-h-[150px]">
        <ClipboardPlusIcon className="w-12 h-12 text-slate-600" />
        <p className="text-slate-500">No tasks added yet.</p>
        <p className="text-slate-500 text-sm">Add tasks above to get started!</p>
      </div>
    );
  }

  const taskMap = new Map(tasks.map(task => [task.id, task.name]));
  const priorityColorMap: { [key in Task['priority']]: string } = {
    High: 'bg-red-500/80 text-red-100 ring-1 ring-red-400/50',
    Medium: 'bg-yellow-500/80 text-yellow-100 ring-1 ring-yellow-400/50',
    Low: 'bg-green-500/80 text-green-100 ring-1 ring-green-400/50',
  };
   const priorityBorderMap: { [key in Task['priority']]: string } = {
    High: 'border-red-500/80',
    Medium: 'border-yellow-500/80',
    Low: 'border-green-500/80',
  };

  const handleRemove = (id: number) => {
    const element = document.getElementById(`task-item-${id}`);
    if (element) {
        element.classList.add('animate-fade-out-up');
        element.addEventListener('animationend', () => {
            onRemoveTask(id);
        });
    } else {
        onRemoveTask(id);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-300 border-b border-slate-700 pb-2">Your Tasks</h3>
      <ul className="space-y-2 max-h-[26rem] overflow-y-auto pr-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            id={`task-item-${task.id}`}
            className={`flex items-start justify-between bg-slate-700/50 p-3 rounded-md transition-all duration-300 animate-fade-in-down border-l-4 ${priorityBorderMap[task.priority]} ${task.completed ? 'opacity-50' : 'opacity-100'}`}
          >
            <div className="flex-1 space-y-1.5 flex items-start gap-3">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleTask(task.id)}
                    className="h-5 w-5 rounded mt-0.5 border-slate-500 bg-slate-600 text-brand-secondary focus:ring-brand-secondary focus:ring-offset-slate-700"
                    aria-labelledby={`task-name-${task.id}`}
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${priorityColorMap[task.priority]}`}>
                            {task.priority}
                        </span>
                        <span id={`task-name-${task.id}`} className={`font-medium text-slate-200 ${task.completed ? 'line-through' : ''}`}>{task.name}</span>
                    </div>
                    {task.deadline && (
                        <p className="text-xs text-slate-400 pl-1">
                          <strong>Due:</strong> {new Date(task.deadline).toLocaleDateString()} {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    )}
                    {task.dependencies.length > 0 && (
                        <p className="text-xs text-slate-400 pl-1">
                          <strong>Depends on:</strong> {task.dependencies.map(id => taskMap.get(id) || 'Unknown').join(', ')}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex items-center h-full">
                <span className="text-sm text-slate-400 mx-4">{task.duration} min</span>
                <button
                onClick={() => handleRemove(task.id)}
                className="p-1 text-slate-500 hover:text-red-400 transition-colors rounded-full hover:bg-red-900/50"
                aria-label={`Remove task ${task.name}`}
                >
                <TrashIcon className="w-5 h-5" />
                </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;