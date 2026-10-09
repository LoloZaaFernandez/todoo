import React, { useState } from 'react';
import type { Task, Subtask } from '../types';
import { X, Calendar, Clock, Flag, Repeat, Trash2, Plus, CheckCircle, Circle } from 'lucide-react';

interface TaskDetailModalProps {
  task: Task | null;
  onClose: () => void;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  onClose,
  onUpdateTask,
  onDeleteTask
}) => {
  if (!task) return null;

  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [notes, setNotes] = useState(task.notes || '');

  const completedSubtasksCount = task.subtasks.filter((s) => s.completed).length;

  const handleToggleSubtask = (subId: string) => {
    const updatedSubtasks = task.subtasks.map((sub) =>
      sub.id === subId ? { ...sub, completed: !sub.completed } : sub
    );
    onUpdateTask({ ...task, subtasks: updatedSubtasks });
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;

    const newSub: Subtask = {
      id: 'sub_' + Date.now(),
      title: newSubtaskTitle.trim(),
      completed: false
    };

    onUpdateTask({ ...task, subtasks: [...task.subtasks, newSub] });
    setNewSubtaskTitle('');
  };

  const handleNotesBlur = () => {
    if (notes !== task.notes) {
      onUpdateTask({ ...task, notes });
    }
  };

  const priorityColors = {
    baja: 'bg-slate-100 text-slate-700',
    media: 'bg-indigo-100 text-indigo-700',
    alta: 'bg-rose-100 text-rose-700'
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onUpdateTask({ ...task, completed: !task.completed })}
              className="text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              {task.completed ? (
                <CheckCircle className="w-6 h-6 fill-indigo-600 text-white" />
              ) : (
                <Circle className="w-6 h-6 text-slate-300" />
              )}
            </button>
            <h2 className={`text-lg font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
              {task.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Calendar className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Fecha</p>
                <p className="text-xs font-medium text-slate-700">{task.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Clock className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Hora</p>
                <p className="text-xs font-medium text-slate-700">{task.time || 'Sin hora'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Flag className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Prioridad</p>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md capitalize ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Subtareas ({completedSubtasksCount}/{task.subtasks.length})
              </h3>
            </div>

            <div className="space-y-2">
              {task.subtasks.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => handleToggleSubtask(sub.id)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {sub.completed ? (
                    <CheckCircle className="w-4 h-4 text-indigo-600 fill-indigo-50" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300" />
                  )}
                  <span className={`text-sm ${sub.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {sub.title}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddSubtask} className="flex gap-2 pt-1">
              <input
                type="text"
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                placeholder="Añadir subtarea..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir</span>
              </button>
            </form>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Notas
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleNotesBlur}
              placeholder="Añade notas o detalles adicionales..."
              rows={3}
              className="w-full p-3.5 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Repeat className="w-4 h-4 text-slate-400" />
              <span>Repetir: {task.repeat || 'No se repite'}</span>
            </div>
            <span className="font-semibold px-2.5 py-1 bg-white rounded-lg border border-slate-200">
              {task.category || 'General'}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={() => {
                onDeleteTask(task.id);
                onClose();
              }}
              className="flex items-center gap-2 text-rose-600 hover:text-rose-700 text-sm font-medium transition-colors cursor-pointer p-2 rounded-xl hover:bg-rose-50"
            >
              <Trash2 className="w-4 h-4" />
              <span>Eliminar tarea</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
