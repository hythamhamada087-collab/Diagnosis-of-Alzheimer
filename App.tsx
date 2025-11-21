import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Diagnosis } from './pages/Diagnosis';
import { DatasetView } from './pages/DatasetView';
import { Documentation } from './pages/Documentation';
import { About } from './components/About';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Diagnosis />} />
            <Route path="/dataset" element={<DatasetView />} />
            <Route path="/methods" element={<Documentation />} />
            <Route path="/research" element={<Documentation />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;