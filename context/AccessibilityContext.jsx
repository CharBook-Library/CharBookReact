import React, { createContext, useContext, useState } from 'react';

const AccessibilityContext = createContext();

export const FONT_SCALES = {
  pequeño: 0.85,
  normal:  1.0,
  grande:  1.2,
  extra:   1.4,
};

export const THEME_DARK = {
  bg:          '#0F0E1A',
  surface:     '#1A1730',
  border:      '#2A2545',
  primary:     '#4B3FD8',
  secondary:   '#7C3AED',
  textPrimary: '#E8E2FF',
  textMuted:   '#7B6FA8',
  textSubtle:  '#4A4268',
  accent:      '#9E8FE8',
};

export const THEME_LIGHT = {
  bg:          '#F4F3FF',
  surface:     '#FFFFFF',
  border:      '#D6D3F0',
  primary:     '#4B3FD8',
  secondary:   '#7C3AED',
  textPrimary: '#1A1040',
  textMuted:   '#5A5278',
  textSubtle:  '#9E9AB8',
  accent:      '#4B3FD8',
};

export const THEME_CONTRAST = {
  bg:          '#000000',
  surface:     '#1A1A1A',
  border:      '#FFFFFF',
  primary:     '#FFD700',
  secondary:   '#FFD700',
  textPrimary: '#FFFFFF',
  textMuted:   '#FFFF00',
  textSubtle:  '#CCCCCC',
  accent:      '#FFD700',
};

export function AccessibilityProvider({ children }) {
  const [fontScale, setFontScale]       = useState('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode]         = useState(true);

  const theme = highContrast
    ? THEME_CONTRAST
    : darkMode ? THEME_DARK : THEME_LIGHT;

  const scaleFont = (size) => Math.round(size * FONT_SCALES[fontScale]);

  return (
    <AccessibilityContext.Provider value={{
      fontScale, setFontScale,
      highContrast, setHighContrast,
      darkMode, setDarkMode,
      theme, scaleFont,
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}