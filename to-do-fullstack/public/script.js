// script.js: Handle To-Do List Functionality

// Elements
const taskList = document.getElementById('taskList');
const addTaskButton = document.getElementById('addTaskButton');
const taskTitleInput = document.getElementById('taskTitle');

// Fetch tasks from the backend
async function fetchTasks() {
  const response = await fetch('/tasks');
  const tasks = await response.json();
  renderTasks(tasks);
}

// Render tasks in the UI
function renderTasks(tasks) {
  taskList.innerHTML = ''; // Clear the list
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.textContent = task.title;
    li.classList.toggle('completed', task.status);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.onclick = () => deleteTask(task.id);

    li.appendChild(deleteButton);
    li.onclick = () => toggleTaskStatus(task.id);

    taskList.appendChild(li);
  });
}

// Add a new task
addTaskButton.onclick = async () => {
  const title = taskTitleInput.value.trim();
  if (title) {
    await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    taskTitleInput.value = ''; // Clear input
    fetchTasks(); // Refresh list
  }
};

// Toggle task completion status
async function toggleTaskStatus(taskId) {
  await fetch(`/tasks/${taskId}`, { method: 'PUT' });
  fetchTasks(); // Refresh list
}

// Delete a task
async function deleteTask(taskId) {
  await fetch(`/tasks/${taskId}`, { method: 'DELETE' });
  fetchTasks(); // Refresh list
}

// Initial fetch to display tasks
fetchTasks();
