import React from 'react'

const TodoItem = ({ key, task }) => {
  return (
    <li key={key}>
        <span>{task}</span>
        <button>Delete</button>
    </li>
  )
}

export default TodoItem