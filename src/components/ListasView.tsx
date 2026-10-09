import React from 'react';
import type { Task } from '../types';
import { CheckSquare, Briefcase, GraduationCap, Heart, DollarSign, ChevronRight } from 'lucide-react';

interface ListasViewProps {
  tasks: Task[];
}

export const ListasView: React.FC<ListasViewProps> = ({ tasks }) => {
  const categories = [
    { name: 'Personal', icon: Heart, color: 'bg-rose-50 text-rose-600 border-rose-100' },
    { name: 'Trabajo', icon: Briefcase, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { name: 'Estudio', icon: GraduationCap, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { name: 'Salud', icon: CheckSquare, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { name: 'Finanzas', icon: DollarSign, color: 'bg-cyan-50 text-cyan-600 border-cyan-100' }
  ];

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
