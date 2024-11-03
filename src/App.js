import './App.css';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDashbord from './component/admin/AdminDashbord';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <AdminDashbord/>
        }
      />
      <Route
        path="/employee"
        element={
          <Dashboard/>
        }
      />
    </Routes>
  </Router>
  );
}

export default App;
