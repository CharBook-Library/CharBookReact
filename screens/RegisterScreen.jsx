import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView,
} from 'react-native';
import { colors } from '../constants/colors';

export default function RegisterScreen({ navigation }) {
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [showConf, setShowConf]   = useState(false);
  const [accepted, setAccepted]   = useState(false);

  const passwordMatch = password === confirm && confirm.length > 0;

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.container}
      keyboardShouldPersistTaps="handled">

      {/* Header */}
      <View style={s.header} accessible
        accessibilityLabel="Crear cuenta en BiblioIA">
        <View style={s.logoBox} aria-hidden>
          <Text style={s.logoIcon}>📚</Text>
        </View>
        <Text style={s.title}>Crear cuenta</Text>
        <Text style={s.subtitle}>Únete y empieza a leer hoy</Text>
      </View>

      {/* Nombre */}
      <Text style={s.label}>Nombre completo</Text>
      <View style={s.inputWrap}>
        <TextInput style={s.input}
          value={name} onChangeText={setName}
          placeholder="Tu nombre y apellido"
          placeholderTextColor={colors.textSubtle}
          autoCapitalize="words"
          accessibilityLabel="Nombre completo"
          accessibilityHint="Ingresa tu nombre y apellido"
          returnKeyType="next" />
        <Text style={s.fieldIcon}>👤</Text>
      </View>

      {/* Correo */}
      <Text style={s.label}>Correo electrónico</Text>
      <View style={s.inputWrap}>
        <TextInput style={s.input}
          value={email} onChangeText={setEmail}
          placeholder="usuario@correo.com"
          placeholderTextColor={colors.textSubtle}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Correo electrónico"
          accessibilityHint="Ingresa un correo válido"
          returnKeyType="next" />
        <Text style={s.fieldIcon}>✉️</Text>
      </View>

      {/* Contraseña */}
      <Text style={s.label}>Contraseña</Text>
      <View style={s.inputWrap}>
        <TextInput style={s.input}
          value={password} onChangeText={setPassword}
          placeholder="Mínimo 8 caracteres"
          placeholderTextColor={colors.textSubtle}
          secureTextEntry={!showPass}
          accessibilityLabel="Contraseña"
          accessibilityHint="Mínimo 8 caracteres"
          returnKeyType="next" />
        <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPass(!showPass)}
          accessibilityLabel={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
          <Text style={s.eyeIcon}>{showPass ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      {/* Indicador de fuerza */}
      <View style={s.strengthRow}>
        {['débil', 'media', 'fuerte'].map((level, i) => (
          <View key={level} style={[
            s.strengthBar,
            password.length >= (i + 1) * 4
              ? i === 0 ? s.strengthWeak
              : i === 1 ? s.strengthMed
              : s.strengthStrong
              : s.strengthEmpty
          ]} />
        ))}
        <Text style={s.strengthLabel}>
          {password.length === 0 ? '' :
           password.length < 5 ? 'Débil' :
           password.length < 9 ? 'Media' : 'Fuerte'}
        </Text>
      </View>

      {/* Confirmar contraseña */}
      <Text style={s.label}>Confirmar contraseña</Text>
      <View style={s.inputWrap}>
        <TextInput style={[s.input,
          confirm.length > 0 && { borderColor: passwordMatch ? '#3B6D11' : '#A32D2D' }]}
          value={confirm} onChangeText={setConfirm}
          placeholder="Repite tu contraseña"
          placeholderTextColor={colors.textSubtle}
          secureTextEntry={!showConf}
          accessibilityLabel="Confirmar contraseña"
          accessibilityHint="Repite la contraseña anterior"
          returnKeyType="done" />
        <TouchableOpacity style={s.eyeBtn} onPress={() => setShowConf(!showConf)}
          accessibilityLabel={showConf ? 'Ocultar confirmación' : 'Mostrar confirmación'}>
          <Text style={s.eyeIcon}>{showConf ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>
      {confirm.length > 0 && (
        <Text style={[s.matchMsg, { color: passwordMatch ? '#639922' : '#E24B4A' }]}>
          {passwordMatch ? '✓ Las contraseñas coinciden' : '✗ Las contraseñas no coinciden'}
        </Text>
      )}

      {/* Tipo de cuenta */}
      <Text style={s.label}>Tipo de cuenta</Text>
      <View style={s.planRow}>
        {[
          { id: 'free', icon: '📖', title: 'Gratuita', desc: 'Dominio público' },
          { id: 'sub',  icon: '⭐', title: 'Suscripción', desc: '$99/mes' },
        ].map(plan => (
          <TouchableOpacity key={plan.id} style={s.planCard}
            accessibilityRole="radio"
            accessibilityLabel={`Plan ${plan.title}, ${plan.desc}`}>
            <Text style={s.planIcon}>{plan.icon}</Text>
            <Text style={s.planTitle}>{plan.title}</Text>
            <Text style={s.planDesc}>{plan.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Términos */}
      <TouchableOpacity style={s.termsRow} onPress={() => setAccepted(!accepted)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: accepted }}
        accessibilityLabel="Aceptar términos y condiciones">
        <View style={[s.checkbox, accepted && s.checkboxActive]}>
          {accepted && <Text style={s.checkmark}>✓</Text>}
        </View>
        <Text style={s.termsText}>
          Acepto los{' '}
          <Text style={s.termsLink}>Términos y condiciones</Text>
          {' '}y la{' '}
          <Text style={s.termsLink}>Política de privacidad</Text>
        </Text>
      </TouchableOpacity>

      {/* Botón registrar */}
      <TouchableOpacity
        style={[s.btnPrimary, !accepted && s.btnDisabled]}
        disabled={!accepted}
        onPress={() => navigation.navigate('Home')}
        accessibilityRole="button"
        accessibilityLabel="Crear cuenta"
        accessibilityState={{ disabled: !accepted }}>
        <Text style={s.btnText}>Crear cuenta</Text>
      </TouchableOpacity>

      {/* Ir a login */}
      <View style={s.loginRow}>
        <Text style={s.loginText}>¿Ya tienes cuenta? </Text>
        <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            accessibilityRole="link"
            accessibilityLabel="Ir a iniciar sesión">
            <Text style={s.loginLink}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Barra accesibilidad */}
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
  screen:        { flex: 1, backgroundColor: colors.bg },
  container:     { padding: 24, paddingBottom: 40 },
  header:        { alignItems: 'center', paddingVertical: 20 },
  logoBox:       { width: 56, height: 56, backgroundColor: colors.primary,
                   borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  logoIcon:      { fontSize: 24 },
  title:         { fontSize: 22, fontWeight: '600', color: colors.textPrimary },
  subtitle:      { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  label:         { fontSize: 11, fontWeight: '500', color: colors.textMuted,
                   textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  inputWrap:     { position: 'relative', marginBottom: 14 },
  input:         { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
                   borderRadius: 12, padding: 12, paddingRight: 40,
                   color: colors.textPrimary, fontSize: 14 },
  fieldIcon:     { position: 'absolute', right: 12, top: 13, fontSize: 16 },
  eyeBtn:        { position: 'absolute', right: 12, top: 12 },
  eyeIcon:       { fontSize: 16 },
  strengthRow:   { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14, marginTop: -8 },
  strengthBar:   { flex: 1, height: 4, borderRadius: 2 },
  strengthEmpty: { backgroundColor: colors.border },
  strengthWeak:  { backgroundColor: '#E24B4A' },
  strengthMed:   { backgroundColor: '#EF9F27' },
  strengthStrong:{ backgroundColor: '#639922' },
  strengthLabel: { fontSize: 11, color: colors.textMuted, minWidth: 36 },
  matchMsg:      { fontSize: 12, marginBottom: 10, marginTop: -8 },
  planRow:       { flexDirection: 'row', gap: 10, marginBottom: 18 },
  planCard:      { flex: 1, backgroundColor: colors.surface, borderWidth: 1,
                   borderColor: colors.border, borderRadius: 12, padding: 12, alignItems: 'center' },
  planIcon:      { fontSize: 22, marginBottom: 4 },
  planTitle:     { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  planDesc:      { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  termsRow:      { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 20 },
  checkbox:      { width: 20, height: 20, borderRadius: 6, borderWidth: 1,
                   borderColor: colors.border, backgroundColor: colors.surface,
                   alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  checkboxActive:{ backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark:     { color: '#fff', fontSize: 12, fontWeight: '700' },
  termsText:     { flex: 1, fontSize: 13, color: colors.textMuted, lineHeight: 20 },
  termsLink:     { color: colors.accent },
  btnPrimary:    { backgroundColor: colors.primary, borderRadius: 14,
                   padding: 15, alignItems: 'center', marginBottom: 16 },
  btnDisabled:   { opacity: 0.4 },
  btnText:       { color: '#fff', fontSize: 15, fontWeight: '600' },
  loginRow:      { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  loginText:     { fontSize: 13, color: colors.textMuted },
  loginLink:     { fontSize: 13, color: colors.accent, fontWeight: '500' },
  accBar:        { flexDirection: 'row', justifyContent: 'center', gap: 24,
                   paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border },
  accBtn:        { alignItems: 'center', gap: 4 },
  accIcon:       { fontSize: 20 },
  accLabel:      { fontSize: 9, color: colors.textSubtle },
});