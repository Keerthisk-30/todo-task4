const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // if you have frontend files in "public" folder

// Sample in-memory tasks (replace with DB if needed)
let tasks = [
  { id: 1, title: "Sample Task", completed: false }
];

// API Routes
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = req.body.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

app.delete("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.json({ message: "Task deleted" });
});

// PORT for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
