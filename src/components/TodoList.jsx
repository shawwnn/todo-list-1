import TodoItem from "./TodoItem"

const TodoList = ({ tasks, onDeleteTask, onEditTask }) => {
  
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} 
          onDeleteTask={onDeleteTask} 
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  )
}

export default TodoList