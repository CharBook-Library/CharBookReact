import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, ScrollView, Switch,
} from 'react-native';
import { colors } from '../constants/colors';

export default function ProfileScreen() {
  const [fontSize, setFontSize]         = useState('normal');
  const [screenReader, setScreenReader] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [voiceNav, setVoiceNav]         = useState(false);
  const [darkMode, setDarkMode]         = useState(true);
  const [notifications, setNotifications] = useState(true);

  const FONT_SIZES = ['pequeño', 'normal', 'grande', 'extra'];

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.container}
      showsVerticalScrollIndicator={false}>

      {/* Header perfil */}
      <View style={s.profileCard}
        accessible
        accessibilityLabel="Perfil de Jafet Serrano, estudiante de ingeniería">
        <View style={s.avatar}>
          <Text style={s.avatarText}>JS</Text>
        </View>
        <View style={s.profileInfo}>
          <Text style={s.profileName}>Jafet Serrano</Text>
          <Text style={s.profileEmail}>jafet@correo.com</Text>
          <View style={s.planBadge}>
            <Text style={s.planBadgeText}>⭐ Plan Suscripción</Text>
          </View>
        </View>
        <TouchableOpacity style={s.editBtn}
          accessibilityRole="button"
          accessibilityLabel="Editar perfil">
          <Text style={s.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* Estadísticas */}
      <View style={s.statsRow}>
        {[
          { valor: '24',  label: 'Libros\nleídos',    icon: '📖' },
          { valor: '138', label: 'Horas\nescuchadas', icon: '🎧' },
          { valor: '7',   label: 'Racha\ndías',       icon: '🔥' },
        ].map(stat => (
          <View key={stat.label} style={s.statCard}
            accessible
            accessibilityLabel={`${stat.valor} ${stat.label.replace('\n', ' ')}`}>
            <Text style={s.statIcon}>{stat.icon}</Text>
            <Text style={s.statValue}>{stat.valor}</Text>
            <Text style={s.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Accesibilidad */}
      <Text style={s.sectionTitle}>♿ Accesibilidad</Text>
      <View style={s.card}>

        {/* Tamaño de texto */}
        <Text style={s.optLabel}
          accessibilityRole="header">
          Tamaño de texto
        </Text>
        <View style={s.fontRow} accessibilityRole="radiogroup"
          accessibilityLabel="Selecciona el tamaño de texto">
          {FONT_SIZES.map(size => (
            <TouchableOpacity key={size}
              style={[s.fontBtn, fontSize === size && s.fontBtnActive]}
              onPress={() => setFontSize(size)}
              accessibilityRole="radio"
              accessibilityState={{ checked: fontSize === size }}
              accessibilityLabel={`Texto ${size}`}>
              <Text style={[s.fontBtnText, fontSize === size && s.fontBtnTextActive]}>
                {size === 'pequeño' ? 'A' :
                 size === 'normal'  ? 'A' :
                 size === 'grande'  ? 'A' : 'A'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={s.fontPreview}
          accessibilityLabel={`Vista previa con texto ${fontSize}`}>
          Vista previa del texto seleccionado
        </Text>

        <View style={s.divider} />

        {/* Switches de accesibilidad */}
        {[
          {
            icon: '👁',
            label: 'Lector de pantalla',
            desc:  'Compatible con VoiceOver y TalkBack',
            value: screenReader,
            set:   setScreenReader,
          },
          {
            icon: '◑',
            label: 'Alto contraste',
            desc:  'Mejora la visibilidad del contenido',
            value: highContrast,
            set:   setHighContrast,
          },
          {
            icon: '🎙',
            label: 'Navegación por voz',
            desc:  'Controla la app con comandos de voz',
            value: voiceNav,
            set:   setVoiceNav,
          },
        ].map(item => (
          <View key={item.label} style={s.switchRow}>
            <Text style={s.switchIcon}>{item.icon}</Text>
            <View style={s.switchInfo}>
              <Text style={s.switchLabel}>{item.label}</Text>
              <Text style={s.switchDesc}>{item.desc}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.set}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={item.value ? '#fff' : colors.textSubtle}
              accessibilityLabel={item.label}
              accessibilityRole="switch"
              accessibilityState={{ checked: item.value }} />
          </View>
        ))}
      </View>

      {/* Preferencias */}
      <Text style={s.sectionTitle}>⚙️ Preferencias</Text>
      <View style={s.card}>
        {[
          {
            icon: '🌙',
            label: 'Modo oscuro',
            desc:  'Tema oscuro para leer de noche',
            value: darkMode,
            set:   setDarkMode,
          },
          {
            icon: '🔔',
            label: 'Notificaciones',
            desc:  'Recibe alertas de nuevos libros',
            value: notifications,
            set:   setNotifications,
          },
        ].map(item => (
          <View key={item.label} style={s.switchRow}>
            <Text style={s.switchIcon}>{item.icon}</Text>
            <View style={s.switchInfo}>
              <Text style={s.switchLabel}>{item.label}</Text>
              <Text style={s.switchDesc}>{item.desc}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.set}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={item.value ? '#fff' : colors.textSubtle}
              accessibilityLabel={item.label}
              accessibilityRole="switch"
              accessibilityState={{ checked: item.value }} />
          </View>
        ))}
      </View>

      {/* Cuenta */}
      <Text style={s.sectionTitle}>👤 Cuenta</Text>
      <View style={s.card}>
{[
  { icon: '🔒', label: 'Cambiar contraseña',   color: colors.textPrimary },
  { icon: '📱', label: 'Dispositivos activos',  color: colors.textPrimary },
  { icon: '📄', label: 'Términos y privacidad', color: colors.textPrimary },
  { icon: '🚪', label: 'Cerrar sesión',         color: '#E24B4A'          },
].map(item => (
  <TouchableOpacity key={item.label} style={s.menuItem}
    onPress={() => item.label === 'Cerrar sesión'
      ? navigation.navigate('Login')
      : null}
    accessibilityRole="button"
    accessibilityLabel={item.label}>
    <Text style={s.menuIcon}>{item.icon}</Text>
    <Text style={[s.menuLabel, { color: item.color }]}>{item.label}</Text>
    <Text style={s.menuArrow}>›</Text>
  </TouchableOpacity>
))}
      </View>

      <Text style={s.version}>CharBook Library v1.0.0 · SDK 54</Text>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen:           { flex: 1, backgroundColor: colors.bg },
  container:        { padding: 24, paddingBottom: 48 },
  profileCard:      { flexDirection: 'row', alignItems: 'center',
                      backgroundColor: colors.surface, borderWidth: 1,
                      borderColor: colors.border, borderRadius: 16,
                      padding: 16, marginBottom: 16, gap: 14 },
  avatar:           { width: 56, height: 56, borderRadius: 28,
                      backgroundColor: colors.primary,
                      alignItems: 'center', justifyContent: 'center' },
  avatarText:       { color: '#fff', fontSize: 20, fontWeight: '700' },
  profileInfo:      { flex: 1, gap: 3 },
  profileName:      { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  profileEmail:     { fontSize: 12, color: colors.textMuted },
  planBadge:        { backgroundColor: colors.bg, borderRadius: 6,
                      paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' },
  planBadgeText:    { fontSize: 10, color: colors.accent },
  editBtn:          { width: 36, height: 36, backgroundColor: colors.bg,
                      borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  editIcon:         { fontSize: 16 },
  statsRow:         { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard:         { flex: 1, backgroundColor: colors.surface, borderWidth: 1,
                      borderColor: colors.border, borderRadius: 12,
                      padding: 12, alignItems: 'center', gap: 4 },
  statIcon:         { fontSize: 20 },
  statValue:        { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  statLabel:        { fontSize: 10, color: colors.textMuted, textAlign: 'center' },
  sectionTitle:     { fontSize: 15, fontWeight: '600', color: colors.textPrimary,
                      marginBottom: 10 },
  card:             { backgroundColor: colors.surface, borderWidth: 1,
                      borderColor: colors.border, borderRadius: 16,
                      padding: 16, marginBottom: 20 },
  optLabel:         { fontSize: 13, fontWeight: '500', color: colors.textPrimary,
                      marginBottom: 10 },
  fontRow:          { flexDirection: 'row', gap: 8, marginBottom: 12 },
  fontBtn:          { flex: 1, backgroundColor: colors.bg, borderWidth: 1,
                      borderColor: colors.border, borderRadius: 10,
                      paddingVertical: 10, alignItems: 'center' },
  fontBtnActive:    { backgroundColor: colors.primary, borderColor: colors.primary },
  fontBtnText:      { color: colors.textMuted, fontWeight: '600' },
  fontBtnTextActive:{ color: '#fff' },
  fontPreview:      { fontSize: 13, color: colors.textMuted,
                      textAlign: 'center', fontStyle: 'italic' },
  divider:          { height: 1, backgroundColor: colors.border,
                      marginVertical: 14 },
  switchRow:        { flexDirection: 'row', alignItems: 'center',
                      gap: 12, paddingVertical: 10 },
  switchIcon:       { fontSize: 20, width: 28, textAlign: 'center' },
  switchInfo:       { flex: 1, gap: 2 },
  switchLabel:      { fontSize: 14, fontWeight: '500', color: colors.textPrimary },
  switchDesc:       { fontSize: 11, color: colors.textMuted },
  menuItem:         { flexDirection: 'row', alignItems: 'center',
                      gap: 12, paddingVertical: 12,
                      borderBottomWidth: 1, borderBottomColor: colors.border },
  menuIcon:         { fontSize: 18, width: 28, textAlign: 'center' },
  menuLabel:        { flex: 1, fontSize: 14 },
  menuArrow:        { fontSize: 20, color: colors.textSubtle },
  version:          { textAlign: 'center', fontSize: 11,
                      color: colors.textSubtle, marginTop: 4 },
});