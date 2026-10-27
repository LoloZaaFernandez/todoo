import { useState, useEffect } from 'react';
import type { Task, ViewType } from './types';
import { initialTasks } from './mockData';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HoyView } from './components/HoyView';
import { ProximasView } from './components/ProximasView';
import { CalendarioView } from './components/CalendarioView';
import { ListasView } from './components/ListasView';
import { CompletadasView } from './components/CompletadasView';
import { NewTaskModal } from './components/NewTaskModal';
import { TaskDetailModal } from './components/TaskDetailModal';
import { AuthModal } from './components/AuthModal';
import { webNotifier, takeDueTasks, localDateString } from './notifications';

export function App() {
  const [session, setSession] = useState<any>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('todoo_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialTasks;
      }
    }
    return initialTasks;
  });

  const [currentView, setCurrentView] = useState<ViewType>('hoy');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Check Supabase session on mount
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch tasks from Supabase when session exists
  useEffect(() => {
    if (session && isSupabaseConfigured) {
      fetchCloudTasks();
    }
  }, [session]);

  const fetchCloudTasks = async () => {
    if (!session?.user) return;
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', session.user.id);

      if (error) throw error;
      if (data && data.length > 0) {
        const cloudTasks: Task[] = data.map((row: any) => ({
          id: row.id,
          title: row.title,
          date: row.date,
          time: row.time || '',
          priority: row.priority,
          subtasks: row.subtasks || [],
          notes: row.notes || '',
          repeat: row.repeat || '',
          completed: row.completed,
          completedAt: row.completed_at || undefined,
          category: row.category || 'Personal'
        }));
        setTasks(cloudTasks);
      }
    } catch (err) {
      console.error('Error fetching cloud tasks:', err);
    }
  };

  useEffect(() => {
    localStorage.setItem('todoo_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Task reminders: check every 20s while the app is open
  const [notifPermission, setNotifPermission] = useState(webNotifier.getPermission());

  useEffect(() => {
    if (notifPermission !== 'granted') return;
    const check = () => takeDueTasks(tasks).forEach((t) => webNotifier.notify(t));
    check();
    const id = setInterval(check, 20_000);
    return () => clearInterval(id);
  }, [tasks, notifPermission]);

  const handleEnableNotifications = async () => {
    await webNotifier.requestPermission();
    setNotifPermission(webNotifier.getPermission());
  };

  const handleToggleTask = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const updatedCompleted = !task.completed;

    const completedAt = updatedCompleted ? new Date().toISOString() : undefined;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: updatedCompleted, completedAt } : t))
    );

    if (session && isSupabaseConfigured) {
      await supabase
        .from('tasks')
        .update({ completed: updatedCompleted, completed_at: completedAt ?? null })
        .eq('id', taskId);
    }
  };

  const handleAddTask = async (newTaskData: Omit<Task, 'id' | 'completed' | 'subtasks'>) => {
    const tempId = 'task_' + Date.now();
    const newTask: Task = {
      ...newTaskData,
      id: tempId,
      completed: false,
      subtasks: []
    };

    setTasks((prev) => [newTask, ...prev]);

    if (session && isSupabaseConfigured) {
      const { error } = await supabase.from('tasks').insert([
        {
          id: tempId,
          user_id: session.user.id,
          title: newTask.title,
          date: newTask.date,
          time: newTask.time,
          priority: newTask.priority,
          subtasks: newTask.subtasks,
          notes: newTask.notes,
          repeat: newTask.repeat,
          completed: newTask.completed,
          completed_at: newTask.completedAt ?? null,
          category: newTask.category
        }
      ]);

      if (error) console.error('Error inserting cloud task:', error);
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setSelectedTask(updatedTask);

    if (session && isSupabaseConfigured) {
      await supabase.from('tasks').update({
        title: updatedTask.title,
        date: updatedTask.date,
        time: updatedTask.time,
        priority: updatedTask.priority,
        subtasks: updatedTask.subtasks,
        notes: updatedTask.notes,
        repeat: updatedTask.repeat,
        completed: updatedTask.completed,
        completed_at: updatedTask.completedAt ?? null,
        category: updatedTask.category
      }).eq('id', updatedTask.id);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setSelectedTask(null);

    if (session && isSupabaseConfigured) {
      await supabase.from('tasks').delete().eq('id', taskId);
    }
  };

  const filteredTasks = searchQuery.trim()
    ? tasks.filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.category && t.category.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : tasks;

  const today = localDateString();
  const todayCount = tasks.filter((t) => t.date === today && !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {authLoading && (
        <div className="fixed inset-0 z-50 bg-slate-100 flex items-center justify-center text-sm text-slate-500">
          Cargando...
        </div>
      )}

      {isSupabaseConfigured && !authLoading && !session && !isGuest && (
        <AuthModal
          onSuccess={async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
          }}
          onContinueAsGuest={() => setIsGuest(true)}
        />
      )}

      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenNewTask={() => setIsNewTaskOpen(true)}
        completedCount={completedCount}
        todayCount={todayCount}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden pb-16 md:pb-0">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          notifPermission={notifPermission}
          onEnableNotifications={handleEnableNotifications}
          userEmail={session?.user?.email}
          userName={session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.name}
          avatarUrl={session?.user?.user_metadata?.avatar_url || session?.user?.user_metadata?.picture}
          onSignOut={
            isSupabaseConfigured
              ? async () => {
                  await supabase.auth.signOut();
                  setSession(null);
                  setIsGuest(false);
                }
              : undefined
          }
        />

        <main className="flex-1 overflow-y-auto">
          {currentView === 'hoy' && (
            <HoyView
              tasks={filteredTasks}
              onToggleTask={handleToggleTask}
              onSelectTask={setSelectedTask}
              onOpenNewTask={() => setIsNewTaskOpen(true)}
            />
          )}
          {currentView === 'proximas' && (
            <ProximasView
              tasks={filteredTasks}
              onToggleTask={handleToggleTask}
              onSelectTask={setSelectedTask}
            />
          )}
          {currentView === 'calendario' && (
            <CalendarioView
              tasks={filteredTasks}
              onToggleTask={handleToggleTask}
              onSelectTask={setSelectedTask}
              onOpenNewTask={() => setIsNewTaskOpen(true)}
            />
          )}
          {currentView === 'listas' && <ListasView tasks={filteredTasks} />}
          {currentView === 'completadas' && (
            <CompletadasView
              tasks={filteredTasks}
              onToggleTask={handleToggleTask}
              onSelectTask={setSelectedTask}
            />
          )}
        </main>
      </div>

      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onAddTask={handleAddTask}
      />

      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;
