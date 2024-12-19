import React from 'react'

const TodoInput = () => {
  return (
    <div className="task-input">
			<input type="text" 
				placeholder='Enter your task'
			/>
			<button>Add</button>
			
    </div>
  )
}

export default TodoInput