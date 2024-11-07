import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/LoginPage/LoginPage";
import { ProtectedQuoteGeneration } from "./components";
import { ProtectedQuotesList } from "./components";
import WelcomePage from "./components/WelcomePage/WelcomePage"
import "./App.css";


import { setToken } from "./redux/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
      const token = sessionStorage.getItem('authToken');
      if (token) {
          dispatch(setToken(token));
      }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProtectedQuotesList/>} />
          <Route path="/upload" element={<ProtectedQuoteGeneration />} /> 
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
