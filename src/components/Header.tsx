import React from 'react';
import { Search, Bell, BellOff, User, CheckSquare, LogOut } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  userEmail?: string | null;
  userName?: string | null;
  avatarUrl?: string | null;
  onSignOut?: () => void;
  notifPermission?: 'granted' | 'denied' | 'default' | 'unsupported';
  onEnableNotifications?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, userEmail, userName, avatarUrl, onSignOut, notifPermission, onEnableNotifications }) => {
  return (
    <header className="h-16 md:h-18 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shrink-0">
      {/* Mobile Brand / Logo */}
      <div className="flex md:hidden items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm">
          <CheckSquare className="w-4 h-4" />
        </div>
        <span className="font-bold text-base text-slate-900">ToDoo</span>
      </div>

      {/* Search Bar */}
      <div className="relative w-48 sm:w-64 md:w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar tareas..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
      </div>

      {/* Right Actions / Profile */}
      <div className="flex items-center gap-3">
        {notifPermission !== 'unsupported' && (
          <button
            onClick={notifPermission === 'default' ? onEnableNotifications : undefined}
            title={
              notifPermission === 'granted'
                ? 'Recordatorios activados'
                : notifPermission === 'denied'
                  ? 'Bloqueadas: habilítalas en los permisos del navegador'
                  : 'Activar recordatorios'
            }
            className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 transition-colors relative cursor-pointer"
          >
            {notifPermission === 'denied' ? (
              <BellOff className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <Bell className="w-4 h-4 md:w-5 md:h-5" />
            )}
            {notifPermission === 'default' && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full"></span>
            )}
          </button>
        )}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shadow-inner overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt={userName || 'Perfil'} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-semibold text-slate-800">{userName || 'Mi Espacio'}</p>
            <p className="text-xs text-slate-500 max-w-40 truncate">{userEmail || 'Modo local'}</p>
          </div>
        </div>
        {onSignOut && (
          <button
            onClick={onSignOut}
            title="Cerrar sesión"
            className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        )}
      </div>
    </header>
  );
};
