import React from 'react'
import { useState } from 'react'

const TodoInput = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('')

  const handleAddTask = (e) => {
    e.preventDefault()
    onAddTask(taskText);
    setTaskText('')
  }
  
  return (
    <form className="task-input" 
      onSubmit={handleAddTask}
    >
			<input 
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
				placeholder='Enter your task'
			/>
			<button type="submit">Add</button>
			
    </form>
  )
}

export default TodoInput