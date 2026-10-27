import React, { useState } from 'react';
import type { Task } from '../types';
import { localDateString } from '../notifications';
import { ChevronLeft, ChevronRight, CheckCircle, Circle, Clock, Plus } from 'lucide-react';

interface CalendarioViewProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onSelectTask: (task: Task) => void;
  onOpenNewTask: () => void;
}

export const CalendarioView: React.FC<CalendarioViewProps> = ({
  tasks,
  onToggleTask,
  onSelectTask,
  onOpenNewTask
}) => {
  const todayStr = localDateString();
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [viewDate, setViewDate] = useState(() => {
    const n = new Date();
    return { year: n.getFullYear(), month: n.getMonth() };
  });

  const { year, month } = viewDate;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = new Date(year, month, 1).getDay() || 7; // Monday=1 ... Sunday=7
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const formatDayDate = (dayNum: number) => localDateString(new Date(year, month, dayNum));

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const monthTitle = capitalize(
    new Intl.DateTimeFormat('es-PE', { month: 'long', year: 'numeric' })
      .format(new Date(year, month, 1))
      .replace(' de ', ' ')
  );
  const [selY, selM, selD] = selectedDate.split('-').map(Number);
  const selectedLabel = capitalize(
    new Intl.DateTimeFormat('es-PE', { weekday: 'long', day: 'numeric', month: 'long' }).format(
      new Date(selY, selM - 1, selD)
    )
  );

  const shiftMonth = (delta: number) => {
    const d = new Date(year, month + delta, 1);
    setViewDate({ year: d.getFullYear(), month: d.getMonth() });
  };

  const goToday = () => {
    const n = new Date();
    setViewDate({ year: n.getFullYear(), month: n.getMonth() });
    setSelectedDate(localDateString(n));
  };

  const selectedDayTasks = tasks.filter((t) => t.date === selectedDate);
  const completedSelected = selectedDayTasks.filter((t) => t.completed).length;

  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <div className="p-8 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24">
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{monthTitle}</h2>
            <p className="text-xs text-slate-500">Visualiza tus tareas en el mes</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToday}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Hoy
            </button>
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
              <button onClick={() => shiftMonth(-1)} className="p-2 hover:bg-slate-50 text-slate-600 border-r border-slate-200 cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => shiftMonth(1)} className="p-2 hover:bg-slate-50 text-slate-600 cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {dayNames.map((name) => (
            <div key={name} className="text-xs font-semibold text-slate-400 py-1">
              {name}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: (startDayOfWeek - 1 + 7) % 7 }).map((_, idx) => (
            <div key={'empty-' + idx} className="h-20 bg-slate-50/50 rounded-xl opacity-40"></div>
          ))}

          {days.map((dayNum) => {
            const dateStr = formatDayDate(dayNum);
            const dayTasks = tasks.filter((t) => t.date === dateStr);
            const isSelected = selectedDate === dateStr;
            const isToday = dateStr === todayStr;

            return (
              <div
                key={dayNum}
                onClick={() => setSelectedDate(dateStr)}
                className={`h-20 p-2 rounded-xl border flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20'
                    : isToday
                    ? 'border-indigo-300 bg-white'
                    : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                      isToday ? 'bg-indigo-600 text-white' : 'text-slate-700'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {dayTasks.length > 0 && (
                    <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                      {dayTasks.length}
                    </span>
                  )}
                </div>

                <div className="flex gap-1 items-center justify-center">
                  {dayTasks.slice(0, 3).map((t, i) => (
                    <span
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${
                        t.completed ? 'bg-emerald-500' : 'bg-indigo-500'
                      }`}
                    ></span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
        <div className="space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Detalle del día
            </h3>
            <p className="text-lg font-bold text-slate-900 mt-1">
              {selectedLabel}
            </p>
            {selectedDayTasks.length > 0 && (
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {completedSelected} de {selectedDayTasks.length} completadas
              </p>
            )}
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-[380px]">
            {selectedDayTasks.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-12">
                No hay tareas programadas para este día.
              </p>
            ) : (
              selectedDayTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onSelectTask(task)}
                  className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleTask(task.id);
                      }}
                      className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      {task.completed ? (
                        <CheckCircle className="w-4 h-4 fill-indigo-600 text-white" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300" />
                      )}
                    </button>
                    <span className={`text-xs font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {task.title}
                    </span>
                  </div>
                  {task.time && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>{task.time}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <button
            onClick={onOpenNewTask}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva tarea</span>
          </button>
        </div>
      </div>
    </div>
  );
};
