// client/src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './User/Components/Login';
import Signup from './User/Components/Signup';
import UserDashboard from './User/Components/UserDashboard';
import UserProfilePage from './User/Components/UserProfilePage'; // Import UserProfilePage

function App() {
  return (
    <Routes>
        <Route path='/' element= {<Login/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/dashboard' element={<UserDashboard/>}/>
        {/* New Route for User Profile Page */}
        <Route path="/profile/:userId" element={<UserProfilePage />} />
    </Routes>
  );
}

export default App;