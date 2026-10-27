import React from 'react';
import type { Task } from '../types';
import { localDateString } from '../notifications';
import { Calendar as CalendarIcon, CheckCircle, Circle, Clock, Flag, Search } from 'lucide-react';

interface ProximasViewProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onSelectTask: (task: Task) => void;
}

export const ProximasView: React.FC<ProximasViewProps> = ({
  tasks,
  onToggleTask,
  onSelectTask
}) => {
  const todayStr = localDateString();
  const upcomingTasks = tasks.filter((t) => t.date > todayStr);

  const grouped: { [date: string]: Task[] } = {};
  upcomingTasks.forEach((t) => {
    if (!grouped[t.date]) grouped[t.date] = [];
    grouped[t.date].push(t);
  });

  const formatDateHeader = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const label = new Intl.DateTimeFormat('es-PE', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
    const capitalized = label.charAt(0).toUpperCase() + label.slice(1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dateStr === localDateString(tomorrow) ? `Mañana · ${capitalized}` : capitalized;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto w-full space-y-8 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-1">
            <CalendarIcon className="w-5 h-5" />
            <span>Agenda futura</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Próximas</h1>
        </div>
        <div className="relative w-64 hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar en próximas..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      <div className="space-y-6">
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No hay tareas próximas programadas.</p>
          </div>
        ) : (
          Object.entries(grouped).map(([dateStr, dateTasks]) => (
            <div key={dateStr} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                {formatDateHeader(dateStr)}
              </h3>
              <div className="space-y-2.5">
                {dateTasks.map((task) => {
                  const priorityColors = {
                    baja: 'text-slate-400',
                    media: 'text-indigo-500',
                    alta: 'text-rose-500'
                  };
                  return (
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
                        <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                          {task.title}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        {task.time && (
                          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{task.time}</span>
                          </div>
                        )}
                        <Flag className={`w-4 h-4 ${priorityColors[task.priority]}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
