import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './galeria.css';
import filterIcon from './img/filtrar.png';

const imgFotografia = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
const imgPintura = 'https://images.unsplash.com/photo-1513360371669-4f3dd7102086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
const imgDibujo = 'https://images.unsplash.com/photo-1605702208740-3b0404038c46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
const imgArtesania = 'https://images.unsplash.com/photo-1599422472403-851d7ea26b0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';

const categories = [
  {
    title: 'FOTOGRAFÍA',
    color: '#449EEE',
    path: '/galeria/fotografia',
    image: imgFotografia
  },
  {
    title: 'PINTURA',
    color: '#AB5CC9',
    path: '/galeria/pintura',
    image: imgPintura
  },
  {
    title: 'DIBUJO',
    color: '#DD43A8',
    path: '/galeria/dibujo',
    image: imgDibujo
  },
  {
    title: 'ARTESANÍA',
    color: '#FC5E33',
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
        <button className="filter-button" type="button" aria-expanded={isFilterOpen} aria-controls="filter-dropdown" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <img src={filterIcon} width="16" height="16" alt="Filtrar" />
          Filtros
        </button>

    {isFilterOpen && (
      <div className="filter-dropdown" id="filter-dropdown" role="menu">
        <button className="filter-dropdown-item" onClick={() => handleFilterClick('all')}>
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
