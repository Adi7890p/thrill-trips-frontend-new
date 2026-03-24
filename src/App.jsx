import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Lenis from 'lenis';
import AdminPanel from './pages/AdminPanel';
import Register from './pages/Register';
import User from './pages/User';
import Booking from './pages/Booking';
import ScrollToTop from './components/ScrollToTop';
import About from './pages/About';
import OwnerLogin from './pages/OwnerLogin';
import OwnerDash from './pages/OwnerDash';
import PaymentGateway from './components/PaymentGateway';

const App = () => {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      // prevent: (node) => node.classList?.contains("parallax")
    });

    try {
      window.lenis = lenis;
    } catch (e) {
    }

    let rafId;
    // Animation loop
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/register' element={<Register />} />
        <Route path='/user' element={<User />} />
        <Route path='/booking/' element={<Booking />} />
        <Route path='/about/' element={<About />} />
        <Route path="/owner-login" element={<OwnerLogin />} />
        <Route path="/owner-dashboard" element={<OwnerDash />} />
        <Route path="/payment" element={<PaymentGateway />} />
      </Routes>
    </div>
  )
}

export default App
