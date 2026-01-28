import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BookService from './pages/BookService';
import AdminDashboard from './pages/AdminDashboard';
import TrackService from './pages/TrackService';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminPortal from './pages/AdminPortal';
import UserPortal from './pages/UserPortal';
import ProviderPortal from './pages/ProviderPortal';
import ProviderLogin from './pages/ProviderLogin';
import ProviderRegister from './pages/ProviderRegister';
import ProviderDashboard from './pages/ProviderDashboard';

import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/portal" element={<UserPortal />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/book" element={<BookService />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/portal" element={<AdminPortal />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/provider/portal" element={<ProviderPortal />} />
            <Route path="/provider/login" element={<ProviderLogin />} />
            <Route path="/provider/register" element={<ProviderRegister />} />
            <Route path="/provider" element={<ProviderDashboard />} />
            <Route path="/track" element={<TrackService />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
