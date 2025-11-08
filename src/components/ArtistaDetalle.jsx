// src/components/ArtistaDetalle.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { listaArtistas } from '../datosArtistas'; // Importa los datos
import './ArtistaDetalle.css'; // Importa el nuevo CSS

// (Necesitamos la función getTagClass aquí también)
const getTagClass = (tag) => {
  const lowerTag = tag.toLowerCase();
  if (lowerTag.includes('fotograf')) return 'tag-fotografia';
  if (lowerTag.includes('pintura')) return 'tag-pintura';
  if (lowerTag.includes('dibujo')) return 'tag-dibujo';
  if (lowerTag.includes('artesan')) return 'tag-artesania';
  return 'tag-default';
};

export default function ArtistaDetalle() {
  // (El código de useParams y find artista se queda igual)
  // ...
  const { id } = useParams();
  const artista = listaArtistas.find(a => a.id.toString() === id);
  if (!artista) return <h2>Artista no encontrado</h2>;


  return (
    <div className="detalle-seccion">
      {/* El 'detalle-container' ahora envuelve TODO */}
      <div className="detalle-container">
        
        {/* --- COLUMNA IZQUIERDA (Esta se quedará fija) --- */}
        <div className="detalle-col-izquierda">
          <div className="detalle-imagen-wrapper">
            <img src={artista.imagen} alt={artista.nombre} className="detalle-imagen" />
          </div>
          <h1 className="detalle-nombre">{artista.nombre}</h1>
          <ul className="detalle-tags">
            {/* ... (el .map de los tags sigue igual) ... */}
            {artista.tags.map((tag) => (
              <li key={tag} className={`artista-tag ${getTagClass(tag)}`}>{tag}</li>
            ))}
          </ul>
        </div>

        {/* --- COLUMNA DERECHA (Esta se desplazará) --- */}
        <div className="detalle-col-derecha">
          <h2 className="detalle-titulo">{artista.titulo}</h2>
          <p className="detalle-descripcion">{artista.descripcion}</p>
          <p className="detalle-talleres">{artista.talleres}</p>
          
          <h3 className="detalle-subtitulo">SEMBLANZA</h3>
          {artista.semblanza.map((parrafo, index) => (
            <p key={index} className="detalle-semblanza">{parrafo}</p>
          ))}

          {/* --- ¡NUEVO! GALERÍA MOVIDA AQUÍ DENTRO --- */}
          <div className="detalle-galeria-grid">
            {artista.galeria.map((imgSrc, index) => (
              <div key={index} className="galeria-imagen-wrapper">
                <img src={imgSrc} alt={`${artista.nombre} - galería ${index + 1}`} />
              </div>
            ))}
          </div>
          {/* --- FIN DE LA GALERÍA --- */}
          
        </div>
      </div>

      {/* (La galería ya no está aquí abajo) */}
    </div>
  );
}