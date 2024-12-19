import React from 'react'

const TodoItem = ({ key, task }) => {
  return (
    <li key={key}>
        <span>{task}</span>
        {/* {task} */}
        <button>Delete</button>
    </li>
  )
}

export default TodoItem