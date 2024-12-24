import React, { useState } from 'react'

const TodoItem = ({ task, onDeleteTask }) => {
  const [isDeleted, setIsDeleted] = useState(false)

  const handleDeleteTask = () => {
    setIsDeleted(true)
    setTimeout(() => {
      onDeleteTask(task.id)
    }, 300)
  }

  return (
    <li className={`task-item  
      ${isDeleted ? 'deleted' : ''}`} >
        <span>{task.text}</span>
        <button onClick={handleDeleteTask}>Delete</button>
    </li>
  )
}

export default TodoItem