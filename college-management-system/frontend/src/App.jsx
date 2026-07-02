import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";

import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./routes/ProtectedRoute";

import Dashboard from "./pages/dashboard/Dashboard";

import StudentList from "./pages/students/StudentList";
import AddStudent from "./pages/students/AddStudent";
import EditStudent from "./pages/students/EditStudent";
import StudentDetails from "./pages/students/StudentDetails";
import FacultyList from "./pages/faculty/FacultyList";
import AddFaculty from "./pages/faculty/AddFaculty";
import EditFaculty from "./pages/faculty/EditFaculty";

export default function App() {
  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
       path="/students"
       element={
        <ProtectedRoute>
        <AdminLayout>
           <StudentList />
        </AdminLayout>
        </ProtectedRoute>
      }
     />

      <Route
  path="/students/add"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AddStudent />
      </AdminLayout>
    </ProtectedRoute>
  }
/>
      <Route
  path="/students/edit/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <EditStudent />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/students/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <StudentDetails />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

      <Route
  path="/faculty"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <FacultyList />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/faculty/add"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <AddFaculty />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

      <Route
  path="/faculty/edit/:id"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <EditFaculty />
      </AdminLayout>
    </ProtectedRoute>
  }
/>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}