import React, { useState, useEffect } from 'react';
import type { Task, Priority } from '../types';
import { localDateString } from '../notifications';
import { X, Calendar, Clock, Flag, CheckSquare } from 'lucide-react';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'subtasks'>) => void;
  defaultCategory?: string;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({ isOpen, onClose, onAddTask, defaultCategory }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(localDateString());
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState<Priority>('media');
  const [category, setCategory] = useState(defaultCategory || 'Personal');

  // Preselect the requested category each time the modal opens.
  useEffect(() => {
    if (isOpen) setCategory(defaultCategory || 'Personal');
  }, [isOpen, defaultCategory]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      date,
      time: time || undefined,
      priority,
      category,
      notes: ''
    });

    setTitle('');
    setTime('');
    setPriority('media');
    onClose();
  };

  const handleQuickDate = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    setDate(localDateString(d));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Nueva tarea</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="¿Qué quieres hacer?"
              autoFocus
              className="w-full text-lg font-medium text-slate-900 placeholder-slate-300 border-b border-slate-200 pb-3 focus:outline-none focus:border-indigo-600 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              ¿Cuándo?
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleQuickDate(0)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  date === localDateString()
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Hoy
              </button>
              <button
                type="button"
                onClick={() => handleQuickDate(1)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  (() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    return date === localDateString(tomorrow);
                  })()
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Mañana
              </button>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                Hora (opcional)
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Personal">Personal</option>
                <option value="Trabajo">Trabajo</option>
                <option value="Estudio">Estudio</option>
                <option value="Salud">Salud</option>
                <option value="Finanzas">Finanzas</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Flag className="w-4 h-4 text-slate-400" />
              Prioridad
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['baja', 'media', 'alta'] as Priority[]).map((p) => {
                const isSelected = priority === p;
                const colors = {
                  baja: isSelected ? 'bg-slate-700 text-white border-slate-700' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100',
                  media: isSelected ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100',
                  alta: isSelected ? 'bg-rose-600 text-white border-rose-600' : 'bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100'
                };
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border capitalize transition-all cursor-pointer ${colors[p]}`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!title.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-indigo-200 transition-all cursor-pointer"
            >
              Crear tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
