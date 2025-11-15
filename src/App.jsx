import React from 'react';
import './App.css';
import logo from './img/logo.png';
import { Analytics } from "@vercel/analytics/react"
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CalendarioPublico from './components/CalendarioPublico';
import Galeria from './galeria.jsx';
import ArtistasCalendario from './artistas.jsx';
import { Routes, Route, Navigate, useLocation, useNavigate, useLocation as useLocationHook } from 'react-router-dom';
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
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import ArtistaDetalle from './components/ArtistaDetalle.jsx';
import GaleriaCategoria from './GaleriaCategoria';
import ObraDetalle from './ObraDetalle';
// Supabase eliminado: se retiró el cliente y autenticación
// import supabase from './utils/supabase';

function ProtectedRoute({ children }) {
  // Supabase eliminado: por ahora las rutas protegidas permiten acceso directo
  // Si deseas volver a exigir autenticación, podemos añadir un guard simple.
  return children;
}

function LoginRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/admin/talleres';
  const message = location.state?.message; // Get message from state
  return (
    <Login
      onLoginSuccess={() => navigate(from, { replace: true })}
      onSwitchToSignup={() => navigate('/signup')}
      message={message} // Pass message to Login component
    />
  );
}

function SignupRoute() {
  const navigate = useNavigate();
  return (
    <Signup
      onSwitchToLogin={() => navigate('/login')}
      onSignupSuccess={(hasSession) => navigate(hasSession ? '/admin/talleres' : '/login', { replace: true })}
    />
  );
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div className="app-root">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<HeroApp />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/signup" element={<SignupRoute />} />
        <Route path="/calendario" element={<CalendarioPublico />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/galeria/:categoria" element={<GaleriaCategoria />} />
        <Route path="/galeria/:categoria/:obraId" element={<ObraDetalle />} />
        <Route path="/artistas" element={<ArtistasCalendario />} />
        <Route path="/artistas/:id" element={<ArtistaDetalle />} />
        <Route path="/admin/calendary" element={<ProtectedRoute><Calendary /></ProtectedRoute>} />
        <Route path="/admin/talleres" element={<ProtectedRoute><AdminTaller /></ProtectedRoute>} />
        <Route path="/admin/talleres-activos" element={<ProtectedRoute><TalleresActivos /></ProtectedRoute>} />
        <Route path="/admin/programacion" element={<ProtectedRoute><ProgramacionTalleres /></ProtectedRoute>} />
        <Route path="/admin/usuarios-activos" element={<ProtectedRoute><UsuariosActivos /></ProtectedRoute>} />
        <Route path="/admin/base-datos" element={<ProtectedRoute><BaseDatos /></ProtectedRoute>} />
        <Route path="/admin/estadisticas" element={<ProtectedRoute><Estadisticas /></ProtectedRoute>} />
        <Route path="/admin/contenido" element={<ProtectedRoute><AdminContenido /></ProtectedRoute>} />
        <Route path="/inscripciones/:tallerId" element={<InscripcionForm />} />
        <Route path="/admin" element={<Navigate to="/admin/talleres" replace />} />
      </Routes>
      {!isAdminRoute && <Footer />}
      <Analytics />
    </div>
  );
}
