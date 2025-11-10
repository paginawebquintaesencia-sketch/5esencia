import React, { useState, useEffect } from 'react';
import './CalendarioPublico.css';
import { Link } from 'react-router-dom';
// Supabase eliminado: uso de datos locales

// Mapeo de color por tipo de arte
const typeColorMap = {
  Ceramica: '#e53935',   // rojo
  Arte: '#1e88e5',       // azul
  Fotografia: '#8e24aa', // morado
  Abstracto: '#43a047',  // verde
};

function generateCalendarGrid(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let firstWeekday = firstDayOfMonth.getDay(); 
  let startPadding = (firstWeekday === 0) ? 6 : firstWeekday - 1;
  
  const grid = [];
  for (let i = 0; i < startPadding; i++) {
    grid.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    grid.push(i);
  }
  const totalCells = grid.length;
  const cellsToComplete = (totalCells % 7 === 0) ? 0 : 7 - (totalCells % 7);
  for (let i = 0; i < cellsToComplete; i++) {
    grid.push(null);
  }
  return grid;
}

// Paleta de colores para celdas con talleres (asignación determinística)
const colorPalette = ['#3b3e6c', '#9c51b6', '#e67e54', '#e45a9a', '#2a9d8f', '#e9c46a'];
const weekdays = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];

function DefaultDetailView() {
  return (
    <div className="detalle-default">
      <h2>SELECCIONA TU PRÓXIMO TALLER</h2>
      <p>EN EL CALENDARIO ENCONTRARÁS TODAS NUESTRAS EXPERIENCIAS CREATIVAS. SELECCIONA UN TALLER PARA VER SUS DETALLES Y REGISTRARTE.</p>
    </div>
  );
}

function TallerDetailView({ taller }) {
  if (!taller) return <DefaultDetailView />;
  const fecha = new Date(`${taller.date}T12:00:00`);
  const diaSemana = weekdays[(fecha.getDay() + 6) % 7].toUpperCase();
  const dia = fecha.getDate();
  const mes = fecha.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date(0, 0, 0, hours, minutes);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };
  const [startTime, endTime] = taller.time.split(' - ');

  return (
    <div className="detalle-taller">
      <h2>TALLER {taller.title.toUpperCase()}</h2>
      <p className="fecha-hora">{diaSemana} {dia} DE {mes}</p>
      <p className="fecha-hora">{formatTime(startTime)} - {formatTime(endTime)}</p>
      <p className="descripcion">{taller.description}</p>
      <p className="instructor">IMPARTIDO POR: <a>{taller.instructor.toUpperCase()}</a></p><br />
      <Link to={`/inscripciones/${taller.id}`} className="btn-inscribirse">
        Inscribirse
      </Link>
    </div>
  );
}

function CalendarioPublico() {
  const [talleres, setTalleres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTallerId, setSelectedTallerId] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const fetchTalleres = async () => {
      setLoading(true);
      setError(null);
      // Conexión a base de datos deshabilitada: sin carga remota
      const data = [];
      const withColors = (data || []).map((t, idx) => ({
        ...t,
        color: typeColorMap[(t.tipo || '').trim()] || colorPalette[Math.abs((t.id || idx).toString().split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % colorPalette.length]
      }));
      setTalleres(withColors);
      setSelectedTallerId(null);
      setLoading(false);
    };
    fetchTalleres();
  }, []);

  const goToPreviousMonth = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
      setSelectedTallerId(null);
      setAnimationKey(prev => prev + 1);
      setIsAnimating(false);
    }, 200);
  };
  
  const goToNextMonth = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
      setSelectedTallerId(null);
      setAnimationKey(prev => prev + 1);
      setIsAnimating(false);
    }, 200);
  };

  const talleresConfirmados = talleres.filter(t => t.estado === 'Confirmado');
  const calendarGrid = generateCalendarGrid(currentDate);
  const currentMonthName = currentDate.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
  const currentYear = currentDate.getFullYear();
  const selectedTaller = talleresConfirmados.find(t => t.id === selectedTallerId);
  
  const findTallerByDate = (dayNum) => {
    if (!dayNum) return null;
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = dayNum.toString().padStart(2, '0');
    const checkDate = `${year}-${month}-${day}`;
    return talleresConfirmados.find(t => t.date === checkDate);
  };

  return (
    <div className="calendario-publico-container">
      {loading && (
        <div className="info" role="status" style={{marginBottom: '12px', color:'#333'}}>
          Cargando talleres...
        </div>
      )}
      {error && (
        <div className="error" role="alert" style={{marginBottom: '12px', color:'#b00020', fontWeight:600}}>
          {error}
        </div>
      )}
      
      <div className="calendario-grid-area">
        
        {}
        <div className="mes-header">
          <button className="mes-nav-btn" onClick={goToPreviousMonth} disabled={isAnimating}>&lt;</button>
          <h1 key={`header-${animationKey}`}>{currentMonthName} {currentYear}</h1>
          <button className="mes-nav-btn" onClick={goToNextMonth} disabled={isAnimating}>&gt;</button>
        </div>
        
        {}
        
        {}
        <div className={`calendar-grid ${isAnimating ? 'changing' : ''}`} key={`grid-${animationKey}`}>
          {calendarGrid.map((dayNum, index) => {
            const taller = findTallerByDate(dayNum);
            const isSelected = taller && taller.id === selectedTallerId;
            
            const cellClasses = [
              'calendar-day-cell',
              dayNum === null ? 'is-empty' : '',
              taller ? 'has-taller' : '',
              isSelected ? 'is-selected' : '',
            ].join(' ');

            return (
              <div 
                key={index} 
                className={cellClasses}
                onClick={() => taller && setSelectedTallerId(taller.id)}
                style={taller && !isSelected ? { backgroundColor: taller.color } : {}}
              >
                {}
                <span className="weekday-label">{weekdays[index % 7]}</span>

                {}
                {dayNum && <span className="day-number">{dayNum.toString().padStart(2, '0')}</span>}
                
                {}
                {taller && (
                  <div className="taller-info-cell">
                    <span>{taller.title}</span>
                    <span className="taller-tag">TALLER</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {}
      <div className="calendario-detail-area">
        {selectedTaller ? 
          <TallerDetailView taller={selectedTaller} /> : 
          <DefaultDetailView />
        }
      </div>
    </div>
  );
}

export default CalendarioPublico;
