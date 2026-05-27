import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAccessibility, FONT_SCALES } from '../context/AccessibilityContext';

const FONT_OPTIONS = ['pequeño', 'normal', 'grande', 'extra'];

export default function AccessibilityBar() {
  const { fontScale, setFontScale, scaleFont,
          highContrast, setHighContrast,
          darkMode, setDarkMode, theme } = useAccessibility();

  return (
    <View style={[s.container, { borderTopColor: theme.border }]}>

      {/* Tamaño de texto */}
      <View style={s.row}>
        <Text style={[s.rowLabel, { color: theme.textMuted, fontSize: scaleFont(11) }]}>
          🔤 Texto
        </Text>
        <View style={s.controls}>
          <TouchableOpacity
            style={[s.btn, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={() => {
              const idx = FONT_OPTIONS.indexOf(fontScale);
              if (idx > 0) setFontScale(FONT_OPTIONS[idx - 1]);
            }}
            disabled={fontScale === 'pequeño'}
            accessibilityRole="button"
            accessibilityLabel="Reducir tamaño de texto">
            <Text style={[s.btnText,
              { color: fontScale === 'pequeño' ? theme.textSubtle : theme.textPrimary }]}>
              A−
            </Text>
          </TouchableOpacity>

          <View style={s.dotsRow}>
            {FONT_OPTIONS.map(opt => (
              <TouchableOpacity key={opt}
                onPress={() => setFontScale(opt)}
                accessibilityRole="radio"
                accessibilityState={{ checked: fontScale === opt }}
                accessibilityLabel={`Texto ${opt}`}>
                <View style={[s.dot, { backgroundColor: theme.border },
                  fontScale === opt && { backgroundColor: theme.primary,
                  width: 10, height: 10, borderRadius: 5 }]} />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[s.btn, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={() => {
              const idx = FONT_OPTIONS.indexOf(fontScale);
              if (idx < FONT_OPTIONS.length - 1) setFontScale(FONT_OPTIONS[idx + 1]);
            }}
            disabled={fontScale === 'extra'}
            accessibilityRole="button"
            accessibilityLabel="Aumentar tamaño de texto">
            <Text style={[s.btnText,
              { color: fontScale === 'extra' ? theme.textSubtle : theme.textPrimary }]}>
              A+
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Alto contraste */}
      <View style={s.row}>
        <Text style={[s.rowLabel, { color: theme.textMuted, fontSize: scaleFont(11) }]}>
          ◑ Contraste
        </Text>
        <TouchableOpacity
          style={[s.toggleBtn, { borderColor: highContrast ? theme.primary : theme.border },
            highContrast && { backgroundColor: theme.primary }]}
          onPress={() => setHighContrast(!highContrast)}
          accessibilityRole="switch"
          accessibilityState={{ checked: highContrast }}
          accessibilityLabel={highContrast ? 'Desactivar alto contraste' : 'Activar alto contraste'}>
          <Text style={[s.toggleText,
            { color: highContrast ? '#000' : theme.textMuted }]}>
            {highContrast ? '✓ Activo' : 'Activar'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modo oscuro / claro */}
      <View style={s.row}>
        <Text style={[s.rowLabel, { color: theme.textMuted, fontSize: scaleFont(11) }]}>
          {darkMode ? '🌙 Oscuro' : '☀️ Claro'}
        </Text>
        <TouchableOpacity
          style={[s.modeRow, { backgroundColor: theme.surface, borderColor: theme.border }]}
          onPress={() => setDarkMode(!darkMode)}
          accessibilityRole="switch"
          accessibilityState={{ checked: darkMode }}
          accessibilityLabel={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}>
          <View style={[s.modeThumb,
            { backgroundColor: theme.primary },
            !darkMode && s.modeThumbRight]} />
          <Text style={[s.modeLabel, s.modeLabelLeft,
            { color: darkMode ? '#fff' : theme.textSubtle }]}>🌙</Text>
          <Text style={[s.modeLabel, s.modeLabelRight,
            { color: !darkMode ? theme.primary : theme.textSubtle }]}>☀️</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const s = StyleSheet.create({
  container:     { borderTopWidth: 1, paddingTop: 14, gap: 14 },
  row:           { flexDirection: 'row', alignItems: 'center',
                   justifyContent: 'space-between' },
  rowLabel:      { fontWeight: '500', letterSpacing: 0.5 },
  controls:      { flexDirection: 'row', alignItems: 'center', gap: 10 },
  btn:           { width: 36, height: 36, borderWidth: 1, borderRadius: 10,
                   alignItems: 'center', justifyContent: 'center' },
  btnText:       { fontSize: 13, fontWeight: '600' },
  dotsRow:       { flexDirection: 'row', gap: 7, alignItems: 'center' },
  dot:           { width: 8, height: 8, borderRadius: 4 },
  toggleBtn:     { paddingHorizontal: 14, paddingVertical: 8,
                   borderWidth: 1, borderRadius: 10 },
  toggleText:    { fontSize: 12, fontWeight: '500' },
  modeRow:       { width: 72, height: 34, borderRadius: 17, borderWidth: 1,
                   flexDirection: 'row', alignItems: 'center',
                   justifyContent: 'space-between', paddingHorizontal: 6,
                   position: 'relative' },
  modeThumb:     { position: 'absolute', left: 4, width: 26, height: 26,
                   borderRadius: 13 },
  modeThumbRight:{ left: undefined, right: 4 },
  modeLabel:     { fontSize: 14, zIndex: 1 },
  modeLabelLeft: { marginLeft: 2 },
  modeLabelRight:{ marginRight: 2 },
});