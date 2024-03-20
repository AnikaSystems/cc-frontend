import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCase from "./components/AddCase";
import Case from "./components/Case";
import CasesList from "./components/CaseList";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/Cases" className="navbar-brand">
          Coding Challenge
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/Cases"} className="nav-link">
              Cases
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<CasesList/>} />
          <Route path="/Cases" element={<CasesList/>} />
          <Route path="/add" element={<AddCase/>} />
          <Route path="/Cases/:id" element={<Case/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
