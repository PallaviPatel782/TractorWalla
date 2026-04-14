// theme/ThemeProvider.tsx

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useColorScheme } from 'react-native';
import { theme, AppTheme } from './index';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: AppTheme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme(); // device theme
  const [mode, setMode] = useState<ThemeMode>(systemScheme ?? 'light');

  // sync with system change
  useEffect(() => {
    if (systemScheme) {
      setMode(systemScheme);
    }
  }, [systemScheme]);

  const toggleTheme = () => {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo(() => {
    return {
      theme: theme(mode),
      mode,
      setMode,
      toggleTheme,
    };
  }, [mode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
};


// const { toggleTheme, mode } = useTheme();

// <Button
//   title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'}`}
//   onPress={toggleTheme}
// />