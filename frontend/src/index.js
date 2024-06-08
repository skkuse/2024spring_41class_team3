// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import MainPage from './pages/MainPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/app" element={<App />} />
      {/* 다른 경로를 추가할 수 있습니다. */}
    </Routes>
  </Router>
);

reportWebVitals();
