import React from 'react';
import type { Task } from '../types';
import { Sun, CheckCircle, Circle, Clock, Plus, MoreHorizontal, Flag } from 'lucide-react';

interface HoyViewProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onSelectTask: (task: Task) => void;
  onOpenNewTask: () => void;
}

export const HoyView: React.FC<HoyViewProps> = ({
  tasks,
  onToggleTask,
  onSelectTask,
  onOpenNewTask
}) => {
  const todayStr = '2025-05-12';
  const todayTasks = tasks.filter((t) => t.date === todayStr);

  const completedCount = todayTasks.filter((t) => t.completed).length;
  const totalCount = todayTasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto w-full space-y-8 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-1">
            <Sun className="w-5 h-5" />
            <span>Buenos días</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Lunes, 12 de mayo</h1>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 min-w-[260px]">
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">{completedCount} de {totalCount} completadas</span>
              <span className="text-indigo-600">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {todayTasks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No hay tareas para hoy. ¡Disfruta tu día!</p>
          </div>
        ) : (
          todayTasks.map((task) => {
            const priorityColors = {
              baja: 'text-slate-400',
              media: 'text-indigo-500',
              alta: 'text-rose-500'
            };
            return (
              <div
                key={task.id}
                className={`bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between group hover:border-indigo-300 transition-all ${
                  task.completed ? 'bg-slate-50/50' : ''
                }`}
              >
                <div className="flex items-center gap-3.5 flex-1 cursor-pointer" onClick={() => onSelectTask(task)}>
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
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {task.title}
                    </p>
                    {task.subtasks.length > 0 && (
                      <span className="text-[11px] text-slate-400 font-medium">
                        {task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length} subtareas
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {task.time && (
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{task.time}</span>
                    </div>
                  )}
                  <Flag className={`w-4 h-4 ${priorityColors[task.priority]}`} />
                  <button
                    onClick={() => onSelectTask(task)}
                    className="text-slate-300 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="pt-2">
        <button
          onClick={onOpenNewTask}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva tarea</span>
        </button>
      </div>
    </div>
  );
};
