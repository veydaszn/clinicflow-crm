import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import RequireAuth from "./auth/RequireAuth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/patients"
          element={
            <RequireAuth>
              <Patients />
            </RequireAuth>
          }
        />
        <Route
          path="/appointments"
          element={
            <RequireAuth>
              <Appointments />
            </RequireAuth>
          }
        />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
