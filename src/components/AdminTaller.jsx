import React, { useState, useEffect } from 'react';
import './AdminTaller.css';
import './admin/AdminNav.css';
import AdminNav from './admin/AdminNav';
import supabase from '../utils/supabase';
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
    tipo: taller?.tipo || 'Ceramica',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que se haya seleccionado una fecha
    if (!formData.date) {
      alert('Selecciona una fecha para el taller.');
      return;
    }
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

        <div className="form-row">
          <div className="form-group">
            <label>Tipo de Arte</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange} required>
              <option value="Ceramica">Cerámica</option>
              <option value="Fotografia">Fotografía</option>
              <option value="Arte">Arte</option>
              <option value="Abstracto">Abstracto</option>
            </select>
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
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const getTalleres = async () => {
      setLoading(true);
      setLoadError(null);
      const { data, error } = await supabase
        .from('talleres')
        .select('*')
        .order('date', { ascending: true });
      if (error) {
        console.error('Error cargando talleres:', error);
        setLoadError('Error cargando talleres. Verifica tu tabla "talleres" en Supabase.');
      } else {
        setTalleres((data || []).map(row => ({ ...row, inscritos: row.inscritos || [] })));
      }
      setLoading(false);
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
    try {
      // Normalizar tipos y payload (sólo columnas reales de la tabla)
      const normalized = {
        id: tallerData?.id || null,
        title: String(tallerData.title || '').trim(),
        materiales: String(tallerData.materiales || '').trim(),
        instructor: String(tallerData.instructor || '').trim(),
        description: String(tallerData.description || '').trim(),
        estado: String(tallerData.estado || 'Pendiente').trim(),
        max: Number(tallerData.max || 0),
        costo: Number(tallerData.costo || 0),
        date: String(tallerData.date || ''), // formato YYYY-MM-DD
        time: String(tallerData.time || ''), // "HH:mm - HH:mm"
        tipo: String(tallerData.tipo || 'Ceramica').trim(),
      };

      if (normalized.id) {
        const { error } = await supabase
          .from('talleres')
          .update({
            title: normalized.title,
            materiales: normalized.materiales,
            instructor: normalized.instructor,
            description: normalized.description,
            estado: normalized.estado,
            max: normalized.max,
            costo: normalized.costo,
            date: normalized.date,
            time: normalized.time,
            tipo: normalized.tipo,
          })
          .eq('id', normalized.id);
        if (error) throw error;
        // Actualizar estado local sin refetch
        setTalleres(talleres.map(t => 
          t.id === normalized.id 
            ? { 
                ...t, 
                title: normalized.title,
                materiales: normalized.materiales,
                instructor: normalized.instructor,
                description: normalized.description,
                estado: normalized.estado,
                max: normalized.max,
                costo: normalized.costo,
                date: normalized.date,
                time: normalized.time,
                tipo: normalized.tipo,
              }
            : t
        ));
      } else {
        const { error } = await supabase
          .from('talleres')
          .insert([{ 
            title: normalized.title,
            materiales: normalized.materiales,
            instructor: normalized.instructor,
            description: normalized.description,
            estado: normalized.estado,
            max: normalized.max,
            costo: normalized.costo,
            date: normalized.date,
            time: normalized.time,
            tipo: normalized.tipo,
            inscritos: [],
          }]);
        if (error) throw error;
        // Refrescar lista para obtener el nuevo registro con su id
        const { data: refreshed, error: refreshError } = await supabase
          .from('talleres')
          .select('*')
          .order('date', { ascending: true });
        if (refreshError) throw refreshError;
        setTalleres((refreshed || []).map(row => ({ ...row, inscritos: row.inscritos || [] })));
      }
      setIsFormVisible(false);
      setSelectedTaller(null);
    } catch (e) {
      console.error('Error guardando taller:', e);
      alert(`Error al guardar el taller: ${e?.message || 'Verifica tu configuración de Supabase.'}`);
    }
  };
  const handleDelete = async (tallerId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este taller?")) return;
    try {
      const { error } = await supabase.from('talleres').delete().eq('id', tallerId);
      if (error) throw error;
      setTalleres(talleres.filter(t => t.id !== tallerId));
    } catch (e) {
      console.error('Error eliminando taller:', e);
      alert('No se pudo eliminar el taller. Revisa Supabase.');
    }
  };
  const handleViewRegistrations = (tallerId) => {
    setViewingInscripciones(tallerId);
  };
  const handleCancelarInscripcion = async (tallerId, inscritoId) => {
    if (!window.confirm("¿Seguro que quieres cancelar esta inscripción?")) return;
    try {
      const { data, error } = await supabase
        .from('talleres')
        .select('inscritos')
        .eq('id', tallerId)
        .single();
      if (error) throw error;
      const currentInscritos = data?.inscritos || [];
      const updatedInscritos = currentInscritos.filter(i => i.id !== inscritoId);
      const { error: updError } = await supabase
        .from('talleres')
        .update({ inscritos: updatedInscritos })
        .eq('id', tallerId);
      if (updError) throw updError;
      setTalleres(prevTalleres => 
        prevTalleres.map(taller => 
          taller.id === tallerId 
            ? { ...taller, inscritos: updatedInscritos } 
            : taller
        )
      );
    } catch (e) {
      console.error('Error cancelando inscripción:', e);
      alert('No se pudo cancelar la inscripción. Revisa Supabase.');
    }
  };

  const tallerEnVista = talleres.find(t => t.id === viewingInscripciones);

  return (
    <div className="admin-layout">
      <AdminNav />
      <main className="admin-content admin-calendario-container">
        {/* Estados de carga y error */}
        {loading && (
          <div className="info" role="status" style={{marginBottom: '12px', color:'#333'}}>
            Cargando talleres...
          </div>
        )}
        {loadError && (
          <div className="error" role="alert" style={{marginBottom: '12px', color:'#b00020', fontWeight:600}}>
            {loadError}
          </div>
        )}
        {/* Mensaje si aún no hay datos y no está cargando */}
        {!loading && talleres.length === 0 && (
          <div className="error" role="alert" style={{marginBottom: '12px', color:'#b00020', fontWeight:600}}>
            No hay talleres cargados. Verifica tu tabla "talleres" en Supabase.
          </div>
        )}
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
          <div>Tipo</div>
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
                  <div>{taller.tipo || '-'}</div>
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
      </main>
    </div>
  );
}

export default AdminTaller;
