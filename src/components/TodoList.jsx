import TodoItem from "./TodoItem"

const TodoList = ({ tasks, onDeleteTask }) => {
  
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} onDeleteTask={onDeleteTask} />
      ))}
    </ul>
  )
}

export default TodoList