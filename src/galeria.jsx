
import React, { useState } from 'react';
import './galeria.css';

const categorias = [
  'Todos',
  'Cerámica',
  'Fotografía',
  'Arte',
  'Abstracto',
];

const imagenes = [
  { src: '/img/beach.jpg', alt: 'Playa', categoria: 'Fotografía' },
  { src: '/img/eiffel.jpg', alt: 'Torre Eiffel con lluvia', categoria: 'Fotografía' },
  { src: '/img/wave.jpg', alt: 'Ola pintada', categoria: 'Abstracto' },
  { src: '/img/sculpture.jpg', alt: 'Escultura de madera', categoria: 'Cerámica' },
  { src: '/img/art1.jpg', alt: 'Arte 1', categoria: 'Arte' },
  { src: '/img/art2.jpg', alt: 'Arte 2', categoria: 'Arte' },
  { src: '/img/art3.jpg', alt: 'Arte 3', categoria: 'Abstracto' },
  { src: '/img/art4.jpg', alt: 'Arte 4', categoria: 'Cerámica' },
];

function Galeria() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [mostrarTooltip, setMostrarTooltip] = useState(false);

  const imagenesFiltradas = categoriaSeleccionada === 'Todos'
    ? imagenes
    : imagenes.filter((img) => img.categoria === categoriaSeleccionada);

  return (
    <div className="galeria-container">
      <h1 className="galeria-title">Galería de Arte</h1>
      <p className="galeria-subtitle">Explora el arte de artistas guatemaltecos</p>
      <div className="galeria-filters">
        {categorias.map((cat) => (
          <div
            key={cat}
            className={`filter-dot${categoriaSeleccionada === cat ? ' active' : ''}`}
            title={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            style={{ cursor: 'pointer' }}
          ></div>
        ))}
        <div style={{ position: 'relative' }}>
          <button
            className="filter-button"
            onMouseEnter={() => setMostrarTooltip(true)}
            onMouseLeave={() => setMostrarTooltip(false)}
          >
            Filtros
          </button>
          {mostrarTooltip && (
            <div className="filtro-tooltip">
              {categorias.slice(1).map((cat) => (
                <div key={cat}>{cat}</div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="galeria-grid">
        {imagenesFiltradas.map((img) => (
          <img key={img.src} src={img.src} alt={img.alt} />
        ))}
      </div>
    </div>
  );
}

export default Galeria;