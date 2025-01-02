import React from 'react'

const TodoSearch = ({ searchQuery, onSearchChange, onClearSearch}) => {
  return (
		<>
			<div className="search-container">
				<i className="search-icon fas fa-search"></i>
				<input
					type="text"
					value={searchQuery}
					onChange={onSearchChange}
					placeholder="Search tasks..."
				/>
				<button 
					onClick={onClearSearch}
				>×</button>
			</div>
		</>
  )
}

export default TodoSearch