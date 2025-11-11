import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './galeria.css';

import imgFotografia from './img/log.jpg';
import imgPintura from './img/log.jpg';
import imgDibujo from './img/log.jpg';
import imgArtesania from './img/log.jpg';

const categories = [
  {
  title: 'FOTOGRAFÍA',
  color: '#3b82f6', 
  path: '/galeria/fotografia',
  image: imgFotografia
  },
  {
  title: 'PINTURA',
  color: '#a855f7',
  path: '/galeria/pintura',
  image: imgPintura
  },
  {
  title: 'DIBUJO',
  color: '#E91E63',
  path: '/galeria/dibujo',
  image: imgDibujo
  },
  {
  title: 'ARTESANÍA',
  color: '#f97316',
  path: '/galeria/artesania',
  image: imgArtesania
  }
];

function Galeria() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCategories = categories.filter(category => {
    if (activeCategory === 'all') {
      return true;
    }
    return category.title === activeCategory;
  });

  const handleFilterClick = (categoryTitle) => {
    setActiveCategory(categoryTitle);
    setIsFilterOpen(false);
  };

  return (
  <div className="galeria-container"> 
    <header className="galeria-header">
      <h1 className="galeria-title">Galería de Arte</h1>
        <p className="galeria-subtitle">
           Explora nuestra colección de obras de arte de artistas quintaesencia.
        </p>
        <button className="filter-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <img src="src/img/filtrar.png" width="16" height="16" />
            Filtros
        </button>

        {isFilterOpen && (
          <div className="filter-dropdown">
            <button 
              className="filter-dropdown-item" 
              onClick={() => handleFilterClick('all')}
            >
              Todas las categorías
            </button>
            
            {categories.map((category) => (
              <button
                key={category.title}
                className="filter-dropdown-item"
                onClick={() => handleFilterClick(category.title)}
              >
                {category.title}
              </button>
            ))}
          </div>
        )}
    </header>

      <section className="category-grid">
      {filteredCategories.map((category) => (
      <div className="category-card-wrapper" key={category.title}>
        <div className="category-dot" style={{ backgroundColor: category.color }}></div>
          <Link to={category.path} className="category-card">
            <div className="card-background" style={{ backgroundImage: `url(${category.image})` }}></div>
            <div className="card-overlay"></div>
            <h2 className="card-title">{category.title}</h2>
          </Link>
        </div>
      ))}
      </section>
    </div>
  );
}

export default Galeria;