import React, { useState } from 'react';
import type { Task } from '../types';
import { CheckSquare, Briefcase, GraduationCap, Heart, DollarSign, ChevronRight, ArrowLeft, Plus, CheckCircle, Circle } from 'lucide-react';

interface ListasViewProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onSelectTask: (task: Task) => void;
  onOpenNewTask: (category?: string) => void;
}

export const ListasView: React.FC<ListasViewProps> = ({
  tasks,
  onToggleTask,
  onSelectTask,
  onOpenNewTask
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = [
    { name: 'Personal', icon: Heart, color: 'bg-rose-50 text-rose-600 border-rose-100' },
    { name: 'Trabajo', icon: Briefcase, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { name: 'Estudio', icon: GraduationCap, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { name: 'Salud', icon: CheckSquare, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { name: 'Finanzas', icon: DollarSign, color: 'bg-cyan-50 text-cyan-600 border-cyan-100' }
  ];

  const active = categories.find((c) => c.name === selectedCategory);
  if (active) {
    const ActiveIcon = active.icon;
    const catTasks = tasks.filter((t) => (t.category || 'Personal') === active.name);
    const pending = catTasks.filter((t) => !t.completed);
    const done = catTasks.filter((t) => t.completed);
    const ordered = [...pending, ...done];

    return (
      <div className="p-8 max-w-4xl mx-auto w-full space-y-8 pb-24">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              aria-label="Volver a Listas"
              className="w-9 h-9 rounded-xl hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${active.color}`}>
              <ActiveIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{active.name}</h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {pending.length} pendientes · {done.length} completadas
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenNewTask(active.name)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl shadow-lg shadow-indigo-200 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Nueva tarea
          </button>
        </div>

        <div className="space-y-3">
          {ordered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 font-medium">No hay tareas en esta categoría todavía.</p>
            </div>
          ) : (
            ordered.map((task) => (
              <div
                key={task.id}
                onClick={() => onSelectTask(task)}
                className={`bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between group hover:border-indigo-300 transition-all cursor-pointer ${
                  task.completed ? 'bg-slate-50/50' : ''
                }`}
              >
                <div className="flex items-center gap-3.5 flex-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTask(task.id);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                  >
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5 fill-indigo-600 text-white" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </button>
                  <p
                    className={`text-sm font-medium ${
                      task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {task.title}
                  </p>
                </div>
                <span className="text-xs font-medium text-slate-400 px-2.5 py-1 bg-slate-100 rounded-lg">
                  {task.date}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto w-full space-y-8 pb-24">
      <div>
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-1">
          <CheckSquare className="w-5 h-5" />
          <span>Organización por categoría</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Listas</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const catTasks = tasks.filter((t) => (t.category || 'Personal') === cat.name);
          const completedCount = catTasks.filter((t) => t.completed).length;

          return (
            <div
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-indigo-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${cat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">{cat.name}</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {catTasks.length} tareas ({completedCount} completadas)
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
