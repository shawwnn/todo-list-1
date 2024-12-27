import TodoItem from "./TodoItem"

const TodoList = ({ tasks, onDeleteTask, onEditTask, searchQuery, onToggleCompletion }) => {
  const filteredTasks = tasks.filter((task) => 
    searchQuery === '' || task.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <TodoItem key={task.id} task={task} 
          onDeleteTask={onDeleteTask} 
          onEditTask={onEditTask}
          onToggleCompletion={onToggleCompletion}
        />
      ))}
    </ul>
  )
}

export default TodoList