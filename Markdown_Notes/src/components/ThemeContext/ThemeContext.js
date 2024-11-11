import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;  // Применяем тему к `body`
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    document.body.setAttribute('data-theme', theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Хук для использования контекста
export const useTheme = () => useContext(ThemeContext);
