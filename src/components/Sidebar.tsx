import React from 'react';
import type { ViewType } from '../types';
import { Sun, Calendar as CalendarIcon, Grid, CheckCircle2, CheckSquare, Plus } from 'lucide-react';

interface SidebarProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  onOpenNewTask: () => void;
  completedCount: number;
  todayCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  onOpenNewTask,
  todayCount
}) => {
  const navItems = [
    { id: 'hoy' as ViewType, label: 'Hoy', icon: Sun, badge: todayCount },
    { id: 'proximas' as ViewType, label: 'Próximas', icon: CalendarIcon },
    { id: 'calendario' as ViewType, label: 'Calendario', icon: Grid },
    { id: 'listas' as ViewType, label: 'Listas', icon: CheckSquare },
    { id: 'completadas' as ViewType, label: 'Completadas', icon: CheckCircle2 }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-full shrink-0 select-none">
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                ToDoo
              </h1>
              <p className="text-xs text-slate-500">Tus planes, más simples.</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={onOpenNewTask}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva tarea</span>
          </button>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 text-xs text-slate-400 text-center">
          Organiza tu día, sin complicaciones.
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex md:hidden items-center justify-around h-16 z-40 px-2 shadow-lg">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          // Insert the floating plus button in the middle (after index 1 or 2)
          const insertButtonBefore = 2; // e.g. before Calendario

          return (
            <React.Fragment key={item.id}>
              {idx === insertButtonBefore && (
                <button
                  onClick={onOpenNewTask}
                  className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-full shadow-lg shadow-indigo-300 flex items-center justify-center -mt-6 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  title="Nueva tarea"
                >
                  <Plus className="w-6 h-6" />
                </button>
              )}
              <button
                onClick={() => onSelectView(item.id)}
                className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors cursor-pointer ${
                  isActive ? 'text-indigo-600 font-semibold' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
};
