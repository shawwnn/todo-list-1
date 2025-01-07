const express = require('express')
const mongoose = require ('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

// App Initialization

const app = express()
const PORT = 3000

// Middleware 
app.use(cors())
app.use(bodyParser.json())

// MongoDB Connection
// const mongoURI = 'mongodb+srv://shangellapuz:FtXFl39mIjZOV7jh@clusteramazonsingapore.cc7zf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAmazonSingapore'
const mongoURI = 'mongodb+srv://shangellapuz:FtXFl39mIjZOV7jh@clusteramazonsingapore.cc7zf.mongodb.net/Task?retryWrites=true&w=majority&appName=ClusterAmazonSingapore';


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
    console.log('GET /tasks route triggered');
    const tasks = await Task.find();
    console.log('Fetched tasks:', tasks);
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
        { text: 'Prepare meeting notes', isCompleted: false },
        { text: 'Go for a walk', isCompleted: false },
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

app.delete('/tasks/:id', async (req, res) => {
	await Task.findByIdAndDelete(req.params.id)
	res.json({ message: 'Task Deleted' })
})

// Start Server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})

