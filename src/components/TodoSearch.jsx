import React from 'react'

const TodoSearch = () => {
  return (
		<>
			{/* Search Bar */}
    	<div className="search-container">
    		<input
      		type="text"
      		// value={searchQuery}
      		// onChange={handleSearchChange}
      		placeholder="Search tasks..."
    		/>
    		<button 
					// onClick={clearSearch}
				>×</button>
  		</div>
		</>
  )
}

export default TodoSearch