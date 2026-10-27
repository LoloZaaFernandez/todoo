import type { Task } from './types';
import { localDateString } from './notifications';

// Sample dates are relative to the real current day.
const dayOffset = (offset: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return localDateString(d);
};


export const initialTasks: Task[] = [
  // Hoy
  {
    id: '1',
    title: 'Hacer ejercicio',
    date: dayOffset(0),
    time: '07:00',
    priority: 'media',
    subtasks: [
      { id: 's1', title: 'Calentamiento 10 min', completed: true },
      { id: 's2', title: 'Rutina de fuerza', completed: true },
      { id: 's3', title: 'Estiramiento', completed: false }
    ],
    notes: 'Ver opciones de vuelo y alojamiento. Revisar presupuesto.',
    repeat: 'Todos los días',
    completed: true,
    category: 'Salud'
  },
  {
    id: '2',
    title: 'Revisar correos',
    date: dayOffset(0),
    time: '09:00',
    priority: 'baja',
    subtasks: [],
    notes: 'Atender pendientes urgentes del cliente A.',
    completed: true,
    category: 'Trabajo'
  },
  {
    id: '3',
    title: 'Planear la semana',
    date: dayOffset(0),
    time: '10:00',
    priority: 'alta',
    subtasks: [
      { id: 's4', title: 'Definir objetivos clave', completed: false },
      { id: 's5', title: 'Organizar reuniones', completed: false }
    ],
    notes: 'Reunión de alineación el martes a las 11am.',
    completed: false,
    category: 'Trabajo'
  },
  {
    id: '4',
    title: 'Comprar regalo',
    date: dayOffset(0),
    time: '',
    priority: 'media',
    subtasks: [],
    notes: 'Buscar opciones en la tienda online.',
    completed: false,
    category: 'Personal'
  },
  {
    id: '5',
    title: 'Estudiar 1 hora',
    date: dayOffset(0),
    time: '17:00',
    priority: 'alta',
    subtasks: [],
    notes: 'Curso de arquitectura de software y patrones limpios.',
    completed: false,
    category: 'Estudio'
  },
  {
    id: '6',
    title: 'Preparar la cena',
    date: dayOffset(0),
    time: '',
    priority: 'baja',
    subtasks: [],
    completed: false,
    category: 'Personal'
  },
  {
    id: '7',
    title: 'Leer 20 minutos',
    date: dayOffset(0),
    time: '',
    priority: 'baja',
    subtasks: [],
    completed: false,
    category: 'Personal'
  },

  // Mañana
  {
    id: '8',
    title: 'Llevar el coche al taller',
    date: dayOffset(1),
    time: '09:00',
    priority: 'alta',
    subtasks: [],
    notes: 'Revisión de frenos y cambio de aceite.',
    completed: false,
    category: 'Personal'
  },
  {
    id: '9',
    title: 'Reunión de trabajo',
    date: dayOffset(1),
    time: '11:00',
    priority: 'alta',
    subtasks: [],
    notes: 'Presentación de avances Q2 con el equipo.',
    completed: false,
    category: 'Trabajo'
  },
  {
    id: '10',
    title: 'Comprar víveres',
    date: dayOffset(1),
    time: '',
    priority: 'media',
    subtasks: [],
    completed: false,
    category: 'Personal'
  },

  // Miércoles
  {
    id: '11',
    title: 'Estudiar para el examen',
    date: dayOffset(2),
    time: '10:00',
    priority: 'alta',
    subtasks: [],
    completed: false,
    category: 'Estudio'
  },
  {
    id: '12',
    title: 'Llamar a mamá',
    date: dayOffset(2),
    time: '',
    priority: 'media',
    subtasks: [],
    completed: false,
    category: 'Personal'
  },
  {
    id: '13',
    title: 'Organizar escritorio',
    date: dayOffset(2),
    time: '16:00',
    priority: 'baja',
    subtasks: [],
    completed: false,
    category: 'Personal'
  },

  // Esta semana
  {
    id: '14',
    title: 'Terminar presentación',
    date: dayOffset(3),
    time: '',
    priority: 'alta',
    subtasks: [],
    completed: false,
    category: 'Trabajo'
  },
  {
    id: '15',
    title: 'Planear viaje',
    date: dayOffset(4),
    time: '',
    priority: 'media',
    subtasks: [
      { id: 's6', title: 'Buscar vuelos', completed: true },
      { id: 's7', title: 'Revisar alojamiento', completed: true },
      { id: 's8', title: 'Hacer itinerario', completed: false }
    ],
    notes: 'Viaje a la costa para el fin de semana largo.',
    completed: false,
    category: 'Personal'
  },
  {
    id: '16',
    title: 'Revisar presupuesto',
    date: dayOffset(4),
    time: '',
    priority: 'media',
    subtasks: [],
    completed: false,
    category: 'Finanzas'
  }
];
