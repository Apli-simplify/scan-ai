import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import CharacterRecognizer from './components/CharacterRecognizer/CharacterRecognizer';
import TextExtractor from './components/TextExtractor/TextExtractor';
import Navbar from './components/Navbar/Navbar'; // Import the Navbar

function App() {
  return (
    <Router>
      <div className="App">
        <div className={styles.header}>
          <Navbar />
        </div>
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<CharacterRecognizer />} />
            <Route path="/text-extractor" element={<TextExtractor />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;