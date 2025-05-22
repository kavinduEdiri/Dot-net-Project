// src/App.jsximport React from 'react';   
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import ListPost from './Components/ListPost';
import AddPost from './Components/AddPost';
import EditPost from './Components/EditPost';
import ShowPost from './Components/ShowPost';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <ListPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-post"
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/show/:id"
            element={
              <ProtectedRoute>
                <ShowPost />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;