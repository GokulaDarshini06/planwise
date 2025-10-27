import React from 'react';
import LightbulbIcon from './icons/LightbulbIcon';

interface SuggestionBoxProps {
  suggestions: string;
  setSuggestions: (value: string) => void;
}

const SuggestionBox: React.FC<SuggestionBoxProps> = ({ suggestions, setSuggestions }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="user-suggestions" className="flex items-center text-lg font-semibold text-slate-300">
        <LightbulbIcon className="w-5 h-5 mr-2 text-yellow-400" />
        Suggestions &amp; Conditions
      </label>
      <textarea
        id="user-suggestions"
        value={suggestions}
        onChange={(e) => setSuggestions(e.target.value)}
        rows={3}
        placeholder="e.g., I need a 1-hour lunch break around 1 PM. Schedule 'Review presentation' in the morning."
        className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
        aria-label="Suggestions and conditions for the schedule"
      />
    </div>
  );
};

export default SuggestionBox;