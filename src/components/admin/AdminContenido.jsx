import React, { useState } from 'react';
import AdminNav from './AdminNav';
import './AdminContenido.css';
import './AdminNav.css';

function AdminContenido() {
  
  const [mision, setMision] = useState(
    "Somos un centro dedicado a la exploración del arte y la creatividad. Nuestro propósito es fomentar la conexión auténtica con uno mismo y con la comunidad a través de experiencias artísticas significativas."
  );
  
  const [imagen, setImagen] = useState(null);
  const [subiendo, setSubiendo] = useState(false);

  const handleTextChange = (e) => {
    setMision(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setImagen(fileUrl);
    }
  };

  const handleSave = () => {
    setSubiendo(true);
    setTimeout(() => {
      setSubiendo(false);
      alert('¡Contenido guardado!');
      console.log("Texto guardado:", mision);
      console.log("Imagen guardada:", imagen);
    }, 1500);
  };

  return (
    <div className="admin-layout">
      <AdminNav />
      <main className="admin-content">
        <h1>Gestión de Contenido</h1>
        
        <div className="admin-contenido-card">
        {}
        <h2>Misión y Propósito</h2>
        <p>Redacta el texto que describe el propósito del centro (arte, creatividad, conexión).</p>
        <textarea 
          className="mision-textarea"
          rows="6"
          value={mision}
          onChange={handleTextChange}
        />
        </div>

        <div className="admin-contenido-card">
        {}
        <h2>Imagen Representativa</h2>
        <p>Diseña y sube una imagen que refleje la misión.</p>
        
        <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange}
        id="file-upload"
        className="file-input-hidden"
        />
        <label htmlFor="file-upload" className="file-upload-label">
          Seleccionar imagen...
        </label>
        {}
        {imagen && (
          <div className="imagen-preview-container">
            <p><strong>Vista previa:</strong></p>
            <img 
              src={imagen} 
              alt="Vista previa" 
              className="imagen-preview" 
            />
          </div>
        )}
        </div>

        <button 
          className="btn-guardar-contenido" 
          onClick={handleSave}
          disabled={subiendo}
        >
          {subiendo ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </main>
    </div>
  );
}

export default AdminContenido;
