import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Tractor {
  id: string;
  brand: string;
  model: string;
  registrationNo: string;
  yearOfManufacture: string;
  yearOfPurchase: string;
  tractorType: string;
}

export interface Address {
  id: string;
  label: string;
  address: string;
}

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
  tractors?: Tractor[];
  addresses?: Address[];
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
    addTractor: (state, action: PayloadAction<Tractor>) => {
      if (state.user) {
        if (!state.user.tractors) {
          state.user.tractors = [];
        }
        state.user.tractors.push(action.payload);
      }
    },
    updateTractor: (state, action: PayloadAction<Tractor>) => {
      if (state.user && state.user.tractors) {
        const index = state.user.tractors.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.user.tractors[index] = action.payload;
        }
      }
    },
    deleteTractor: (state, action: PayloadAction<string>) => {
      if (state.user && state.user.tractors) {
        state.user.tractors = state.user.tractors.filter(t => t.id !== action.payload);
      }
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      if (state.user) {
        if (!state.user.addresses) {
          state.user.addresses = [];
        }
        state.user.addresses.push(action.payload);
      }
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      if (state.user && state.user.addresses) {
        const index = state.user.addresses.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.user.addresses[index] = action.payload;
        }
      }
    },
    deleteAddress: (state, action: PayloadAction<string>) => {
      if (state.user && state.user.addresses) {
        state.user.addresses = state.user.addresses.filter(a => a.id !== action.payload);
      }
    },
    completeOnboarding: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setCredentials,
  updateUser,
  addTractor,
  updateTractor,
  deleteTractor,
  addAddress,
  updateAddress,
  deleteAddress,
  completeOnboarding,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
