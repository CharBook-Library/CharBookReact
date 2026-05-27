import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { colors } from '../constants/colors';
import { FONT_SCALES, useAccessibility } from '../context/AccessibilityContext';

export default function ProfileScreen({ navigation, route }) {

  // USUARIO REAL
  const user = route?.params?.user || {
    name: 'Usuario',
    email: 'usuario@correo.com',
  };

  const { theme, fontScale, setFontScale, scaleFont, darkMode, setDarkMode, highContrast, setHighContrast } = useAccessibility();
  const [screenReader, setScreenReader] = useState(false);
  const [voiceNav, setVoiceNav] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (

    <ScrollView
      style={[s.screen, { backgroundColor: theme.bg }]}
      contentContainerStyle={[s.container, { backgroundColor: theme.bg }]}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}

      <View style={s.header}>

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <Text style={s.backBtn}>←</Text>
        </TouchableOpacity>

        <Text style={[s.headerTitle, { color: theme.textPrimary, fontSize: scaleFont(20) }] }>
          Mi Perfil
        </Text>

      </View>

      {/* PERFIL */}

      <View style={[s.profileCard, { backgroundColor: theme.surface, borderColor: theme.border }] }>

        <View style={s.avatar}>

          <Text style={s.avatarText}>
            {user.name.charAt(0).toUpperCase()}
          </Text>

        </View>

        <View style={s.profileInfo}>

          <Text style={[s.profileName, { color: theme.textPrimary, fontSize: scaleFont(18) }] }>
            {user.name}
          </Text>

          <Text style={[s.profileEmail, { color: theme.textMuted }] }>
            {user.email}
          </Text>

          <View style={s.planBadge}>
            <Text style={s.planBadgeText}>
              ⭐ Plan Premium
            </Text>
          </View>

        </View>

        <TouchableOpacity style={s.editBtn}>
          <Text style={s.editIcon}>✏️</Text>
        </TouchableOpacity>

      </View>

      {/* ESTADÍSTICAS */}

      <View style={s.statsRow}>

        {[
          {
            valor: '24',
            label: 'Libros\nleídos',
            icon: '📖',
          },
          {
            valor: '138',
            label: 'Horas\nescuchadas',
            icon: '🎧',
          },
          {
            valor: '7',
            label: 'Racha\ndías',
            icon: '🔥',
          },
        ].map((stat) => (

          <View
            key={stat.label}
            style={s.statCard}
          >

            <Text style={s.statIcon}>
              {stat.icon}
            </Text>

            <Text style={s.statValue}>
              {stat.valor}
            </Text>

            <Text style={s.statLabel}>
              {stat.label}
            </Text>

          </View>

        ))}

      </View>

      {/* ACCESIBILIDAD */}

<Text style={[s.sectionTitle, { color: theme.textPrimary }] }>
        ♿ Accesibilidad
      </Text>

      <View style={[s.card, { backgroundColor: theme.surface, borderColor: theme.border }] }>

        <Text style={[s.optLabel, { fontSize: scaleFont(13) }] }>
          Tamaño de texto
        </Text>

        <View style={s.fontRow} accessibilityRole="radiogroup">
          {Object.keys(FONT_SCALES).map(size => (
            <TouchableOpacity key={size}
              style={[s.fontBtn, fontScale === size && s.fontBtnActive]}
              onPress={() => setFontScale(size)}
              accessibilityRole="radio"
              accessibilityState={{ checked: fontScale === size }}
              accessibilityLabel={`Texto ${size}`}>
              <Text style={[s.fontBtnText,
                fontScale === size && s.fontBtnTextActive,
                { fontSize: scaleFont(11) }]}>
                {size === 'pequeño' ? 'A' :
                 size === 'normal'  ? 'A' :
                 size === 'grande'  ? 'A' : 'A'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[s.fontPreview, { fontSize: scaleFont(13) }]}>
          Vista previa del texto seleccionado
        </Text>

        <View style={s.divider} />

        {[
          {
            icon: '👁',
            label: 'Lector de pantalla',
            desc: 'Compatible con VoiceOver y TalkBack',
            value: screenReader,
            set: setScreenReader,
          },
          {
            icon: '◑',
            label: 'Alto contraste',
            desc: 'Mejora la visibilidad',
            value: highContrast,
            set: setHighContrast,
          },
          {
            icon: '🎙',
            label: 'Navegación por voz',
            desc: 'Controla la app con voz',
            value: voiceNav,
            set: setVoiceNav,
          },
        ].map((item) => (

          <View
            key={item.label}
            style={s.switchRow}
          >

            <Text style={s.switchIcon}>
              {item.icon}
            </Text>

            <View style={s.switchInfo}>

              <Text style={s.switchLabel}>
                {item.label}
              </Text>

              <Text style={s.switchDesc}>
                {item.desc}
              </Text>

            </View>

            <Switch
              value={item.value}
              onValueChange={item.set}
              trackColor={{
                false: colors.border,
                true: colors.primary,
              }}
              thumbColor={
                item.value
                  ? '#fff'
                  : colors.textSubtle
              }
            />

          </View>

        ))}

      </View>

      {/* PREFERENCIAS */}

<Text style={[s.sectionTitle, { color: theme.textPrimary }] }>
        ⚙️ Preferencias
      </Text>

      <View style={[s.card, { backgroundColor: theme.surface, borderColor: theme.border }] }>

        {[
          {
            icon: '🌙',
            label: 'Modo oscuro',
            desc: 'Tema oscuro para leer de noche',
            value: darkMode,
            set: setDarkMode,
          },
          {
            icon: '🔔',
            label: 'Notificaciones',
            desc: 'Alertas de nuevos libros',
            value: notifications,
            set: setNotifications,
          },
        ].map((item) => (

          <View
            key={item.label}
            style={s.switchRow}
          >

            <Text style={s.switchIcon}>
              {item.icon}
            </Text>

            <View style={s.switchInfo}>

              <Text style={s.switchLabel}>
                {item.label}
              </Text>

              <Text style={s.switchDesc}>
                {item.desc}
              </Text>

            </View>

            <Switch
              value={item.value}
              onValueChange={item.set}
              trackColor={{
                false: colors.border,
                true: colors.primary,
              }}
              thumbColor={
                item.value
                  ? '#fff'
                  : colors.textSubtle
              }
            />

          </View>

        ))}

      </View>

      {/* CUENTA */}

<Text style={[s.sectionTitle, { color: theme.textPrimary }] }>
        👤 Cuenta
      </Text>

      <View style={[s.card, { backgroundColor: theme.surface, borderColor: theme.border }] }>

        {[
          {
            icon: '🔒',
            label: 'Cambiar contraseña',
            color: colors.textPrimary,
          },
          {
            icon: '📱',
            label: 'Dispositivos activos',
            color: colors.textPrimary,
          },
          {
            icon: '📄',
            label: 'Términos y privacidad',
            color: colors.textPrimary,
          },
          {
            icon: '🚪',
            label: 'Cerrar sesión',
            color: '#E24B4A',
          },
        ].map((item) => (

          <TouchableOpacity
            key={item.label}
            style={s.menuItem}
            onPress={() => {

              if (item.label === 'Cerrar sesión') {

                navigation.replace('Login');

              }

            }}
          >

            <Text style={s.menuIcon}>
              {item.icon}
            </Text>

            <Text
              style={[
                s.menuLabel,
                { color: item.color },
              ]}
            >
              {item.label}
            </Text>

            <Text style={s.menuArrow}>
              ›
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      <Text style={s.version}>
        CharBook Library v1.0.0
      </Text>

    </ScrollView>
  );
}

const s = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  container: {
    padding: 24,
    paddingBottom: 50,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
    marginTop: 10,
  },

  backBtn: {
    color: colors.textPrimary,
    fontSize: 28,
  },

  headerTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    gap: 14,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  profileInfo: {
    flex: 1,
  },

  profileName: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },

  profileEmail: {
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 13,
  },

  planBadge: {
    marginTop: 8,
    backgroundColor: colors.bg,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },

  planBadgeText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '600',
  },

  editBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editIcon: {
    fontSize: 16,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  statCard: {
    width: '31%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },

  statIcon: {
    fontSize: 24,
    marginBottom: 6,
  },

  statValue: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
  },

  statLabel: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
  },

  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },

  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 16,
    marginBottom: 22,
  },

  optLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },

  fontRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },

  fontBtn: {
    flex: 1,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  fontBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  fontBtnText: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: '700',
  },

  fontBtnTextActive: {
    color: '#fff',
  },

  fontPreview: {
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: 13,
    fontStyle: 'italic',
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },

  switchIcon: {
    fontSize: 20,
    width: 28,
    textAlign: 'center',
  },

  switchInfo: {
    flex: 1,
  },

  switchLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },

  switchDesc: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  menuIcon: {
    fontSize: 18,
    width: 28,
    textAlign: 'center',
  },

  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },

  menuArrow: {
    color: colors.textSubtle,
    fontSize: 22,
  },

  version: {
    textAlign: 'center',
    color: colors.textSubtle,
    fontSize: 11,
    marginTop: 6,
  },

});