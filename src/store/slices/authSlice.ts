import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  // Onboarding fields
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  tractorBrand?: string;
  tractorModel?: string;
  tractorRegNo?: string;
  tractorYearWeight?: string;
  tractorPurchaseYear?: string;
  tractorType?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{token: string; user: User}>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      } else {
        // Handle case where user is not yet set (initial onboarding)
        state.user = action.payload as User;
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {setCredentials, updateUser, logout} = authSlice.actions;
export default authSlice.reducer;
