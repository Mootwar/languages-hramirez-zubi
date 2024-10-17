// app.js: Collaborative To-Do List Backend

const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Use environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection setup
const pool = new pg.Pool({
  user: process.env.DB_USER || 'your_user',
  host: process.env.DB_HOST || 'db',  // Use 'db' as the hostname (service name in docker-compose.yml)
  database: process.env.DB_NAME || 'todo_db',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432,
});


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend files

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching tasks.');
  }
});

// Add a new task
app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).send('Task title is required.');

  try {
    await pool.query('INSERT INTO tasks (title) VALUES ($1)', [title]);
    res.status(201).send('Task added.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding task.');
  }
});

// Toggle task completion status
app.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    await pool.query('UPDATE tasks SET status = NOT status WHERE id = $1', [taskId]);
    res.send('Task status updated.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating task status.');
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
    res.send('Task deleted.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting task.');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.send('Server is running.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
