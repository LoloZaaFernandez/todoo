import type { Task } from './types';

export interface Notifier {
  isSupported(): boolean;
  getPermission(): 'granted' | 'denied' | 'default' | 'unsupported';
  requestPermission(): Promise<boolean>;
  notify(task: Task): void;
}

const FIRED_KEY = 'todoo_notified';
const REMINDER_WINDOW_MIN = 10;

export const localDateString = (d = new Date()): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const localTimeString = (d = new Date()): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// Web implementation. Swap this object for a Capacitor LocalNotifications one when packaging the APK.
export const webNotifier: Notifier = {
  isSupported: () => typeof window !== 'undefined' && 'Notification' in window,
  getPermission: () => (webNotifier.isSupported() ? Notification.permission : 'unsupported'),
  requestPermission: async () => {
    if (!webNotifier.isSupported()) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    return (await Notification.requestPermission()) === 'granted';
  },
  notify: (task) => {
    if (!webNotifier.isSupported() || Notification.permission !== 'granted') return;
    new Notification(`⏰ ${task.title}`, {
      body: task.time ? `Es hora: ${task.time}` : 'Tienes una tarea pendiente',
      tag: task.id,
    });
    playBeep();
  },
};

function playBeep() {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch {
    // Audio can be blocked before user interaction; the visual notification still shows.
  }
}

const loadFired = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem(FIRED_KEY) || '{}');
  } catch {
    return {};
  }
};

/** Returns tasks due right now that have not been notified yet, and marks them as notified. */
export function takeDueTasks(tasks: Task[], now = new Date()): Task[] {
  const today = localDateString(now);
  const time = localTimeString(now);
  const fired = loadFired();

  const toMinutes = (hhmm: string) => {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  };
  const nowMin = toMinutes(time);

  // Only fire inside a short window, so opening the app late doesn't replay the whole morning.
  const due = tasks.filter(
    (t) =>
      !t.completed &&
      t.time &&
      t.date === today &&
      toMinutes(t.time) <= nowMin &&
      nowMin - toMinutes(t.time) <= REMINDER_WINDOW_MIN &&
      fired[t.id] !== `${t.date} ${t.time}`
  );

  if (due.length > 0) {
    // Keep only today's entries so the store doesn't grow forever.
    const next: Record<string, string> = {};
    for (const [id, stamp] of Object.entries(fired)) {
      if (stamp.startsWith(today)) next[id] = stamp;
    }
    for (const t of due) next[t.id] = `${t.date} ${t.time}`;
    try {
      localStorage.setItem(FIRED_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  }
  return due;
}
