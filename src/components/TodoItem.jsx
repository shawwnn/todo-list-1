import React, { useState } from 'react'

const TodoItem = ({ task, onDeleteTask, onEditTask, onToggleCompletion }) => {
  const [isFadingOut, setIsFadingOut] = useState(false)

  const handleDeleteTask = (e) => {
    e.stopPropagation()
    setIsFadingOut(true)
    setTimeout(() => {
      onDeleteTask(task.id)
    }, 155)
  }

  const handleEditTask = (e) => {
    if(e.target.type === 'checkbox' || e.target.tagName === 'BUTTON')  return
    onEditTask(task.id)
  }

  return (
    <li className={`task-item  
      ${isFadingOut ? 'fading-out' : ''}
      ${task.isCompleted ? 'completed' : ''}`} 

      onClick={handleEditTask}
    >
      <input type="checkbox" 
        checked={task.isCompleted}
        onChange={(e) => {
          e.stopPropagation()
          onToggleCompletion(task.id)}}
        />
      <span>{task.text}</span>
      <button 
        onClick={handleDeleteTask}
        disabled={task.isCompleted}
      >Delete</button>
    </li>
  )
}

export default TodoItem