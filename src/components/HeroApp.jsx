import './HeroApp.css';
import { Link } from 'react-router-dom';
import footerImg from '../img/footer.png';

export default function HeroApp() {
  return (
    <main className="hero">
      <div className="hero-content-wrapper">
        <section className="hero-content">
          <h1 className="eyebrow">Centro Artístico</h1>
          <h2 className="title">Experiencias creativas</h2>
          <p className="lead text-orange-500">
            Un espacio <strong style={{color: '#f97316'}}>creado para el arte, la creatividad y la conexión auténtica</strong>. Celebramos la expresión artística en todas sus formas. Ofrecemos <strong style={{color: '#ef44d4'}}>talleres presenciales, clases personalizadas, experiencias creativas para eventos privados y una galería virtual</strong> que da visibilidad a artistas emergentes. Nuestro objetivo es <strong style={{color: '#a855f7'}}>impulsar el talento</strong>, fomentar la colaboración y brindar un espacio donde cada persona pueda <strong style={{color: '#3b82f6'}}>conectar con su esencia a través del arte</strong>.
          </p>
          <div className="cta-row">
            <Link to="/comunidad" className="btn btn-primary">
              <span className="icon-person">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Unirse a la comunidad
            </Link>
            <Link to="/calendario" className="btn btn-outline">
              <span className="icon-calendar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </span>
              Calendario de actividades
            </Link>
          </div>
        </section>
        <aside className="hero-art" aria-hidden>
          <div className="hero-img-container">
            <img className="hero-img" src={footerImg} alt="Ciudad playa" />
          </div>
        </aside>
      </div>
    </main>
  );
}