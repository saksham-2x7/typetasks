export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

const ORDER: TaskStatus[] = ["todo", "in-progress", "done"];

export function addTask(tasks: Task[], title: string): Task[] {
  const id = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  const task: Task = { id, title: title.trim(), status: "todo" };
  return [...tasks, task];
}

export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t): Task => (t.id === id ? { ...t, status: "done" } : t));
}

export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

// Extra operations (my own)
export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t): Task => {
    if (t.id !== id) return t;
    const next = ORDER[Math.min(ORDER.indexOf(t.status) + 1, ORDER.length - 1)];
    return { ...t, status: next };
  });
}

export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}

export function countByStatus(tasks: Task[], status: TaskStatus): number {
  return filterByStatus(tasks, status).length;
}
