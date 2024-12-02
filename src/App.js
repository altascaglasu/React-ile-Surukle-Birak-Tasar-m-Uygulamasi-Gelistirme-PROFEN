import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './components/DashboardPage/Dashboard';
import NotFoundPage from './components/ErrorPages/NotFoundPage';
import ProtectedRoutes from './routes/ProtectedRoutes';
import LoginForm from './components/LoginPage/LoginForm';

function App() {
  const loggedIn = useSelector((state) => state.user.loggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={loggedIn ? <Navigate to='/dashboard' /> : <LoginForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
