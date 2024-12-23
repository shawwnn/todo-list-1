import { useState } from "react"
import Header from "./components/Header"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/todoList"


function App() {
  const [tasks, setTasks] = useState([
    'Finish react project',
    'Buy dinner',
    'Get the rewards',
  ])

  const addTask = (task) =>  {
    const newTasks = [...tasks, task]
    setTasks(newTasks);
    console.log(tasks);
  }

  return (
    <div className="todo-container">
      <Header />
      <TodoInput onAddTask={addTask} />
      <TodoList tasks={tasks} />
      
    </div>
  )
}

export default App
