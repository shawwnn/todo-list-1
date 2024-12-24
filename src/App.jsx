import { useState } from "react"
import Header from "./components/Header"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/todoList"


function App() {
  const [tasks, setTasks] = useState([
    {id: 1, text: 'Finish react project'},
    {id: 2, text: 'Buy dinner'},
    {id: 3, text: 'Get the rewards'},
  ])

  const addTask = (taskText) =>  {
    if (taskText.trim() === '') return
    
    const newTask = {
      id: Date.now(),
      text: taskText,
    }

    const newTasks = [...tasks, 
      newTask
    ]
    setTasks(newTasks);
  }

  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId) 
    setTasks(filteredTasks)
  }

  return (
    <div className="todo-container">
      <Header />
      <TodoInput onAddTask={addTask} />
      <TodoList onDeleteTask={deleteTask} tasks={tasks} />
      
    </div>
  )
}

export default App
