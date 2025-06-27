import { Routes, Route, Navigate } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import useAuth from "./hooks/useAuth";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  return isAuthenticated && user?.role === "ADMIN" ? (
    children
  ) : (
    <Navigate to="/" />
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<>Login Page</>} />
          <Route path="/signup" element={<>Signup Page</>} />
          <Route path="/books" element={<>Book List</>} />
          <Route path="/books/:id" element={<>Book Detail</>} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <>Profile Page</>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <>Admin Dashboard</>
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
