document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  // Load tasks from backend
  async function loadTasks() {
    const res = await fetch("/tasks");
    const tasks = await res.json();
    taskList.innerHTML = "";
    tasks.forEach(addTaskToDOM);
  }

  // Add task
  addTaskBtn.addEventListener("click", async () => {
    const text = taskInput.value.trim();
    if (!text) return;

    const res = await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const newTask = await res.json();
    addTaskToDOM(newTask);
    taskInput.value = "";
  });

  // Add task element to DOM
  function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span style="text-decoration:${task.done ? "line-through" : "none"}">
        ${task.text}
      </span>
      <button class="doneBtn">Done</button>
      <button class="deleteBtn">Delete</button>
    `;

    // Done button toggle
    li.querySelector(".doneBtn").addEventListener("click", async () => {
      const res = await fetch(`/tasks/${task.id}`, { method: "PUT" });
      const updated = await res.json();
      li.querySelector("span").style.textDecoration = updated.done
        ? "line-through"
        : "none";
    });

    // Delete button
    li.querySelector(".deleteBtn").addEventListener("click", async () => {
      await fetch(`/tasks/${task.id}`, { method: "DELETE" });
      li.remove();
    });

    taskList.appendChild(li);
  }

  loadTasks();
});
