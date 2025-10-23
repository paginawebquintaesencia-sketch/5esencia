import React, { useState } from 'react';
import './AdminTaller.css';
import AdminNav from './AdminNav';

function InscripcionesModal({ taller, onClose, onCancelar }) {
  
  if (!taller) return null;

  return (
    <div className="taller-form-modal-overlay">
      <div className="inscripciones-modal-content">
        <h2>Inscritos en "{taller.title}"</h2><br />
        <h3>Total: {taller.inscritos.length} / {taller.max}</h3>

        <div className="inscripciones-lista">
          {}
          <div className="inscrito-item header">
            <div>Nombre</div>
            <div>Email</div>
            <div>Acción</div>
          </div>
          
          {}
          {taller.inscritos.length > 0 ? (
            taller.inscritos.map(user => (
              <div className="inscrito-item" key={user.id}>
                <div>{user.nombre}</div>
                <div>{user.email}</div>
                <div>
                  <button 
                    onClick={() => onCancelar(taller.id, user.id)} 
                    className="btn-cancelar-inscripcion"
                  >
                    Cancelar Inscripción
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-inscritos">No hay inscritos en este taller todavía.</p>
          )}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="btn-cancel">Cerrar</button>
        </div>
      </div>
    </div>
  );
}

function TallerForm({ taller, onClose, onSave }) {
  
  const [formData, setFormData] = useState({
    id: taller?.id || null,
    title: taller?.title || '',
    materiales: taller?.materiales || '', 
    instructor: taller?.instructor || '',
    date: taller?.date || '',
    startTime: taller?.time ? taller.time.split(' - ')[0] : '',
    endTime: taller?.time ? taller.time.split(' - ')[1] : '',
    description: taller?.description || 'Incluye detalles de materiales, guía paso a paso, snacks, etc.',
    max: taller?.max || 20,
    estado: taller?.estado || 'Pendiente',
    costo: taller?.costo || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const saveData = {
      ...formData,
      time: `${formData.startTime} - ${formData.endTime}`
    };
    onSave(saveData);
  };

  return (
    <div className="taller-form-modal-overlay">
      <form onSubmit={handleSubmit} className="taller-form">
        <h2>{taller ? 'Editar Taller' : 'Crear Nuevo Taller'}</h2>

        <div className="form-group">
          <label>Título del Taller</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        {}
        <div className="form-group">
          <label>Materiales (resumen para la tabla)</label>
          <input 
            type="text" 
            name="materiales" 
            value={formData.materiales} 
            onChange={handleChange} 
            placeholder="Ej. Pieza de cerámica, hilos, etc." 
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Estado del Taller</label>
            <select name="estado" value={formData.estado} onChange={handleChange}>
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmado">Confirmado</option>
            </select>
          </div>
          <div className="form-group">
            <label>Costo (MXN)</label>
            <input type="number" name="costo" value={formData.costo} onChange={handleChange} min="0" placeholder="Ej. 500" />
          </div>
        </div>

        <div className="form-group">
          <label>Instructor (ej. Rocío Campa)</label>
          <input type="text" name="instructor" value={formData.instructor} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fecha</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Capacidad Máxima</label>
            <input type="number" name="max" value={formData.max} onChange={handleChange} min="1" required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Hora de Inicio</label>
            <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Hora de Fin</label>
            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Descripción Completa (para vista pública)</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          <button type="submit" className="btn-save">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}

function AdminTaller() {
  
  const [talleres, setTalleres] = useState([
    { 
      id: 1, 
      title: "Pinta tu taza en cerámica", 
      materiales: "Pieza de cerámica",
      date: "2025-08-06", 
      time: "18:00 - 20:00", 
      instructor: "Rocío Campa", 
      description: "Pieza de cerámica, guía paso a paso...", 
      max: 20,
      estado: 'Confirmado', 
      costo: 550,
      inscritos: [
        { id: 101, nombre: 'Ana Gómez', email: 'ana@mail.com' },
        { id: 102, nombre: 'Luis Torres', email: 'ltorres@mail.com' },
        { id: 103, nombre: 'Carla Solis', email: 'csolis@mail.com' },
      ],
    },
    { 
      id: 2, 
      title: "Pinta tu regalo para papá", 
      materiales: "Un regalo especial para papá.",
      date: "2025-08-13", 
      time: "17:00 - 19:00", 
      instructor: "Ana Soto", 
      description: "Un regalo especial para papá.", 
      max: 15,
      estado: 'Confirmado',
      costo: 500,
      inscritos: [],
    },
    { 
      id: 3, 
      title: "Teje tu portavasos en crochet", 
      materiales: "Aprende crochet desde cero.",
      date: "2025-08-18", 
      time: "10:00 - 12:00", 
      instructor: "Laura Paz", 
      description: "Aprende crochet desde cero.", 
      max: 20,
      estado: 'Pendiente',
      costo: 400,
      inscritos: [
        { id: 104, nombre: 'Mario Bros', email: 'mario@mail.com' },
      ],
    },
    { 
      id: 4, 
      title: "Introducción al dibujo", 
      materiales: "Conceptos básicos de dibujo.",
      date: "2025-08-28", 
      time: "16:00 - 18:00", 
      instructor: "Carlos Ruiz", 
      description: "Conceptos básicos de dibujo.", 
      max: 25,
      estado: 'Pendiente',
      costo: 350,
      inscritos: [],
    },
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTaller, setSelectedTaller] = useState(null);
  const [viewingInscripciones, setViewingInscripciones] = useState(null);

  const handleAddNew = () => {
    setSelectedTaller(null);
    setIsFormVisible(true);
  };
  const handleEdit = (taller) => {
    setSelectedTaller(taller);
    setIsFormVisible(true);
  };
  const handleSaveTaller = (tallerData) => {
    if (tallerData.id) {
      setTalleres(talleres.map(t => t.id === tallerData.id ? { ...t, ...tallerData } : t));
    } else {
      const newTaller = { ...tallerData, id: Date.now(), inscritos: [] }; 
      setTalleres([newTaller, ...talleres]);
    }
    setIsFormVisible(false);
    setSelectedTaller(null);
  };
  const handleDelete = (tallerId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este taller?")) {
      setTalleres(talleres.filter(t => t.id !== tallerId));
    }
  };
  const handleViewRegistrations = (tallerId) => {
    setViewingInscripciones(tallerId);
  };
  const handleCancelarInscripcion = (tallerId, inscritoId) => {
    if (!window.confirm("¿Seguro que quieres cancelar esta inscripción?")) return;
    setTalleres(prevTalleres => 
      prevTalleres.map(taller => 
        taller.id === tallerId 
          ? { ...taller, inscritos: taller.inscritos.filter(i => i.id !== inscritoId) } 
          : taller
      )
    );
  };

  const tallerEnVista = talleres.find(t => t.id === viewingInscripciones);

  return (
    <div className="admin-calendario-container">
      
      {}
      <AdminNav />
      <button onClick={handleAddNew} className="btn-add-new">
        + Agregar Nuevo Taller
      </button>

      <h2>Talleres Programados</h2>
      <div className="tabla-talleres">
        {}
        <div className="tabla-header">
          <div>Taller</div>
          <div>Descripción</div>
          <div>Fecha y Hora</div>
          <div>Instructor</div>
          <div>Inscripciones</div>
          <div>Estado</div>
          <div>Costo</div>
        </div>
        
        {}
        <div className="tabla-body">
          {talleres.map(taller => {
            const inscritosCount = taller.inscritos.length; 
            return (
              <React.Fragment key={taller.id}>
                {}
                <div className="tabla-fila">
                  <div>{taller.title}</div>
                  <div>{taller.materiales}</div>
                  <div>{taller.date} <br/> {taller.time}</div>
                  <div>{taller.instructor}</div>
                  <div>{inscritosCount} / {taller.max}</div>
                  <div>
                    <span className={`estado-badge ${taller.estado.toLowerCase()}`}>
                      {taller.estado}
                    </span>
                  </div>
                  <div>${taller.costo.toLocaleString('es-MX')}</div>
                </div>
                {}
                <div className="tabla-fila-acciones">
                  <button onClick={() => handleEdit(taller)} className="btn-accion btn-accion-edit">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(taller.id)} className="btn-accion btn-accion-delete">
                    Eliminar
                  </button>
                  <button onClick={() => handleViewRegistrations(taller.id)} className="btn-accion btn-accion-view">
                    Inscritos ({inscritosCount})
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {isFormVisible && (
        <TallerForm 
          taller={selectedTaller}
          onClose={() => setIsFormVisible(false)}
          onSave={handleSaveTaller}
        />
      )}

      {viewingInscripciones && (
        <InscripcionesModal
          taller={tallerEnVista}
          onClose={() => setViewingInscripciones(null)}
          onCancelar={handleCancelarInscripcion}
        />
      )}
    </div>
  );
}

export default AdminTaller;