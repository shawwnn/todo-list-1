import { useState } from "react"
import TodoItem from "./TodoItem"

const TodoList = ({ tasks }) => {
  
  
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <TodoItem key={index} task={task} />
      ))}
    </ul>
  )
}

export default TodoList