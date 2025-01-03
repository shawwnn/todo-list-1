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
const mongoURI = 'mongodb+srv://shangellapuz:FtXFl39mIjZOV7jh@clusteramazonsingapore.cc7zf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAmazonSingapore'
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
	.catch((err) => console.error('MongoDB Connection Error:', err))

// Task Schema
const taskSchema = new mongoose.Schema({
	text: String,
	isCompleted: Boolean,
})

const Task = mongoose.model('Task', taskSchema)

// API Routes
app.get('/tasks', async (req, res) => {
	const tasks = await Task.find()
	res.json(tasks)
})

app.post('/tasks', async (req, res) => {
	const { text, isCompleted } = req.body
	const newTask = new Task({ text, isCompleted: isCompleted || false })
	await newTask.save()
	res.json(newTask)
})

app.put('/tasks/:id', async (req, res) => {
	const { text, isCompleted } = req.body 
	const updatedTask = await Task.findByIdAndUpdate(req.params.id, { text, isCompleted }, {new: true})
	res.json(updatedTask)
})

app.delete('/tasks:id', async (req, res) => {
	await Task.findByIdAndDelete(req.params.id)
	res.json({ message: 'Task Deleted' })
})

// Start Server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})

