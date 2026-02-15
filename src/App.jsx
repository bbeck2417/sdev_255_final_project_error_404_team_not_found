import React, { useState } from "react";
import "./style.css";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";


function App() {
  const [courses, setCourses] = useState([]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/courses" 
          element={<Courses courses={courses} setCourses={setCourses} />} 
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;