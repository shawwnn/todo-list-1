const express = require('express')
const mongoose = require ('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios');
require('dotenv').config()

// App Initialization

const app = express()
const PORT = process.env.PORT

// Middleware 
app.use(cors())
app.use(bodyParser.json())

// MongoDB Connection
const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
	.catch((err) => console.error('MongoDB Connection Error:', err))

// forcing  db used. due  to  Task vs taskdb
const db = mongoose.connection.useDb('Task');  // Force using 'Task' database

// Task Schema
const taskSchema = new mongoose.Schema({
	text: String,
	isCompleted: Boolean,
})

// const Task = mongoose.model('Task', taskSchema)
const Task = db.model('Task', taskSchema);  // Define the model for tasks collection inside Task db


// API Routes
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});


app.post('/tasks', async (req, res) => {
	const { text, isCompleted } = req.body
	const newTask = new Task({ text, isCompleted: isCompleted || false })
	await newTask.save()
	res.json(newTask)
})

app.post('/tasks/bulk-insert', async (req, res) => {
    const tasks = [
        // { text: 'Finish react project', isCompleted: true },
        // { text: 'Buy dinner', isCompleted: false },
        // { text: 'Get the rewards', isCompleted: false },
        // { text: 'Clean the house', isCompleted: false },
        // { text: 'Prepare meeting notes', isCompleted: false },
        // { text: 'Go for a walk', isCompleted: false },
        // { text: 'Read the book', isCompleted: true },
        // { text: 'Organize the workspace', isCompleted: false },
        // { text: 'Attend the conference', isCompleted: false },
        // { text: 'Reply to emails', isCompleted: false },
        // { text: 'Prepare dinner', isCompleted: false }
    ];
    await Task.insertMany(tasks);
    res.json({ message: 'Tasks inserted successfully' });
});


app.put('/tasks/:id', async (req, res) => {
	const { text, isCompleted } = req.body 
	const updatedTask = await Task.findByIdAndUpdate(req.params.id, { text, isCompleted }, {new: true})
	res.json(updatedTask)
})

app.patch('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await Task.findByIdAndUpdate(
      taskId,
      { $set: { isCompleted: req.body.isCompleted } }, // Set the new isCompleted status
      { new: true } // Return the updated task
    )
    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }
    res.json(task)
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({ error: "Failed to update task" })
  }
})

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting task with ID: ${id}`); // Debugging log
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
});

// app.get('/api/latest-commit', async (req, res) => {
//   try {
//     // Fetch the latest commit using GitHub API (replace with your repo details)
//     const response = await axios.get('https://api.github.com/repos/shawwnn/todo-list-1/commits');
//     const commits = response.data;
//     const latestCommit = commits[0];  // Get the most recent commit
//     res.json({ message: latestCommit.commit.message });
//   } catch (error) {
//     console.error('Error fetching commit', error);
//     res.status(500).json({ message: 'Error fetching commit data' });
//   }
// });

app.get('/api/latest-commit', async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com/repos/shawwnn/todo-list-1/commits');
    const commits = await response.data;
    // console.log('GitHub API Response:', response.status, response.data);
    // console.log(response)
    
    if (commits.length === 0) {
      return res.status(404).json({ message: 'No commits found' });
    }

    const latestCommit = commits[0];  // Get the most recent commit
    res.json({ message: latestCommit.commit.message });
  } catch (error) {
    console.error('Error fetching commit:', error);
    console.error('Full error details:', error.response ? error.response.data : error.message);  // Log the response details
    res.status(500).json({ message: `Error fetching commit data: ${error.message}`, error: error.response?.data || error });
  }
});


// Start Server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})

