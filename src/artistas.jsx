import React from 'react';
import './artistas.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const ArtistasCalendario = () => {
  return (
    <div>
      <Navbar />
      <div className="calendar-container">
        <div>
          <div className="calendar-header">
            <span className="dot">•</span> Calendario de Artistas <span className="dot">•</span>
          </div>
          <div className="calendar-weekdays">
            <div>Lun</div>
            <div>Mar</div>
            <div>Mié</div>
            <div>Jue</div>
          </div>
          <div className="calendar-days">
            <div className="highlighted orange">
              1
              <p>Evento Arte</p>
            </div>
            <div>2</div>
            <div className="special-day">
              3
              <p>Especial</p>
            </div>
            <div className="highlighted pink">
              4
              <p>Taller</p>
            </div>
            {/* Agrega más días según sea necesario */}
          </div>
        </div>
        <div className="calendar-sidebar">
          <h2>Próximo Evento</h2>
          <p>Fecha: 10 de Octubre</p>
          <p>Lugar: Galería Principal</p>
          <button>Reservar Ahora</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArtistasCalendario;