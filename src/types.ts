export type Priority = 'baja' | 'media' | 'alta';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  priority: Priority;
  subtasks: Subtask[];
  notes?: string;
  repeat?: string;
  completed: boolean;
  category?: string;
}

export type ViewType = 'hoy' | 'proximas' | 'calendario' | 'listas' | 'completadas';
