import type { Task, ScheduledTask } from '../types';

const timeStringToMinutes = (timeStr: string): number => {
  const time = timeStr.toUpperCase();
  let [hours, minutes] = [0, 0];
  
  if (time.includes('AM') || time.includes('PM')) {
    const [timePart, period] = time.split(' ');
    [hours, minutes] = timePart.split(':').map(Number);
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (period === 'AM' && hours === 12) {
      hours = 0;
    }
  } else {
    [hours, minutes] = time.split(':').map(Number);
  }
  return hours * 60 + (minutes || 0);
};

const minutesToTime12h = (totalMinutes: number): string => {
  if (totalMinutes >= 24 * 60) {
    totalMinutes %= 24 * 60;
  }
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  const hours = h % 12 === 0 ? 12 : h % 12;
  const mins = m < 10 ? `0${m}` : m;
  return `${hours}:${mins} ${period}`;
};

const PRIORITY_ORDER: { [key in Task['priority']]: number } = {
    'High': 0,
    'Medium': 1,
    'Low': 2,
};

export const generateSchedule = async (
  tasks: Task[],
  workingHours: { start: string; end: string },
): Promise<ScheduledTask[]> => {
  return new Promise((resolve) => {
    const activeTasks = tasks.filter(t => !t.completed);
    if (activeTasks.length === 0) {
      resolve([]);
      return;
    }

    let currentTime = timeStringToMinutes(workingHours.start);
    const workingEnd = timeStringToMinutes(workingHours.end);
    const schedule: ScheduledTask[] = [];
    const scheduledTaskIds = new Set<number>();
    const unscheduledTasks = new Map(activeTasks.map(t => [t.id, t]));

    while (unscheduledTasks.size > 0) {
      const schedulableTasks = Array.from(unscheduledTasks.values()).filter(task =>
        task.dependencies.every(depId => scheduledTaskIds.has(depId))
      );

      if (schedulableTasks.length === 0) {
        console.error("Could not generate schedule due to a dependency cycle.");
        resolve([]);
        return;
      }

      schedulableTasks.sort((a, b) => {
        const deadlineA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
        const deadlineB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
        if (deadlineA !== deadlineB) {
          return deadlineA - deadlineB;
        }
        return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      });

      const taskToSchedule = schedulableTasks[0];
      const startTime = currentTime;
      const endTime = startTime + taskToSchedule.duration;

      if (endTime > workingEnd) {
        console.error(`Task "${taskToSchedule.name}" exceeds working hours.`);
        resolve([]);
        return;
      }

      if (taskToSchedule.deadline) {
        const deadlineDate = new Date(taskToSchedule.deadline);
        const now = new Date();
        if (
            deadlineDate.getFullYear() === now.getFullYear() &&
            deadlineDate.getMonth() === now.getMonth() &&
            deadlineDate.getDate() === now.getDate()
        ) {
            const deadlineMinutes = deadlineDate.getHours() * 60 + deadlineDate.getMinutes();
            if (endTime > deadlineMinutes) {
                console.error(`Task "${taskToSchedule.name}" exceeds its deadline.`);
                resolve([]);
                return;
            }
        }
      }
      
      schedule.push({
        taskName: taskToSchedule.name,
        startTime: minutesToTime12h(startTime),
        endTime: minutesToTime12h(endTime),
        type: 'task',
      });

      currentTime = endTime;
      scheduledTaskIds.add(taskToSchedule.id);
      unscheduledTasks.delete(taskToSchedule.id);
    }

    resolve(schedule);
  });
};

export const rearrangeScheduleWithNewTask = async (
  tasks: Task[],
  currentSchedule: ScheduledTask[],
  newTaskData: { name: string; duration: number },
  workingHours: { start: string; end: string },
): Promise<ScheduledTask[]> => {
    const newTask: Task = {
        id: Date.now(),
        name: newTaskData.name,
        duration: newTaskData.duration,
        priority: 'Medium',
        dependencies: [],
        completed: false,
    };
    
    const allTasks = [...tasks, newTask];
    return generateSchedule(allTasks, workingHours);
};
