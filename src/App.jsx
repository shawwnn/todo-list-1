import { useState } from "react"
import Header from "./components/Header"
import TodoList from "./components/todoList"
import TodoSearch from "./components/TodoSearch"
import AddEditTodoModal from "./components/AddEditTodoModal"
import TodoFilter from "./components/TodoFilter"

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Finish react project', isCompleted: true },
    { id: 2, text: 'Buy dinner', isCompleted: false },
    { id: 3, text: 'Get the rewards', isCompleted: false },
    { id: 4, text: 'Clean the house', isCompleted: false },
    { id: 5, text: 'Prepare meeting notes', isCompleted: false },
    { id: 6, text: 'Go for a walk', isCompleted: false },
    { id: 7, text: 'Read the book', isCompleted: true },
    { id: 8, text: 'Organize the workspace', isCompleted: false },
    { id: 9, text: 'Attend the conference', isCompleted: false },
    { id: 10, text: 'Reply to emails', isCompleted: false },
    { id: 11, text: 'Prepare dinner', isCompleted: false },
  ]);

  // const [taskText, setTaskText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('All')



  const editTask = (id) => {
    const selectedTask = tasks.find((task) => task.id === id);
    if (selectedTask?.isCompleted) {
      // Prevent editing if the task is completed
      return;
    }

    setEditingTaskId(id)
    setSearchQuery('')
    // setTaskText(selectedTask.text); 
    setIsModalOpen(true);
  }

  const saveTask = (id, taskText) => {
    if (taskText.trim() === '') return

    if (taskText === tasks.find(
      task => task.id === editingTaskId?.text)?.text) {
      setIsModalOpen(false)
      setEditingTaskId(null)
      return
    }
  

    if (id !== null) {
      const updatedTasks = tasks.map((task) => 
        task.id === id ? {...task, text: taskText} : task
      )
      setTasks(updatedTasks)
    } else {
      const newTask = {
        id: Date.now(),
        text: taskText,
        isCompleted: false,
      }

      const newTasks = ((prevTasks) =>  [...prevTasks, newTask])
      setTasks(newTasks)
    }
    setEditingTaskId(null)
    setSearchQuery('')
    setIsModalOpen(false)
  }
  
  const deleteTask = (taskId) => {
    const remainingTasks = tasks.filter((task) => task.id !== taskId) 
    setTasks(remainingTasks)
    // setTaskText('')
    setSearchQuery('')
  }

  const searchChange = (e) => {
    setSearchQuery(e.target.value)
    // setTaskText('')
  }

  const clearSearch = (e) => {
    setSearchQuery('')
    // setTaskText('')
  }

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => 
      task.id === taskId ? {...task, isCompleted: !task.isCompleted } : task
    )
    setTasks(updatedTasks)
    // setTaskText('')
  }

  return (
    <div className="todo-container">
      <Header />
      <TodoFilter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
      <TodoSearch 
        searchQuery={searchQuery} 
        onSearchChange={searchChange}
        onClearSearch={clearSearch}
      />
      {/* <div className="add-task-container"> */}
        <button onClick={() => setIsModalOpen(true)} className="todo-plus-button">
          +
        </button>
      {/* </div> */}
      
      <AddEditTodoModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        task={tasks.find((task) => task.id === editingTaskId)} // Find the task by id
        onSave={saveTask}
        editingTaskId={editingTaskId}
      />

  
      <TodoList 
        onDeleteTask={deleteTask} 
        tasks={tasks} 
        onEditTask={editTask} 
        searchQuery={searchQuery}
        selectedFilter={selectedFilter}
        onToggleCompletion={toggleCompletion}
      />
      
    </div>
  )
}

export default App