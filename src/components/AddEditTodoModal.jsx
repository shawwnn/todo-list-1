import React, { useEffect, useState } from 'react'
import '../css/addedittodomodal.css'

const AddEditTodoModal = ({ isOpen, setIsOpen, task, onSave }) => {
	const [text, setText] = useState(task ? task.text : '')

	const handleClose = () => {
		setIsOpen(false)
	}

	const handleSave = () => {
		onSave(task.id, text)
	}

  useEffect(() => {
    if (task) {
      setText(task.text);  
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