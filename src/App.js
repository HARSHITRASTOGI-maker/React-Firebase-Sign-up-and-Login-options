import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PhoneSignUp from "./components/PhoneSignUp";
import PhoneLogin from "./components/PhoneLogin";


import { auth } from "./firebase";

import "./App.css";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path ="/PhoneSignUp" element ={<PhoneSignUp/>}/>
          <Route path ="/PhoneLogin" element ={<PhoneLogin/>}/>
          <Route path="/Home" element={<Home name={userName} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;