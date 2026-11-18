const STORAGE_KEY = "taskflow.tasks";

let tasks = [];
let currentFilter = "all";

const taskListEl = document.getElementById("task-list");
const emptyStateEl = document.getElementById("empty-state");
const addFormEl = document.getElementById("add-form");
const taskInputEl = document.getElementById("task-input");
const filtersEl = document.getElementById("filters");

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : [];
  } catch (e) {
    tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function getFilteredTasks() {
  if (currentFilter === "active") {
    return tasks.filter((t) => !t.completed);
  }
  if (currentFilter === "completed") {
    return tasks.filter((t) => t.completed);
  }
  return tasks;
}

function render() {
  const filtered = getFilteredTasks();
  taskListEl.innerHTML = "";

  emptyStateEl.hidden = filtered.length !== 0;

  filtered.forEach((task) => {
    taskListEl.appendChild(createTaskElement(task));
  });
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task" + (task.completed ? " is-completed" : "");
  li.dataset.id = task.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task__checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => toggleTask(task.id));

  const text = document.createElement("span");
  text.className = "task__text";
  text.textContent = task.text;

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "task__button task__button--edit";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => startEdit(li, task));

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "task__button task__button--delete";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  li.append(checkbox, text, editBtn, deleteBtn);
  return li;
}

function addTask(rawText) {
  const text = rawText.trim();
  if (!text) {
    return;
  }

  tasks.push({
    id: Date.now().toString(),
    text,
    completed: false,
    createdAt: Date.now(),
  });

  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.completed = !task.completed;
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

function editTask(id, rawText) {
  const text = rawText.trim();
  if (!text) {
    return;
  }

  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.text = text;
  saveTasks();
  render();
}

function startEdit(li, task) {
  const input = document.createElement("input");
  input.type = "text";
  input.className = "task__edit-input";
  input.value = task.text;

  const textEl = li.querySelector(".task__text");
  li.replaceChild(input, textEl);
  input.focus();
  input.select();

  let cancelled = false;

  function confirmEdit() {
    if (cancelled) return;
    editTask(task.id, input.value);
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      confirmEdit();
    } else if (e.key === "Escape") {
      cancelled = true;
      render();
    }
  });

  input.addEventListener("blur", () => setTimeout(confirmEdit, 0));
}

function setFilter(filter) {
  currentFilter = filter;

  [...filtersEl.children].forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.filter === filter);
  });

  render();
}

addFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask(taskInputEl.value);
  taskInputEl.value = "";
  taskInputEl.focus();
});

filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".filters__button");
  if (!btn) return;
  setFilter(btn.dataset.filter);
});

loadTasks();
render();
