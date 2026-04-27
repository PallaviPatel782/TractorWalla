import { create } from 'zustand';

export type SnackbarType = 'success' | 'error' | 'info' | 'warning';

export interface SnackbarMessage {
  id: string;
  type: SnackbarType;
  title: string;
  description?: string;
  duration?: number;
}

interface SnackbarState {
  queue: SnackbarMessage[];
  showSnackbar: (message: Omit<SnackbarMessage, 'id'>) => void;
  hideSnackbar: (id: string) => void;
}

let lastShownAt = 0;

export const useSnackbarStore = create<SnackbarState>(set => ({
  queue: [],

  showSnackbar: message => {
    const now = Date.now();

    // Prevent duplicate spamming of the same message within a short window
    if (now - lastShownAt < 800) return;

    lastShownAt = now;

    const id = now.toString() + Math.random().toString();
    const defaultDuration = 3000;

    set(state => {
      const current = state.queue[0];

      const isSame = (item?: SnackbarMessage) =>
        item &&
        item.title === message.title &&
        item.description === message.description &&
        item.type === message.type;

      if (isSame(current)) return state;

      if (state.queue.some(isSame)) return state;

      return {
        queue: [
          ...state.queue,
          { ...message, id, duration: message.duration || defaultDuration },
        ],
      };
    });
  },
  hideSnackbar: id =>
    set(state => ({
      queue: state.queue.filter(item => item.id !== id),
    })),
}));
