import { useState } from "react"
import Header from "./components/Header"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/todoList"
import TodoSearch from "./components/TodoSearch"


function App() {
  const [tasks, setTasks] = useState([
    {id: 1, text: 'Finish react project'},
    {id: 2, text: 'Buy dinner'},
    {id: 3, text: 'Get the rewards'},
  ])
  const [taskText, setTaskText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const [editingTaskId, setEditingTaskId] = useState(null)

  const editTask = (id) => {
    setEditingTaskId(id)
    setSearchQuery('')
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
      />
      
    </div>
  )
}

export default App