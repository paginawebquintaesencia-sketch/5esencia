import './App.css';
import logo from './img/logo.png';
import { Analytics } from "@vercel/analytics/react"
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CalendarioPublico from './components/CalendarioPublico';
import Galeria from './galeria.jsx';
import ArtistasCalendario from './artistas.jsx';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import footerImg from './img/footer.png';
import AdminTaller from './components/AdminTaller.jsx';
import InscripcionForm from './components/InscripcionForm';
import AdminContenido from './components/admin/AdminContenido';
import Calendary from './components/admin/Calendary.jsx';
import TalleresActivos from './components/admin/TalleresActivos.jsx';
import ProgramacionTalleres from './components/admin/ProgramacionTalleres.jsx';
import UsuariosActivos from './components/admin/UsuariosActivos.jsx';
import BaseDatos from './components/admin/BaseDatos.jsx';
import Estadisticas from './components/admin/Estadisticas.jsx';
import HeroApp from './components/HeroApp.jsx';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <div className="app-root">
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<HeroApp />} />
        <Route path="/calendario" element={<CalendarioPublico />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/artistas" element={<ArtistasCalendario />} />
        <Route path="/admin/calendary" element={<Calendary />} />
        <Route path="/admin/talleres" element={<AdminTaller />} />
        <Route path="/admin/talleres-activos" element={<TalleresActivos />} />
        <Route path="/admin/programacion" element={<ProgramacionTalleres />} />
        <Route path="/admin/usuarios-activos" element={<UsuariosActivos />} />
        <Route path="/admin/base-datos" element={<BaseDatos />} />
        <Route path="/admin/estadisticas" element={<Estadisticas />} />
        <Route path="/admin/contenido" element={<AdminContenido />} />
        <Route path="/inscripciones/:tallerId" element={<InscripcionForm />} />
        <Route path="/admin" element={<Navigate to="/admin/talleres" replace />} />
      </Routes>
      {!isAdmin && <Footer />}
      <Analytics />
    </div>
  );
}
