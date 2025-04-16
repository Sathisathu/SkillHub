import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './User/Components/Login'
import Signup from './User/Components/Signup'
import UserDashboard from './User/Components/UserDashboard'

function App() {
  return (
    <Routes>
        <Route path='/' element= {<Login/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/dashboard' element={<UserDashboard/>}/>
    </Routes>
    
    
  )
}

export default App