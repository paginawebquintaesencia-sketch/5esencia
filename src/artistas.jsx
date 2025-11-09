// src/artistas.jsx

import React from 'react';
import ArtistaCard from './components/ArtistaCard.jsx'; 
import './artistas.css'; 
import { listaArtistas } from './datosArtistas.js'; 


export default function ArtistasCalendario() {
  return (
    <section className="artistas-seccion">
      <div className="artistas-grid-container">
        {listaArtistas.map((artista) => (
          <ArtistaCard 
            key={artista.id}
            artista={artista}
          />
        ))}
      </div>
    </section>
  );
}