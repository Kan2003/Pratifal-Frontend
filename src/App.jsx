import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ragister from "./components/Ragister.jsx";
import Login from "./components/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Home from "./components/Home.jsx";
import { useEffect, useState } from "react";
import Page from "./components/Page.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  
  return (
    <Router>
      <Routes>
        <Route path="/ragister" element={<Ragister />} />
        <Route path="/login" element={<Login  setIsAuthenticated={setIsAuthenticated}  />} />
        <Route path="/" element={<Page />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
