const ORDER = ["todo", "in-progress", "done"];
export function addTask(tasks, title) {
    const id = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    const task = { id, title: title.trim(), status: "todo" };
    return [...tasks, task];
}
export function completeTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}
export function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
// Extra operations (my own)
export function advanceTask(tasks, id) {
    return tasks.map((t) => {
        if (t.id !== id)
            return t;
        const next = ORDER[Math.min(ORDER.indexOf(t.status) + 1, ORDER.length - 1)];
        return { ...t, status: next };
    });
}
export function deleteTask(tasks, id) {
    return tasks.filter((t) => t.id !== id);
}
export function countByStatus(tasks, status) {
    return filterByStatus(tasks, status).length;
}
