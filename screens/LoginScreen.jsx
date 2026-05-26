import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, AccessibilityInfo,
} from 'react-native';
import { colors } from '../constants/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [tab, setTab]           = useState('correo');

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.container}
      keyboardShouldPersistTaps="handled">

      {/* Logo */}
      <View style={s.logoArea} accessible accessibilityLabel="CharBook, tu biblioteca inteligente">
        <View style={s.logoBox}>
          <Text style={s.logoIcon}>📚</Text>
        </View>
        <Text style={s.appName}>CharBook</Text>
        <Text style={s.tagline}>Tu biblioteca inteligente</Text>
      </View>

      <Text style={s.welcome}>Bienvenido de vuelta</Text>
      <Text style={s.welcomeSub}>Inicia sesión para continuar leyendo</Text>

      {/* Tabs */}
      <View style={s.tabRow} accessibilityRole="tablist">
        {['correo', 'teléfono'].map(t => (
          <TouchableOpacity key={t} style={[s.tab, tab === t && s.tabActive]}
            onPress={() => setTab(t)}
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === t }}
            accessibilityLabel={`Iniciar sesión con ${t}`}>
            <Text style={[s.tabText, tab === t && s.tabTextActive]}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Social */}
      <TouchableOpacity style={s.socialBtn}
        accessibilityRole="button"
        accessibilityLabel="Continuar con Google">
        <Text style={s.socialText}>🔵  Continuar con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.socialBtn}
        accessibilityRole="button"
        accessibilityLabel="Continuar con Facebook">
        <Text style={s.socialText}>🔷  Continuar con Facebook</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={s.divider}>
        <View style={s.divLine} />
        <Text style={s.divText}>o con tu correo</Text>
        <View style={s.divLine} />
      </View>

      {/* Email */}
      <Text style={s.label}>Correo electrónico</Text>
      <TextInput style={s.input}
        value={email} onChangeText={setEmail}
        placeholder="usuario@correo.com"
        placeholderTextColor={colors.textSubtle}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="Correo electrónico"
        accessibilityHint="Ingresa tu correo registrado"
        returnKeyType="next" />

      {/* Password */}
      <Text style={s.label}>Contraseña</Text>
      <View style={s.inputWrap}>
        <TextInput style={[s.input, { paddingRight: 44 }]}
          value={password} onChangeText={setPassword}
          placeholder="••••••••"
          placeholderTextColor={colors.textSubtle}
          secureTextEntry={!showPass}
          accessibilityLabel="Contraseña"
          accessibilityHint="Ingresa tu contraseña"
          returnKeyType="done" />
        <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPass(!showPass)}
          accessibilityLabel={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
          <Text style={s.eyeIcon}>{showPass ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={s.forgot}
        accessibilityRole="link"
        accessibilityLabel="Recuperar contraseña olvidada">
        <Text style={s.forgotText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* Botón principal */}
      <TouchableOpacity style={s.btnPrimary}
        onPress={() => navigation.navigate('Home')}
        accessibilityRole="button"
        accessibilityLabel="Iniciar sesión">
        <Text style={s.btnText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* Registro */}
      <View style={s.registerRow}>
        <Text style={s.registerText}>¿No tienes cuenta? </Text>
        <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            accessibilityRole="link"
            accessibilityLabel="Ir a registro">
            <Text style={s.registerLink}>Regístrate gratis</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de accesibilidad */}
      <View style={s.accBar} accessibilityRole="toolbar"
        accessibilityLabel="Opciones de accesibilidad">
        {[
          { icon: '👁', label: 'Lector' },
          { icon: '🔤', label: 'Texto' },
          { icon: '◑',  label: 'Contraste' },
          { icon: '🎙', label: 'Voz' },
        ].map(item => (
          <TouchableOpacity key={item.label} style={s.accBtn}
            accessibilityRole="button"
            accessibilityLabel={`Activar ${item.label}`}>
            <Text style={s.accIcon}>{item.icon}</Text>
            <Text style={s.accLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen:      { flex: 1, backgroundColor: colors.bg },
  container:   { padding: 24, paddingBottom: 40 },
  logoArea:    { alignItems: 'center', paddingVertical: 24 },
  logoBox:     { width: 64, height: 64, backgroundColor: colors.primary,
                 borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  logoIcon:    { fontSize: 28 },
  appName:     { fontSize: 18, fontWeight: '600', color: colors.textPrimary },
  tagline:     { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  welcome:     { fontSize: 22, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  welcomeSub:  { fontSize: 13, color: colors.textMuted, marginBottom: 20 },
  tabRow:      { flexDirection: 'row', gap: 8, marginBottom: 20 },
  tab:         { flex: 1, padding: 9, borderRadius: 10, borderWidth: 1,
                 borderColor: colors.border, alignItems: 'center' },
  tabActive:   { backgroundColor: colors.surface, borderColor: colors.primary },
  tabText:     { fontSize: 13, color: colors.textMuted },
  tabTextActive: { color: colors.textPrimary, fontWeight: '500' },
  socialBtn:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                 padding: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
                 backgroundColor: colors.surface, marginBottom: 10 },
  socialText:  { fontSize: 13, color: colors.textPrimary },
  divider:     { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 12 },
  divLine:     { flex: 1, height: 1, backgroundColor: colors.border },
  divText:     { fontSize: 11, color: colors.textSubtle },
  label:       { fontSize: 11, fontWeight: '500', color: colors.textMuted,
                 textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  input:       { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
                 borderRadius: 12, padding: 12, color: colors.textPrimary,
                 fontSize: 14, marginBottom: 14 },
  inputWrap:   { position: 'relative' },
  eyeBtn:      { position: 'absolute', right: 12, top: 12 },
  eyeIcon:     { fontSize: 16 },
  forgot:      { alignSelf: 'flex-end', marginBottom: 18, marginTop: -8 },
  forgotText:  { fontSize: 12, color: colors.accent },
  btnPrimary:  { backgroundColor: colors.primary, borderRadius: 14,
                 padding: 15, alignItems: 'center', marginBottom: 16 },
  btnText:     { color: '#fff', fontSize: 15, fontWeight: '600' },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  registerText:{ fontSize: 13, color: colors.textMuted },
  registerLink:{ fontSize: 13, color: colors.accent, fontWeight: '500' },
  accBar:      { flexDirection: 'row', justifyContent: 'center', gap: 24,
                 paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border },
  accBtn:      { alignItems: 'center', gap: 4 },
  accIcon:     { fontSize: 20 },
  accLabel:    { fontSize: 9, color: colors.textSubtle },
});