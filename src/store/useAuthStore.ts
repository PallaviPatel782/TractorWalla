import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';

export interface Address {
  id: string;
  label: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface User {
  id?: string;
  _id?: string;
  phone: string;
  role: string;
  name?: string;
  email?: string;
  profileImage?: string;
  onboardingCompleted?: boolean;
  addresses?: Address[];
  tractors?: any[];
  address?: string;
  state?: string;
  pincode?: string;
}

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      setToken: (token) => set({ token }),
      setTokens: (token, refreshToken) => set({ token, refreshToken }),
      setUser: (user) => {
        const normalizedUser = user ? { ...user, _id: user.id || user._id } : null;
        console.log('--- Store SetUser ---', normalizedUser);
        set({ user: normalizedUser });
      },
      updateUser: (updates) => set((state) => {
        if (!state.user) return { user: null };
        
        const newUpdates = { ...updates };
        if (updates.id && !updates._id) newUpdates._id = updates.id;
        
        // Preserve tractors if the update brings an empty or missing list but we already have data
        if (state.user.tractors && state.user.tractors.length > 0 && (!updates.tractors || updates.tractors.length === 0)) {
          delete newUpdates.tractors;
        }

        const newUser = { ...state.user, ...newUpdates };
        console.log('--- Store UpdateUser ---', { updates, result: newUser });
        return { user: newUser };
      }),
      logout: () => set({ token: null, refreshToken: null, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
