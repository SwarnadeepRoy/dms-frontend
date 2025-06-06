import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Pricing from './pages/Pricing.jsx';
import About from './pages/About.jsx';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16"> {/* pt-16 to account for fixed header */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/dashboard" 
              element={
                <>
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                  <SignedOut>
                    <Home />
                  </SignedOut>
                </>
              } 
            />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;