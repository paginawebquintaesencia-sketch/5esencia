import React, { useState, useEffect } from 'react';
import './AdminTaller.css';
import AdminNav from './AdminNav';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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
  const [selectedDate, setSelectedDate] = useState(
    taller?.date ? new Date(taller.date + 'T00:00:00') : undefined
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
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

        <div className="form-group">
          <label>Fecha</label>
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="date-picker-trigger"
            >
              <span>{selectedDate ? format(selectedDate, 'PPP', { locale: es }) : 'Selecciona una fecha'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
            </button>
            {isCalendarOpen && (
              <div className="calendar-popover">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    if (date) {
                      setFormData(prev => ({ ...prev, date: format(date, 'yyyy-MM-dd') }));
                    }
                    setIsCalendarOpen(false);
                  }}
                  initialFocus
                  locale={es}
                />
              </div>
            )}
          </div>
        </div>

        <div className="form-row">
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
  const [talleres, setTalleres] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTaller, setSelectedTaller] = useState(null);
  const [viewingInscripciones, setViewingInscripciones] = useState(null);

  useEffect(() => {
    const getTalleres = async () => {
      const data = await getDocs(collection(db, "talleres"));
      setTalleres(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTalleres();
  }, []);

  const handleAddNew = () => {
    setSelectedTaller(null);
    setIsFormVisible(true);
  };
  const handleEdit = (taller) => {
    setSelectedTaller(taller);
    setIsFormVisible(true);
  };
  const handleSaveTaller = async (tallerData) => {
    if (tallerData.id) {
      const tallerDoc = doc(db, "talleres", tallerData.id);
      await updateDoc(tallerDoc, tallerData);
      setTalleres(talleres.map(t => t.id === tallerData.id ? { ...t, ...tallerData } : t));
    } else {
      await addDoc(collection(db, "talleres"), { ...tallerData, inscritos: [] });
      const data = await getDocs(collection(db, "talleres"));
      setTalleres(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    setIsFormVisible(false);
    setSelectedTaller(null);
  };
  const handleDelete = async (tallerId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este taller?")) {
      const tallerDoc = doc(db, "talleres", tallerId);
      await deleteDoc(tallerDoc);
      setTalleres(talleres.filter(t => t.id !== tallerId));
    }
  };
  const handleViewRegistrations = (tallerId) => {
    setViewingInscripciones(tallerId);
  };
  const handleCancelarInscripcion = async (tallerId, inscritoId) => {
    if (!window.confirm("¿Seguro que quieres cancelar esta inscripción?")) return;
    const tallerRef = doc(db, "talleres", tallerId);
    const tallerSnap = await getDoc(tallerRef);
    if (tallerSnap.exists()) {
      const currentInscritos = tallerSnap.data().inscritos;
      const updatedInscritos = currentInscritos.filter(i => i.id !== inscritoId);
      await updateDoc(tallerRef, { inscritos: updatedInscritos });
      setTalleres(prevTalleres => 
        prevTalleres.map(taller => 
          taller.id === tallerId 
            ? { ...taller, inscritos: updatedInscritos } 
            : taller
        )
      );
    }
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