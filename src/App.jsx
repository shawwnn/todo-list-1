import { useEffect, useState } from "react"
import Header from "./components/Header"
import TodoList from "./components/todoList"
import TodoSearch from "./components/TodoSearch"
import AddEditTodoModal from "./components/AddEditTodoModal"
import TodoFilter from "./components/TodoFilter"
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import ToastContent from "./components/ToastContent"

function App() {
  const [tasks, setTasks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('All')

  useEffect(() => {
    fetchLatestGitCommit().then((message) => {
      showToast('Change Logs', message);  // Display toast with latest commit message
    });

    axios.get('http://localhost:3000/tasks')
      .then((response) => {
        setTasks(response.data)
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error)
      })  
  }, [])
  

  const editTask = (id) => {
    const selectedTask = tasks.find((task) => task._id === id);
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
      task => task._id === editingTaskId?.text)?.text) {
      setIsModalOpen(false)
      setEditingTaskId(null)
      return
    }
  

    if (id !== null) {
      // Updating an existing task 

      // const updatedTasks = tasks.map((task) => 
      //   task._id === id ? {...task, text: taskText} : task
      // )
      // setTasks(updatedTasks)

      axios.put(`http://localhost:3000/tasks/${id}`, { text: taskText })
        .then((response) => {
          // Update the task in the state with the returned updated task
          const updatedTasks = tasks.map((task) => 
            task._id === id ? {...task, text: taskText } : task
          )
          setTasks(updatedTasks)
          setIsModalOpen(false)
          setEditingTaskId(null)
          setSearchQuery('')
        })
        .catch((error) => {
          console.error('Error updating task:', error)
        })
    } else {
      // Add a New Task
      const newTask = {
        text: taskText,
        isCompleted: false,
      }

      // const newTasks = ((prevTasks) =>  [...prevTasks, newTask])
      // setTasks(newTasks)

      axios.post('http://localhost:3000/tasks', newTask)
        .then((response) => {
          setTasks((prevTasks) => [...prevTasks, response.data])
        })
        .catch((error) => {
          console.error('Error adding task:', error)
        })
    }
    setEditingTaskId(null)
    setSearchQuery('')
    setIsModalOpen(false)
  }
  
  const deleteTask = async (taskId) => {
    // const remainingTasks = tasks.filter((task) => task._id !== taskId) 
    // setTasks(remainingTasks)
    // // setTaskText('')
    // setSearchQuery('')

    try {
      // Send a DELETE request to the backend to delete the task
      const response = await axios.delete(`http://localhost:3000/tasks/${taskId}`)

      if (response.status === 200) {
        // Task was deleted successfully, now update the local state
        const remainingTasks = tasks.filter((task) => task._id !== taskId)
        setTasks(remainingTasks)
        console.log('Task successfully deleted');
      } else {
        console.error('Error deleting task, unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const searchChange = (e) => {
    setSearchQuery(e.target.value)
    // setTaskText('')
  }

  const clearSearch = (e) => {
    setSearchQuery('')
    // setTaskText('')
  }

  const toggleCompletion = async (taskId) => {
    // const updatedTasks = tasks.map((task) => 
    //   task._id === taskId ? {...task, isCompleted: !task.isCompleted } : task
    // )
    // setTasks(updatedTasks)
    // // setTaskText('')
    
    try {
      // Find the task in the local state
      const taskToUpdate = tasks.find((task) => task._id === taskId)

      if (!taskToUpdate) {
        console.error("Task not found");
        return;
      }

      const updatedStatus =!taskToUpdate.isCompleted

      // Send a PATCH request to the backend to update the task completion status
      const response = await axios.patch(`http://localhost:3000/tasks/${taskId}`, {
        isCompleted: updatedStatus
      })

      // Only update the local state with the updated status
      if ( response.status === 200) {
        const updatedTasks = tasks.map((task) => 
          task._id === taskId ? { ...task, isCompleted: updatedStatus } : task 
        )
        setTasks(updatedTasks)
      } else {
        console.error("Failed to update task completion")
      }

    } catch (error) {
      console.error("Error updating task completion", error)
    }
  }

  // const fetchLatestGitCommit = async () => {
  //   try {
  //     const response = await fetch('/api/latest-commit');  // Make sure your backend provides this
  //     const commit = await response.json();
  //     return commit.message;
  //   } catch (error) {
  //     console.error('Failed to fetch latest commit', error);
  //     return 'No updates available.';
  //   }
  // };

  const fetchLatestGitCommit = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/latest-commit'); // Replace with your API endpoint
      return response.data.message; // Assuming the API returns { message: "commit message" }
    } catch (error) {
      console.error('Error fetching latest Git commit:', error);
      return 'No updates available.';
    }
  };
    
  // Show the toast notification when the app loads
  const showToast = (title, message, type = "info") => {
    toast[type](<ToastContent title={title} subtitle={message} />, {
      position: "top-right",    // Toast position
      autoClose: 9000,          // Duration (5 seconds)
      hideProgressBar: true,    // Hides progress bar
      closeOnClick: true,       // Allows closing by clicking
      className: "custom-toast",
    });
  };

  return (
    <div className="todo-container">
      <Header />
      <ToastContainer />
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
        task={tasks.find((task) => task._id === editingTaskId)} // Find the task by id
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