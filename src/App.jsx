import './App.css';
import logo from './img/logo.png';
import { Analytics } from "@vercel/analytics/react"
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CalendarioPublico from './components/CalendarioPublico';
import Galeria from './galeria.jsx';
import ArtistasCalendario from './artistas.jsx';
import ArtistaDetalle from './components/ArtistaDetalle.jsx';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import footerImg from './img/footer.png';
import AdminTaller from './components/AdminTaller';
import InscripcionForm from './components/InscripcionForm';
import AdminContenido from './components/AdminContenido';
import HeroApp from './components/HeroApp.jsx';

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroApp />} />
        <Route path="/calendario" element={<CalendarioPublico />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/artistas" element={<ArtistasCalendario />} />
        <Route path="/artistas/:id" element={<ArtistaDetalle />} />    
        <Route path="/admin/talleres" element={<AdminTaller />} />
        <Route path="/admin/contenido" element={<AdminContenido />} />
        <Route path="/inscripciones/:tallerId" element={<InscripcionForm />} />
        <Route path="/admin" element={<Navigate to="/admin/talleres" replace />} />
      </Routes>
      <Footer />
      <Analytics />
    </div>
  );
}