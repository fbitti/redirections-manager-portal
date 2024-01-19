import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RuleList from './components/RuleList';
import RuleForm from './components/RuleForm';
import TestRedirection from './components/TestRedirection';
import About from './components/About';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/redirections" element={<RuleList />} />
        <Route path="/create" element={<RuleForm />} />
        <Route path="/test" element={<TestRedirection />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
