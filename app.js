import { addTask, advanceTask, deleteTask, filterByStatus, countByStatus, } from "./model.js";
const form = document.getElementById("add-form");
const input = document.getElementById("title");
const list = document.getElementById("task-list");
const empty = document.getElementById("empty");
const chips = Array.from(document.querySelectorAll(".chip"));
const FILTERS = ["all", "todo", "in-progress", "done"];
const LABEL = { todo: "Todo", "in-progress": "In progress", done: "Done" };
const NEXT_LABEL = { todo: "Start", "in-progress": "Complete", done: "Done ✓" };
let tasks = [];
let current = "all";
function isFilter(value) {
    return FILTERS.some((f) => f === value);
}
function render() {
    list.innerHTML = "";
    const visible = current === "all" ? tasks : filterByStatus(tasks, current);
    for (const t of visible) {
        const li = document.createElement("li");
        li.className = "item";
        li.dataset.status = t.status;
        const title = document.createElement("span");
        title.className = "title";
        title.textContent = t.title;
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.dataset.status = t.status;
        badge.textContent = LABEL[t.status];
        const adv = document.createElement("button");
        adv.className = "act adv";
        adv.textContent = NEXT_LABEL[t.status];
        adv.disabled = t.status === "done";
        adv.addEventListener("click", () => { tasks = advanceTask(tasks, t.id); render(); });
        const del = document.createElement("button");
        del.className = "act del";
        del.textContent = "✕";
        del.setAttribute("aria-label", `Delete ${t.title}`);
        del.addEventListener("click", () => { tasks = deleteTask(tasks, t.id); render(); });
        li.append(title, badge, adv, del);
        list.append(li);
    }
    empty.hidden = visible.length > 0;
    for (const f of FILTERS) {
        const el = document.getElementById(`count-${f}`);
        el.textContent = String(f === "all" ? tasks.length : countByStatus(tasks, f));
    }
    for (const c of chips)
        c.classList.toggle("active", c.dataset.filter === current);
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    tasks = addTask(tasks, input.value);
    input.value = "";
    render();
});
for (const c of chips) {
    c.addEventListener("click", () => {
        const f = c.dataset.filter;
        if (isFilter(f)) {
            current = f;
            render();
        }
    });
}
render();
