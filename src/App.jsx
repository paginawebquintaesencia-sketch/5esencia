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
import supabase from './utils/supabase';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const [user, setUser] = React.useState(undefined);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!isMounted) return;

      const currentUser = sessionData?.session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentUser.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          setIsAdmin(false);
          // Optionally, redirect to login or show an error
          navigate('/login', { replace: true, state: { from: location.pathname, message: 'Error al obtener el perfil de usuario.' } });
          return;
        }

        if (profile && profile.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          // Redirect non-admin users from admin routes
          if (location.pathname.startsWith('/admin')) {
            navigate('/login', { replace: true, state: { from: location.pathname, message: 'No tienes permisos de administrador.' } });
          }
        }
      } else {
        setIsAdmin(false);
      }
    })();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        supabase
          .from('profiles')
          .select('role')
          .eq('id', currentUser.id)
          .single()
          .then(({ data: profile, error }) => {
            if (error) {
              console.error('Error fetching user profile on auth state change:', error);
              setIsAdmin(false);
              navigate('/login', { replace: true, state: { from: location.pathname, message: 'Error al obtener el perfil de usuario.' } });
              return;
            }
            if (profile && profile.role === 'admin') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
              if (location.pathname.startsWith('/admin')) {
                navigate('/login', { replace: true, state: { from: location.pathname, message: 'No tienes permisos de administrador.' } });
              }
            }
          });
      } else {
        setIsAdmin(false);
      }
    });
    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [location.pathname, navigate]);

  if (user === undefined) return null; // Still checking auth state
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />; // Not logged in

  // If user is logged in, but not an admin, and trying to access an admin route
  if (user && !isAdmin && location.pathname.startsWith('/admin')) {
    return <Navigate to="/login" replace state={{ from: location.pathname, message: 'No tienes permisos de administrador.' }} />;
  }

  // If user is logged in and is admin, or logged in and not admin but not on an admin route
  if (user && isAdmin) return children;
  if (user && !isAdmin && !location.pathname.startsWith('/admin')) return children;

  return null; // Should not reach here
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
        <Route path="/artistas" element={<ArtistasCalendario />} />
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