
import React from 'react';

interface ConstraintsProps {
  workingHours: { start: string; end: string };
  setWorkingHours: React.Dispatch<React.SetStateAction<{ start: string; end: string }>>;
}

const Constraints: React.FC<ConstraintsProps> = ({ workingHours, setWorkingHours }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-300">Working Hours</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="start-time" className="block text-sm font-medium text-slate-400 mb-1">Start Time</label>
          <input
            id="start-time"
            type="time"
            value={workingHours.start}
            onChange={(e) => setWorkingHours(prev => ({ ...prev, start: e.target.value }))}
            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
          />
        </div>
        <div>
          <label htmlFor="end-time" className="block text-sm font-medium text-slate-400 mb-1">End Time</label>
          <input
            id="end-time"
            type="time"
            value={workingHours.end}
            onChange={(e) => setWorkingHours(prev => ({ ...prev, end: e.target.value }))}
            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default Constraints;
