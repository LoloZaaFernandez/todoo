import React from 'react';
import type { Task } from '../types';
import { CheckCircle2, Trophy, CheckCircle } from 'lucide-react';
import { localDateString } from '../notifications';

interface CompletadasViewProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onSelectTask: (task: Task) => void;
}

export const CompletadasView: React.FC<CompletadasViewProps> = ({
  tasks,
  onToggleTask,
  onSelectTask
}) => {
  // Local date (YYYY-MM-DD) a task was completed on; legacy tasks fall back to their due date.
  const completionDate = (t: Task): string =>
    t.completedAt ? localDateString(new Date(t.completedAt)) : t.date;
  const completionTime = (t: Task): number =>
    t.completedAt ? new Date(t.completedAt).getTime() : new Date(`${t.date}T00:00:00`).getTime();

  const completedTasks = tasks
    .filter((t) => t.completed)
    .sort((a, b) => completionTime(b) - completionTime(a));

  // Current week, Monday first, in local time.
  const now = new Date();
  const todayStr = localDateString(now);
  const mondayOffset = (now.getDay() + 6) % 7;
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((name, i) => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - mondayOffset + i);
    return { name, dateStr: localDateString(d) };
  });
  const weekStart = weekDays[0].dateStr;
  const weekEnd = weekDays[6].dateStr;

  // Only tasks with a real completion timestamp count toward weekly progress.
  const weekTasks = completedTasks.filter((t) => {
    if (!t.completedAt) return false;
    const d = completionDate(t);
    return d >= weekStart && d <= weekEnd;
  });
  const doneDates = new Set(weekTasks.map(completionDate));

  const daysOfWeek = weekDays.map((day) => ({
    name: day.name,
    completed: doneDates.has(day.dateStr),
    isToday: day.dateStr === todayStr,
    isFuture: day.dateStr > todayStr
  }));

  const formatCompletion = (t: Task): string => {
    const d = t.completedAt ? new Date(t.completedAt) : new Date(`${t.date}T00:00:00`);
    return d.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' }).replace('.', '');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto w-full space-y-8 pb-24">
      <div className="bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-white rounded-3xl border border-indigo-100 p-8 text-center relative overflow-hidden shadow-sm">
        <div className="absolute top-4 right-4 text-indigo-200">
          <Trophy className="w-24 h-24 opacity-20" />
        </div>
        <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-200 mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">¡Muy bien!</h2>
        <p className="text-slate-600 text-sm font-medium">
          Completaste {weekTasks.length} {weekTasks.length === 1 ? 'tarea' : 'tareas'} esta semana.
        </p>

        <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-indigo-100/60">
          {daysOfWeek.map((day) => (
            <div
              key={day.name}
              className={`flex flex-col items-center gap-2 px-1.5 py-1 rounded-xl ${
                day.isToday ? 'bg-indigo-100/60 ring-1 ring-indigo-200' : ''
              } ${day.isFuture ? 'opacity-60' : ''}`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  day.completed ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-slate-100 text-slate-400'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-600">{day.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-indigo-700 bg-indigo-50 py-2 px-4 rounded-xl w-fit mx-auto font-medium">
          <span>🌱</span>
          <span>Pequeños pasos también son grandes logros.</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Historial de completadas ({completedTasks.length})
        </h3>
        {completedTasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No hay tareas completadas todavía.</p>
          </div>
        ) : (
          completedTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onSelectTask(task)}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between group hover:border-indigo-300 transition-all cursor-pointer bg-slate-50/50"
            >
              <div className="flex items-center gap-3.5 flex-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleTask(task.id);
                  }}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                >
                  <CheckCircle className="w-5 h-5 fill-indigo-600 text-white" />
                </button>
                <p className="text-sm font-medium line-through text-slate-400">
                  {task.title}
                </p>
              </div>
              <span className="text-xs font-medium text-slate-400 px-2.5 py-1 bg-slate-100 rounded-lg">
                {formatCompletion(task)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
