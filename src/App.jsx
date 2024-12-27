import { useState } from "react"
import Header from "./components/Header"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/todoList"
import TodoSearch from "./components/TodoSearch"


function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Finish react project', isCompleted: false },
    { id: 2, text: 'Buy dinner', isCompleted: false },
    { id: 3, text: 'Get the rewards', isCompleted: false },
    { id: 4, text: 'Clean the house', isCompleted: false },
    { id: 5, text: 'Prepare meeting notes', isCompleted: false },
    { id: 6, text: 'Go for a walk', isCompleted: false },
    { id: 7, text: 'Read a book', isCompleted: false },
    { id: 8, text: 'Organize the workspace', isCompleted: false },
    { id: 9, text: 'Attend the conference', isCompleted: false },
    { id: 10, text: 'Reply to emails', isCompleted: false },
    { id: 11, text: 'Prepare dinner', isCompleted: false },
  ]);

  const [taskText, setTaskText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  // const [isCompleted, setIsCompleted] = useState(false)

  const [editingTaskId, setEditingTaskId] = useState(null)

  const editTask = (id) => {
    const selectedTask = tasks.find((task) => task.id === id);
    if (selectedTask?.isCompleted) {
      // Prevent editing if the task is completed
      return;
    }

    setEditingTaskId(id)
    setSearchQuery('')
    setTaskText(selectedTask.text); 
  }

  const saveTask = (id, taskText) => {
    if (taskText.trim() === '') return
    if (id !== null) {
      const updatedTasks = tasks.map((task) => 
        task.id === id ? {...task, text: taskText} : task
      )
      setTasks(updatedTasks)
    } else {
      const newTask = {
        id: Date.now(),
        text: taskText,
      }

      const newTasks = ((prevTasks) =>  [...prevTasks, newTask])
      setTasks(newTasks)
    }
    setEditingTaskId(null)
    setTaskText('')
    setSearchQuery('')
  }
  
  const deleteTask = (taskId) => {
    const remainingTasks = tasks.filter((task) => task.id !== taskId) 
    setTasks(remainingTasks)
    setTaskText('')
    setSearchQuery('')
  }

  const searchChange = (e) => {
    setSearchQuery(e.target.value)
    setTaskText('')
  }

  const clearSearch = (e) => {
    setSearchQuery('')
    setTaskText('')
  }

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => 
      task.id === taskId ? {...task, isCompleted: !task.isCompleted } : task
    )
    setTasks(updatedTasks)
    setTaskText('')
  }

  return (
    <div className="todo-container">
      <Header />
      <TodoSearch 
        searchQuery={searchQuery} 
        onSearchChange={searchChange}
        onClearSearch={clearSearch}
      />
      <TodoInput
        editingTaskId={editingTaskId}
        tasks={tasks}
        onSaveTask={saveTask}
        taskText={taskText}
        setTaskText={setTaskText}
        
      />
      
  
      <TodoList 
        onDeleteTask={deleteTask} 
        tasks={tasks} 
        onEditTask={editTask} 
        searchQuery={searchQuery}
        onToggleCompletion={toggleCompletion}
      />
      
    </div>
  )
}

export default App