import React, { useState, useCallback } from 'react';
import { Task, ScheduledTask } from '../types';
import { generateSchedule, rearrangeScheduleWithNewTask } from '../services/geminiService';
import Header from '../components/Header';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import Constraints from '../components/Constraints';
import ScheduleDisplay from '../components/ScheduleDisplay';
import Loader from '../components/Loader';
import { useAuth } from '../auth/useAuth';
import SparklesIcon from '../components/icons/SparklesIcon';
import ClipboardListIcon from '../components/icons/ClipboardListIcon';
import CalendarSparkleIcon from '../components/icons/CalendarSparkleIcon';

const TaskScheduler: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [workingHours, setWorkingHours] = useState({ start: '09:00', end: '17:00' });
  const [schedule, setSchedule] = useState<ScheduledTask[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newlyAddedTaskName, setNewlyAddedTaskName] = useState<string | null>(null);
  const { user, logout } = useAuth();

  const addTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      id: Date.now(),
      ...taskData,
      completed: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const removeTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleGenerateSchedule = useCallback(async () => {
    const activeTasks = tasks.filter(t => !t.completed);
    if (activeTasks.length === 0) {
      setError("Please add at least one task before generating a schedule.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSchedule(null);
    setNewlyAddedTaskName(null);

    try {
      const result = await generateSchedule(activeTasks, workingHours);
      if (result.length === 0) {
        setError("Could not generate a schedule. The tasks and their constraints (duration, deadlines) may not fit within the available working hours. Please make adjustments.");
      } else {
        setSchedule(result);
      }
    } catch (err) {
      console.error("Error generating schedule:", err);
      setError("An error occurred while generating the schedule. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [tasks, workingHours]);

  const handleRearrangeSchedule = useCallback(async (newTaskData: { name: string; duration: number }) => {
    if (!schedule) return;

    setIsLoading(true);
    setError(null);
    setNewlyAddedTaskName(null);

    const newTask: Task = {
      id: Date.now(),
      name: newTaskData.name,
      duration: newTaskData.duration,
      priority: 'Medium',
      dependencies: [],
      completed: false,
    };

    try {
      const result = await rearrangeScheduleWithNewTask(tasks, schedule, newTaskData, workingHours);
      if (result.length === 0) {
        setError("Could not fit the new task into the schedule. Please adjust working hours or other tasks.");
      } else {
        setSchedule(result);
        setTasks(prevTasks => [...prevTasks, newTask]);
        setNewlyAddedTaskName(newTask.name);
        setTimeout(() => setNewlyAddedTaskName(null), 3000);
      }
    } catch (err) {
      console.error("Error rearranging schedule:", err);
      setError("An error occurred while rearranging the schedule. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [tasks, schedule, workingHours]);


  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-slate-900 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#1e293b45,transparent)] z-0"></div>
      
      <div className="relative z-10">
        <Header user={user} onLogout={logout} tasks={tasks} />
        <main className="container mx-auto max-w-4xl p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6 bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-slate-700">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-brand-secondary">
                <ClipboardListIcon className="w-7 h-7" />
                <span>1. Input Tasks & Constraints</span>
              </h2>
              <Constraints workingHours={workingHours} setWorkingHours={setWorkingHours} />
              <TaskInput onAddTask={addTask} allTasks={tasks} />
              <TaskList tasks={tasks} onRemoveTask={removeTask} onToggleTask={toggleTaskCompletion} />
            </div>

            <div className="space-y-6 bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-slate-700">
              <div className="space-y-3">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-brand-secondary">
                    <CalendarSparkleIcon className="w-7 h-7" />
                    <span>2. Generate Schedule</span>
                </h2>
                <button
                  onClick={handleGenerateSchedule}
                  disabled={isLoading || tasks.filter(t => !t.completed).length === 0}
                  className="w-full group bg-brand-secondary hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))'}}></div>
                    <SparklesIcon className="w-5 h-5 mr-2 text-yellow-300"/>
                  {isLoading && !schedule ? 'Calculating Schedule...' : 'Generate Schedule'}
                </button>
              </div>
              <div className="mt-4 min-h-[200px] relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                        <Loader message={schedule ? 'Rearranging schedule...' : 'Calculating Schedule...'} />
                    </div>
                )}
                {error && !isLoading && <p className="text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
                
                {schedule && !error && (
                  <ScheduleDisplay 
                    schedule={schedule} 
                    onAddTaskToSchedule={handleRearrangeSchedule} 
                    isRearranging={isLoading} 
                    newlyAddedTaskName={newlyAddedTaskName} 
                  />
                )}
                
                {!schedule && !isLoading && !error && (
                  <div className="text-center py-6 border-2 border-dashed border-slate-700 rounded-lg flex flex-col items-center justify-center space-y-3 min-h-[150px]">
                    <CalendarSparkleIcon className="w-12 h-12 text-slate-600" />
                    <p className="text-slate-500">Your generated schedule will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <footer className="text-center py-4 mt-8 text-slate-500 text-sm">
            <p>Created by a world-class React engineer.</p>
          </footer>
      </div>
    </div>
  );
};

export default TaskScheduler;
