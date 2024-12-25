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
  const [taskText, setTaskText] = useState('')

  const [editingTaskId, setEditingTaskId] = useState(null)

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

  const editTask = (id) => {
    setEditingTaskId(id)
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
  }
  
  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId) 
    setTasks(filteredTasks)
    setTaskText('')
  }

  return (
    <div className="todo-container">
      <Header />
      <TodoInput
        editingTaskId={editingTaskId}
        tasks={tasks}
        onSaveTask={saveTask}
        taskText={taskText}
        setTaskText={setTaskText}
      />
      
  
      <TodoList onDeleteTask={deleteTask} tasks={tasks} onEditTask={editTask} />
      
    </div>
  )
}

export default App
