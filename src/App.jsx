import Header from "./components/Header"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/todoList"


function App() {

  return (
    <div className="todo-container">
      <Header />
      <TodoInput />
      <TodoList />
      
    </div>
  )
}

export default App
