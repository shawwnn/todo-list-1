import React, { useEffect } from 'react'
import { useState } from 'react'
// import TodoFilter from './TodoFilter'

const TodoInput = ({ editingTaskId, tasks, onSaveTask, taskText, setTaskText }) => {
  const handleAddTask = (e) => {
    e.preventDefault()
    if(editingTaskId !== null) {
      onSaveTask(editingTaskId, taskText)
    } else {
      onSaveTask(null, taskText)
    }
  }

  useEffect(() => {
    if (editingTaskId !== null){
      const taskToEdit = tasks.find((task) => task.id === editingTaskId)
      if (taskToEdit) setTaskText(taskToEdit.text)
    }
  }, [editingTaskId, tasks])
  
  
  return (
    <>
      <form className="task-input" 
        onSubmit={handleAddTask}
      >
        <input 
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder='Enter your task'
        />
        <button type="submit">
          {/* Add */}
          {editingTaskId !== null ? 'Edit' : 'Add'}
        </button>
        
      </form>
      {/* <TodoFilter /> */}
    </>
  )
}

export default TodoInput