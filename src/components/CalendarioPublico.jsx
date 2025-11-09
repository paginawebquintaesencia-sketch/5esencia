import React, { useState } from 'react';
import './CalendarioPublico.css';
import { Link } from 'react-router-dom';

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

const sampleTalleres = [
    { 
    id: 1, 
    title: "Pinta tu taza en cerámica", 
    date: "2025-08-06", 
    time: "18:00 - 20:00", 
    instructor: "Rocío Campa", 
    description: "Pieza de cerámica, guía paso a paso, pinceles, pigmentos ilimitados, quema final de la pieza, snacks y bebidas.", 
    estado: 'Confirmado', 
    color: '#3b3e6c'
  },
  { 
    id: 2, 
    title: "Pinta tu regalo para papá", 
    date: "2025-08-13", 
    time: "17:00 - 19:00", 
    instructor: "Ana Soto", 
    description: "Sorprende a papá con un regalo pintado por ti. Incluye todos los materiales y guía.", 
    estado: 'Confirmado',
    color: '#9c51b6'
  },
  { 
    id: 3, 
    title: "Teje tu portavasos en crochet", 
    date: "2025-08-18", 
    time: "10:00 - 12:00", 
    instructor: "Laura Paz", 
    description: "Aprende los puntos básicos de crochet y llévate a casa tu propio portavasos. Incluye hilos y gancho.", 
    estado: 'Confirmado',
    color: '#e67e54'
  },
  { 
    id: 4, 
    title: "Introducción al dibujo", 
    date: "2025-08-28", 
    time: "16:00 - 18:00", 
    instructor: "Carlos Ruiz", 
    description: "Explora tu lado creativo con conceptos básicos de luz, sombra y perspectiva. Materiales incluidos.", 
    estado: 'Confirmado',
    color: '#e45a9a'
  },
  { 
    id: 5, 
    title: "Acuarela Navideña", 
    date: "2025-12-10", 
    time: "17:00 - 19:00", 
    instructor: "Ana Soto", 
    description: "Pinta tus propias postales navideñas.", 
    estado: 'Confirmado',
    color: '#3b3e6c'
  },
];
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
  
  const talleresConfirmados = sampleTalleres.filter(t => t.estado === 'Confirmado');
  const [currentDate, setCurrentDate] = useState(new Date('2025-08-01T12:00:00'));
  const [selectedTallerId, setSelectedTallerId] = useState(talleresConfirmados[0]?.id || null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

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