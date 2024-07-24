import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home'
import NotFound from './pages/notfound'
import Login from './pages/login';
import Header from './components/layouts/header';
import ForgetPassword from './pages/forget-password';
import ResetPassword from './pages/reset-password';
import NewPassword from './pages/new-password';
import Register from './pages/register';
import Schedule from './pages/schedule';
import Annual from './pages/memberships/annual';
import './index.css'

const App: React.FC = () => {
  return(
    <Router>
      <div className="content">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/membership/annual" element={<Annual />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
