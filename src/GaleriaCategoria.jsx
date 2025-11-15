import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './galeriaCategoria.css';
import { datosObras } from './datosGaleria';

function GaleriaCategoria() {
 const { categoria } = useParams();
 const obrasFiltradas = Object.values(datosObras).filter(
  obra => obra.categoria === categoria
 );

 const tituloCategoria = categoria.charAt(0).toUpperCase() + categoria.slice(1);

 return (
  <div className="galeria-categoria-container">
   <h1 className="categoria-titulo">{tituloCategoria}</h1>
   
   <Link to="/galeria" className="volver-link-hub">
    &larr; Volver a todas las categorías
   </Link>

   <div className="obra-grid">
    {obrasFiltradas.length > 0 ? (
     obrasFiltradas.map(obra => (
      <div key={obra.id} className="obra-card">
       <Link to={`/galeria/${categoria}/${obra.id}`}>
        <img src={obra.imagen} alt={obra.titulo} className="obra-card-img" />
       </Link>
       
       <div className="obra-card-info">
        {obra.autor && <p className="obra-card-autor">{obra.autor}</p>}
        <h3 className="obra-card-title">{obra.titulo}</h3>
       </div>
      </div>
     ))
    ) : (
     <p>No hay obras en esta categoría.</p>
    )}
   </div>
  </div>
 );
}

export default GaleriaCategoria;