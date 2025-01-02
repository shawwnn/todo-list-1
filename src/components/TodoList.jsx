import TodoItem from "./TodoItem"

const TodoList = ({ tasks, onDeleteTask, onEditTask, searchQuery, selectedFilter, onToggleCompletion }) => {

  const filteredTasks = tasks.filter((task) => {
    if (searchQuery !== '') {
      const queryWords = searchQuery.toLowerCase().split(' ').filter(Boolean);
      const taskWords = task.text.toLowerCase().split(' ').filter(Boolean);
      
      // Sequential Word Matching Logic
      let queryIndex = 0;
      for (let i = 0; i < taskWords.length; i++) {
        if (taskWords[i].startsWith(queryWords[queryIndex])) {
          queryIndex++;
        }
        if (queryIndex === queryWords.length) {
          break; // Stop once all query words matched sequentially
        }
      }

      if (queryIndex !== queryWords.length) {
        return false; // If not all query words are matched, exclude the task
      }
    } // Show all if search is empty
  
    // Filter Logic
    if (selectedFilter === 'All') return true
    if (selectedFilter === 'Active') return !task.isCompleted
    if (selectedFilter === 'Completed') return task.isCompleted

    return true
  });

  const filterText = selectedFilter === 'All' ? '' : ` in ${selectedFilter}`

  return (
    <>
      {filteredTasks.length === 0 ? (
        <p className="no-tasks-message">
          No tasks found {searchQuery ? `for '${searchQuery}'`  : ''}{filterText}.
        </p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <TodoItem key={task.id} task={task} 
              onDeleteTask={onDeleteTask} 
              onEditTask={onEditTask}
              onToggleCompletion={onToggleCompletion}
            />
          ))}
        </ul>
      )}
    </>
  )
}

export default TodoList