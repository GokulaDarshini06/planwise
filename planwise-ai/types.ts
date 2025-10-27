export interface Task {
  id: number;
  name: string;
  duration: number; // in minutes
  priority: 'High' | 'Medium' | 'Low';
  deadline?: string; // YYYY-MM-DDTHH:MM
  dependencies: number[]; // array of task IDs
  completed: boolean;
}

export interface ScheduledTask {
  taskName: string;
  startTime: string; // "h:mm AM/PM"
  endTime: string; // "h:mm AM/PM"
  type: 'task' | 'break';
}
