import { useState } from "react"
import TodoItem from "./TodoItem"

const TodoList = () => {
  const [tasks, setTasks] = useState([
    'Finish react project',
    'Buy dinner',
    'Get the rewards',
  ])

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <TodoItem key={index} task={task} />
      ))}
    </ul>
  )
}

export default TodoList