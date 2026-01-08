import React from 'react'
import { Route, Routes } from 'react-router-dom'

import RegisterPage from './screens/RegisterPage';
import LoginPage from './screens/LoginPage';
import { Homepage } from './screens/Homepage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App
