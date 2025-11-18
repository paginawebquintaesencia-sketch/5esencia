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
            <Link to="/signup" className="btn btn-primary" style={{ transition: 'none' }}>
              Unirse a la comunidad
            </Link>
            <Link to="/calendario" className="btn btn-outline" style={{ transition: 'none' }}>
              Calendario de actividades
            </Link>
          </div>
        </section>
        <aside className="hero-art" aria-hidden>
          <div className="hero-img-container">
            <img
              className="hero-img"
              src={footerImg}
              alt="Ciudad playa"
              width="1200"
              height="800"
              loading="eager"
            />
          </div>
        </aside>
      </div>
    </main>
  );
}
