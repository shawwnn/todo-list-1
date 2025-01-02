import React, { useState } from 'react'
import '../css/todofilter.css'

const TodoFilter = ({ selectedFilter, setSelectedFilter}) => {

	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const toggleFilterDropdown = () => setIsFilterOpen(!isFilterOpen)

	const handleSelectFilter = (filter) => {
		setSelectedFilter(filter)
		setIsFilterOpen(false)
	}

  return (
    <div className="filter-container">
			<button className="filter-button" onClick={toggleFilterDropdown}>
				{selectedFilter} <span className="arrow">{isFilterOpen ? '^' : 'v'}</span>
			</button>
			{isFilterOpen && (
				<ul className="filter-menu">
					<li><a href="#" className="" onClick={() => handleSelectFilter('All')}>All</a></li>
					<li><a href="#" className="" onClick={() => handleSelectFilter('Active')}>Active</a></li>
					<li><a href="#" className="" onClick={() => handleSelectFilter('Completed')}>Completed</a></li>
				</ul>
			)}
    </div>
  )
}

export default TodoFilter