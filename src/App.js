import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header/Header";
import Login from "./components/LoginPage/LoginPage";
import Footer from "./components/Footer/Footer";
import { ProtectedQuoteGeneration } from "./components";
import { ProtectedQuotesList } from "./components";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <nav style={{ padding: "10px" }}>
          <Link to="/">Home</Link> | <Link to="/upload">Image Upload</Link> | <Link to="/list">List</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/upload" element={<ProtectedQuoteGeneration />} />
          <Route path="/list" element={<ProtectedQuotesList/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
