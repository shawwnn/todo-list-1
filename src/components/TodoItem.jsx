import React, { useState } from 'react'

const TodoItem = ({ task, onDeleteTask, onEditTask }) => {
  const [isDeleted, setIsDeleted] = useState(false)

  const handleDeleteTask = () => {
    setIsDeleted(true)
    setTimeout(() => {
      onDeleteTask(task.id)
    }, 155)
  }

  return (
    <li className={`task-item  
      ${isDeleted ? 'deleted' : ''}`} 
      onClick={() => {onEditTask(task.id)}}
    >
        <span>{task.text}</span>
        <button onClick={handleDeleteTask}>Delete</button>
    </li>
  )
}

export default TodoItem