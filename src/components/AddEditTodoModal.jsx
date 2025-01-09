import React, { useEffect, useState } from 'react'
import '../css/addedittodomodal.css'

const AddEditTodoModal = ({ isOpen, setIsOpen, task, onSave, editingTaskId }) => {
	const [text, setText] = useState(task ? task.text : '')

	const handleClose = () => {
		setIsOpen(false)
		setText('')
	}

	const handleSave = () => {
		if (!task && editingTaskId === null) {
			// If task doesn't exist and there's no editingTaskId, this means it's an Add Task action 
			onSave(null, text);
		} else {
			// Proceed with saving the task
			onSave(task._id, text)
		}
	}

  useEffect(() => {
    if (task && task.text) {
      setText(task.text);  
	} else {
		setText(''); // Clear the text when no task is selected (adding a new task)
	  }
  }, [task]);
 
  return (
    isOpen && (
			<div className="todo-modal-overlay">
				<div className="todo-modal">
					<h2>{task ? 'Edit Task' : 'Add Task' }</h2>
					<input
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Enter your task here"
					/>

					<div className="todo-modal-buttons">
						<button onClick={handleSave}>
							{task ? '✓' : '+'}
						</button>
						<button onClick={handleClose}>x</button>
					</div>
				</div>
			</div>
		)
  )
}

export default AddEditTodoModal