import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './obraDetalle.css';
import { datosObras } from './datosGaleria';

function ObraDetalle() {
  const { categoria, obraId } = useParams();

  const obra = datosObras[obraId] || {
    titulo: 'Obra no encontrada',
    autor: 'N/A',
    anio: 'N/A',
    descripcion: 'La obra que buscas no existe.',
    imagen: ''
  };

  const categoriaFormateada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
  const categoryColors = {
    fotografia: '#3b82f6',
    pintura: '#a855f7',
    dibujo: '#E91E63',
    artesania: '#f97316'
  };

  return (
    <div className="obra-detalle-container">
      <Link to={`/galeria/${categoria}`} className="volver-link">
        &larr; Volver a {categoriaFormateada}
      </Link>

      <div className="obra-layout">
        <div className="obra-imagen-wrapper">
          <img 
            src={obra.imagen || 'https://via.placeholder.com/800x600.png?text=Obra+no+encontrada'} 
            alt={obra.titulo} 
          />
          <div className="obra-category-tag">
            <span 
              className="category-dot" 
              style={{ backgroundColor: categoryColors[categoria] || '#ccc' }}
            ></span>
            <span>{categoriaFormateada}</span>
          </div>
        </div>

        <div className="obra-info-wrapper">
          
          <h1 className="obra-titulo">"{obra.titulo}"</h1>
          
          <div className="obra-info-item">
            <strong>AUTOR:</strong>
            <span className="autor-valor">{obra.autor}</span>
          </div>
          
          <div className="obra-info-item">
            <strong>AÑO:</strong>
            {obra.anio}
          </div>

          <div className="obra-info-item obra-descripcion">
            <strong>DESCRIPCIÓN:</strong>
            {obra.descripcion}
          </div>
          
          <button className="obra-comprar-btn">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ObraDetalle;