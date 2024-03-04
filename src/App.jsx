import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./loyaut/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Series from "./pages/Series";
import Bookmarks from "./pages/Bookmarks";
import About from "./pages/About";

function ProtectedRoute({ children, redirectTo = '/login', isAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return children;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      navigate('/')
    } 
      if (!localStorage.getItem('token')) {
        navigate('/login');
        setToken('');
      }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        {!token && <Route path="/login" element={<Login />} />}
        <Route path="/" element={<Layout setSearch={setSearch} />}>
          <Route
            index
            element={
              <ProtectedRoute isAuthenticated={token ? true : false}>
                <Home search={search}></Home>
              </ProtectedRoute>
            }
          />
          <Route path="movie" element={<Movie search={search}/>} />
          <Route path="series" element={<Series search={search}/>} />
          <Route path="bookmarks" element={<Bookmarks search={search}/>} />
        </Route>
        <Route path="about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
