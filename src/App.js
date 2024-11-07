import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useDispatch} from "react-redux";
import Login from "./components/LoginPage/LoginPage";
import { ProtectedQuoteGeneration } from "./components";
import { ProtectedQuotesList } from "./components";
import "./App.css";


import { setToken } from "./redux/auth/authSlice";

function App() {
  const dispatch = useDispatch();

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
