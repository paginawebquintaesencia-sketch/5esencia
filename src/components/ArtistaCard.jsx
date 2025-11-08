// src/components/ArtistaCard.jsx

import React from 'react';
// 1. (PASO 5) Importamos 'Link' de React Router
import { Link } from 'react-router-dom';

// (Tu función getTagClass se queda exactamente igual)
const getTagClass = (tag) => {
  const lowerTag = tag.toLowerCase(); // Normalizamos a minúsculas
  
  if (lowerTag.includes('fotograf')) {
    return 'tag-fotografia';
  }
  if (lowerTag.includes('pintura')) {
    return 'tag-pintura';
  }
  if (lowerTag.includes('dibujo')) {
    return 'tag-dibujo';
  }
  if (lowerTag.includes('artesan')) { 
    return 'tag-artesania';
  }
  return 'tag-default'; 
};

export default function ArtistaCard({ artista }) {
  
  const { id, imagen, nombre, tags } = artista;

  return (
    <div className="artista-card">
      <div className="artista-imagen-wrapper">
        <img src={imagen} alt={`Foto de ${nombre}`} className="artista-imagen" />
      </div>
      <h3 className="artista-nombre">{nombre}</h3>
      <ul className="artista-tags">
        {tags.map((tag) => (
          <li 
            key={tag} 
            className={`artista-tag ${getTagClass(tag)}`}
          >
            {tag}
          </li>
        ))}
      </ul>
      
      <Link 
        to={`/artistas/${id}`} 
        className="artista-leer-mas"
      >
        LEER MÁS
      </Link>
    </div>
  );
}