import TodoItem from "./TodoItem"

const TodoList = ({ tasks, onDeleteTask, onEditTask, searchQuery, onToggleCompletion }) => {
  // const filteredTasks = tasks.filter((task) => 
  //   searchQuery === '' || task.text.toLowerCase().includes(searchQuery.toLowerCase())
  // )

  const filteredTasks = tasks.filter((task) => {
    if (searchQuery === '') return true; // Show all if search is empty
  
    const queryWords = searchQuery.toLowerCase().split(' ').filter(Boolean);
    const taskWords = task.text.toLowerCase().split(' ').filter(Boolean);
  
    let queryIndex = 0;
  
    for (let i = 0; i < taskWords.length; i++) {
      if (taskWords[i].startsWith(queryWords[queryIndex])) {
        queryIndex++;
      }
      if (queryIndex === queryWords.length) {
        return true; // All query words matched sequentially
      }
    }
  
    return false;
  });

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