import { useState } from 'react'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="todo-container">
      <Header />
      <TodoInput />
      <TodoList />
    </div>
  )
}

export default App
