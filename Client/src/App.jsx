import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fcfcfd] text-gray-900">
        <Navbar />

        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          /><Route path="/profile" element={<Profile />} />
          <Route
            path="/myposts"
            element={
              <ProtectedRoute>
                <MyPosts />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;