import React from 'react'
import { useState } from 'react'

const TodoInput = ({ onAddTask }) => {
  const [task, setTask] = useState('')

  const handleAddTask = (e) => {
    e.preventDefault()
    onAddTask(task);
    setTask('')

  }
  
  return (
    <form className="task-input" 
      onSubmit={handleAddTask}
    >
			<input 
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
				placeholder='Enter your task'
			/>
			<button type="submit">Add</button>
			
    </form>
  )
}

export default TodoInput