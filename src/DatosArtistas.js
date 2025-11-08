// src/datosArtistas.js

// Importamos las fotos que ya tenías
import fotoArtista1 from './img/log.jpg';
import fotoArtista2 from './img/log.jpg';
import fotoArtista3 from './img/log.jpg';
import fotoArtista4 from './img/log.jpg';
import fotoArtista5 from './img/log.jpg';
import fotoArtista6 from './img/log.jpg';

// (Aquí importarías las fotos de la galería, ej: import rocioGaleria1 from './img/rocio-g1.jpg')

// Exportamos la lista para que otros archivos puedan importarla
export const listaArtistas = [
  {
    id: 1,
    imagen: fotoArtista1,
    nombre: 'Rocio Campa',
    tags: ['Fotografía', 'Pintura', 'Dibujo', 'Artesanía'],
    // --- NUEVOS DATOS ---
    titulo: 'ARTISTA FORMADOR',
    descripcion: 'MAESTRO QUE TRANSFORMA SU EXPERIENCIA EN CONOCIMIENTO A TRAVÉS DE TALLERES QUE INSPIRAN, ENSEÑAN Y CONECTAN CON EL ARTE.',
    talleres: 'TALLERES IMPARTIDOS: PINTA TU TAZA, PINTA TU LIENZO.',
    semblanza: [
      'ARTISTA VISUAL, ARQUITECTA Y DISEÑADORA, ORIGINARIA DE VERACRUZ. DESDE NIÑA HA ESTADO CONECTADA CON EL ARTE; DIBUJA DESDE QUE TIENE MEMORIA, Y SU SENSIBILIDAD HACIA EL COLOR LA LLEVÓ, AÑOS MÁS TARDE, A DESCUBRIR LA PINTURA Y LA CERÁMICA COMO LENGUAJES ESENCIALES EN SU VIDA.',
      'SU OBRA TRANSITA ENTRE EL IMPRESIONISMO Y EL REALISMO, CON UNA PROFUNDA CONEXIÓN HACIA EL PAISAJISMO Y LOS PEQUEÑOS DETALLES DEL ENTORNO.',
      'ESTÁ CONVENCIDA DE QUE NO EXISTE EL "BUEN" ARTISTA, SINO AQUEL QUE SABE MIRAR CON PROFUNDIDAD Y TRANSFORMA ESA MIRADA EN CREACIÓN.'
    ],
    // (Usaríamos las imágenes importadas aquí)
    galeria: [
      'https://via.placeholder.com/300x300', 
      'https://via.placeholder.com/300x300', 
      'https://via.placeholder.com/300x300', 
      'https://via.placeholder.com/300x300'
    ]
  },
  {
    id: 2,
    imagen: fotoArtista2,
    nombre: 'Raul Lagunes',
    tags: ['Fotografía', 'Pintura', 'Dibujo', 'Artesanía'],
    // --- DATOS DE RELLENO ---
    titulo: 'ARTISTA DESTACADO',
    descripcion: 'DESCRIPCIÓN PARA RAUL.',
    talleres: 'TALLERES IMPARTIDOS: TALLER DE RAUL.',
    semblanza: [
      'SEMBLANZA DE RAUL LAGUNES AQUÍ.',
      'MÁS PÁRRAFOS DE RAUL.'
    ],
    galeria: ['https://via.placeholder.com/300x300']
  },
  {
    id: 3,
    imagen: fotoArtista3,
    nombre: 'Rafael Remes',
    tags: ['Fotografía', 'Pintura', 'Dibujo', 'Artesanía'],
    // --- DATOS DE RELLENO ---
    titulo: 'ARTISTA DESTACADO',
    descripcion: 'DESCRIPCIÓN PARA RAFAEL.',
    talleres: 'TALLERES IMPARTIDOS: TALLER DE RAFAEL.',
    semblanza: [
      'SEMBLANZA DE RAFAEL REMES AQUÍ.',
    ],
    galeria: ['https://via.placeholder.com/300x300']
    },
    {
    id: 4,
    imagen: fotoArtista4,
    nombre: 'Rocio Campa',
    tags: ['Fotografía', 'Pintura', 'Dibujo', 'Artesanía'],
    // --- NUEVOS DATOS ---
    titulo: 'ARTISTA FORMADOR',
    descripcion: 'MAESTRO QUE TRANSFORMA SU EXPERIENCIA EN CONOCIMIENTO A TRAVÉS DE TALLERES QUE INSPIRAN, ENSEÑAN Y CONECTAN CON EL ARTE.',
    talleres: 'TALLERES IMPARTIDOS: PINTA TU TAZA, PINTA TU LIENZO.',
    semblanza: [
      'ARTISTA VISUAL, ARQUITECTA Y DISEÑADORA, ORIGINARIA DE VERACRUZ. DESDE NIÑA HA ESTADO CONECTADA CON EL ARTE; DIBUJA DESDE QUE TIENE MEMORIA, Y SU SENSIBILIDAD HACIA EL COLOR LA LLEVÓ, AÑOS MÁS TARDE, A DESCUBRIR LA PINTURA Y LA CERÁMICA COMO LENGUAJES ESENCIALES EN SU VIDA.',
      'SU OBRA TRANSITA ENTRE EL IMPRESIONISMO Y EL REALISMO, CON UNA PROFUNDA CONEXIÓN HACIA EL PAISAJISMO Y LOS PEQUEÑOS DETALLES DEL ENTORNO.',
      'ESTÁ CONVENCIDA DE QUE NO EXISTE EL "BUEN" ARTISTA, SINO AQUEL QUE SABE MIRAR CON PROFUNDIDAD Y TRANSFORMA ESA MIRADA EN CREACIÓN.'
    ],
    // (Usaríamos las imágenes importadas aquí)
    galeria: [
      'https://via.placeholder.com/300x300', 
      'https://via.placeholder.com/300x300', 
      'https://via.placeholder.com/300x300', 
      'https://via.placeholder.com/300x300'
    ]
  },
  {
    id: 5,
    imagen: fotoArtista5,
    nombre: 'Raul Lagunes',
    tags: ['Fotografía', 'Pintura', 'Dibujo', 'Artesanía'],
    // --- DATOS DE RELLENO ---
    titulo: 'ARTISTA DESTACADO',
    descripcion: 'DESCRIPCIÓN PARA RAUL.',
    talleres: 'TALLERES IMPARTIDOS: TALLER DE RAUL.',
    semblanza: [
      'SEMBLANZA DE RAUL LAGUNES AQUÍ.',
      'MÁS PÁRRAFOS DE RAUL.'
    ],
    galeria: ['https://via.placeholder.com/300x300']
  },
  {
    id: 6,
    imagen: fotoArtista6,
    nombre: 'Rafael Remes',
    tags: ['Fotografía', 'Pintura', 'Dibujo', 'Artesanía'],
    // --- DATOS DE RELLENO ---
    titulo: 'ARTISTA DESTACADO',
    descripcion: 'DESCRIPCIÓN PARA RAFAEL.',
    talleres: 'TALLERES IMPARTIDOS: TALLER DE RAFAEL.',
    semblanza: [
      'SEMBLANZA DE RAFAEL REMES AQUÍ.',
    ],
    galeria: ['https://via.placeholder.com/300x300']
  },
];