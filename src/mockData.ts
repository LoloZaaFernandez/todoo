import type { Task } from './types';

export const initialTasks: Task[] = [
  // Hoy (May 12, 2025)
  {
    id: '1',
    title: 'Hacer ejercicio',
    date: '2025-05-12',
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
    date: '2025-05-12',
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
    date: '2025-05-12',
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
    date: '2025-05-12',
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
    date: '2025-05-12',
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
    date: '2025-05-12',
    time: '',
    priority: 'baja',
    subtasks: [],
    completed: false,
    category: 'Personal'
  },
  {
    id: '7',
    title: 'Leer 20 minutos',
    date: '2025-05-12',
    time: '',
    priority: 'baja',
    subtasks: [],
    completed: false,
    category: 'Personal'
  },

  // Mañana (May 13, 2025)
  {
    id: '8',
    title: 'Llevar el coche al taller',
    date: '2025-05-13',
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
    date: '2025-05-13',
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
    date: '2025-05-13',
    time: '',
    priority: 'media',
    subtasks: [],
    completed: false,
    category: 'Personal'
  },

  // Miércoles (May 14, 2025)
  {
    id: '11',
    title: 'Estudiar para el examen',
    date: '2025-05-14',
    time: '10:00',
    priority: 'alta',
    subtasks: [],
    completed: false,
    category: 'Estudio'
  },
  {
    id: '12',
    title: 'Llamar a mamá',
    date: '2025-05-14',
    time: '',
    priority: 'media',
    subtasks: [],
    completed: false,
    category: 'Personal'
  },
  {
    id: '13',
    title: 'Organizar escritorio',
    date: '2025-05-14',
    time: '16:00',
    priority: 'baja',
    subtasks: [],
    completed: false,
    category: 'Personal'
  },

  // Esta semana (May 15-18, 2025)
  {
    id: '14',
    title: 'Terminar presentación',
    date: '2025-05-15',
    time: '',
    priority: 'alta',
    subtasks: [],
    completed: false,
    category: 'Trabajo'
  },
  {
    id: '15',
    title: 'Planear viaje',
    date: '2025-05-16',
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
    date: '2025-05-16',
    time: '',
    priority: 'media',
    subtasks: [],
    completed: false,
    category: 'Finanzas'
  }
];
