import {Route, BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import Footer from './components/Footer'
import About from './components/About'
import { useState, useEffect } from 'react'

const App=()=> {
  const name="arcticwolf"
  const [showPlus,setShowPlus]=useState(false)
  const [todos,setTodos]=useState([])

  useEffect(()=>{
    const getTodos=async ()=>{
      const serverTodos=await fetchTodos()
      
      setTodos(serverTodos)
    }
    getTodos()
  },[])

  //fetch todo
  const fetchTodos=async()=>{
    const res=await fetch('http://localhost:5000/todos')
    const data=await res.json()

    return data
  }

  const fetchTodo=async(id)=>{
    const res=await fetch(`http://localhost:5000/todos/${id}`)
    const data=await res.json()

    return data
  }

  // Add Todo
  const onAdd = async (todo) => {
    const res = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(todo),
    })

    const data = await res.json()

    setTodos([...todos, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTodo = { id, ...todo }
    // setTodos([...todos, newTodo])
  }

  // Delete todo
  const onDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTodos(todos.filter((todo) => todo.id !== id))
      : alert('Error Deleting This todo')
  }

  // Toggle Reminder
  const onToggle = async (id) => {
    const todoToToggle = await fetchTodo(id)
    const update = { ...todoToToggle, reminder: !todoToToggle.reminder }

    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(update),
    })

    const data = await res.json()

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, reminder: data.reminder } : todo
      )
    )
  }
  return (
    <Router>
      <div className="container">
        <Header onShow={()=>setShowPlus(!showPlus)} showPlus={showPlus}/>
        {showPlus && <AddTodo onAdd={onAdd}/> }
        {todos.length>0?
        <Todos todos={todos} onDelete={onDelete} onToggle={onToggle}/>  : "Nothing to do"
      }
      <Route path='/about' component={About} />
      <Footer />
      </div>
    </Router>
  );
}

export default App;
