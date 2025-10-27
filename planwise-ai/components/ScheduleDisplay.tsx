import React, { useState, useEffect } from 'react';
import type { ScheduledTask } from '../types';
import CoffeeIcon from './icons/CoffeeIcon';
import ClipboardIcon from './icons/ClipboardIcon';
import TaskIcon from './icons/TaskIcon';
import QuickAddTask from './QuickAddTask';

interface ScheduleDisplayProps {
  schedule: ScheduledTask[];
  onAddTaskToSchedule: (task: { name: string; duration: number }) => void;
  isRearranging: boolean;
  newlyAddedTaskName: string | null;
}

const ScheduleDisplay: React.FC<ScheduleDisplayProps> = ({ schedule, onAddTaskToSchedule, isRearranging, newlyAddedTaskName }) => {
  const [copyStatus, setCopyStatus] = useState('Copy');
    
  if (!schedule || schedule.length === 0) {
    return null;
  }

  useEffect(() => {
    if (newlyAddedTaskName) {
        const element = document.getElementById(`schedule-item-${newlyAddedTaskName.replace(/\s+/g, '-')}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [newlyAddedTaskName]);

  const handleCopy = () => {
    const scheduleText = schedule
      .map(item => `${item.startTime} - ${item.endTime}: ${item.taskName} (${item.type})`)
      .join('\n');
    
    navigator.clipboard.writeText(scheduleText).then(() => {
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus('Copy'), 2000);
    }, () => {
        setCopyStatus('Failed!');
        setTimeout(() => setCopyStatus('Copy'), 2000);
    });
  };

  return (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-100">Your Generated Schedule</h3>
            <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-1.5 px-3 rounded-md transition-colors"
            >
                <ClipboardIcon className="w-4 h-4"/>
                {copyStatus}
            </button>
        </div>
        <div className="relative border-l-2 border-slate-700 pl-6 space-y-8 max-h-[30rem] overflow-y-auto pr-2">
            {schedule.map((item, index) => {
                const isNew = item.taskName === newlyAddedTaskName;
                const itemId = `schedule-item-${item.taskName.replace(/\s+/g, '-')}`;

                return (
                    <div key={index} id={itemId} className={`relative transition-all duration-300 ${isNew ? 'animate-pulse-highlight rounded-md -mx-3 p-3' : ''}`}>
                        {item.type === 'task' ? (
                            <>
                                <div className="absolute -left-[34px] top-1 h-4 w-4 rounded-full bg-brand-secondary border-4 border-slate-800"></div>
                                <p className="font-bold text-brand-secondary">{item.startTime} - {item.endTime}</p>
                                <div className="flex items-center gap-2">
                                    <TaskIcon className="w-5 h-5 text-brand-secondary/80"/>
                                    <p className="text-lg text-slate-200">{item.taskName}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="absolute -left-[34px] top-1 h-4 w-4 rounded-full bg-teal-500 border-4 border-slate-800"></div>
                                <p className="font-bold text-teal-400">{item.startTime} - {item.endTime}</p>
                                <div className="flex items-center gap-2">
                                <CoffeeIcon className="w-5 h-5 text-teal-400" />
                                <p className="text-lg text-slate-300 italic">{item.taskName}</p>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
        <QuickAddTask onAddTask={onAddTaskToSchedule} isRearranging={isRearranging} />
    </div>
  );
};

export default ScheduleDisplay;