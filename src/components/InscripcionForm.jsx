import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './InscripcionForm.css';

const sampleTalleres = [
  { id: 1, title: "Pinta tu taza en cerámica" },
  { id: 2, title: "Pinta tu regalo para papá" },
  { id: 3, title: "Teje tu portavasos en crochet" },
  { id: 4, title: "Introducción al dibujo" },
  { id: 5, title: "Acuarela Navideña" },
];

function InscripcionForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const { tallerId } = useParams();

  const taller = sampleTalleres.find(t => t.id === parseInt(tallerId));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Inscribiendo a: ${email} en el taller: "${taller.title}" (ID: ${tallerId})`);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="inscripcion-container">
        <div className="inscripcion-form-card">
          <h2>¡Listo! Tu lugar está reservado</h2>
          <p>Te has inscrito correctamente al taller de <strong>"{taller?.title}"</strong> con el correo <strong>{email}</strong>.</p>
          <p>Recibirás un correo de confirmación con los detalles de pago pronto. ¡Gracias!</p>
          <Link to="/calendario" className="btn-volver">
            &larr; Volver al Calendario
          </Link>
        </div>
      </div>
    );
  }

  if (!taller) {
     return (
      <div className="inscripcion-container">
        <div className="inscripcion-form-card">
          <h2>Taller no encontrado</h2>
          <p>No pudimos encontrar el taller al que intentas inscribirte.</p>
          <Link to="/calendario" className="btn-volver">
            &larr; Volver al Calendario
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="inscripcion-container">
      <form className="inscripcion-form-card" onSubmit={handleSubmit}>
        <Link to="/calendario" className="btn-volver">
          &larr; Volver al Calendario
        </Link>
        
        <h2>Inscríbete</h2>
        <p>Estás a un paso de unirte al taller:</p>
        {}
        <h3 className="taller-titulo">{taller.title.toUpperCase()}</h3>
        
        <div className="form-group">
          <label htmlFor="text">Nombre</label>
          <input
            type="text"
            id="text"
            name="nombre"
            placeholder='Ingresa tu nombre'
            required
          />
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu.correo@ejemplo.com"
            required
          />
        </div>
        
        <button type="submit" className="btn-submit-inscripcion">
          Confirmar Inscripción
        </button>
      </form>
    </div>
  );
}

export default InscripcionForm;