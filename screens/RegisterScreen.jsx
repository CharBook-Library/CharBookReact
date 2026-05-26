// RegisterScreen.js

import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const colors = {
  bg: '#020617',

  card: 'rgba(15,23,42,0.92)',

  primary: '#7C3AED',
  secondary: '#9333EA',

  accent: '#22D3EE',

  textPrimary: '#F8FAFC',
  textMuted: '#94A3B8',
  textSubtle: '#64748B',

  border: 'rgba(255,255,255,0.07)',

  input: '#0F172A',

  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
};

export default function RegisterScreen({ navigation }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);

  const [accepted, setAccepted] = useState(false);

  const [plan, setPlan] = useState('free');

  const passwordMatch =
    password === confirm && confirm.length > 0;

  const getStrength = () => {

    if (password.length < 5) {
      return 'Débil';
    }

    if (password.length < 9) {
      return 'Media';
    }

    return 'Fuerte';
  };

  return (

    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1974&auto=format&fit=crop',
      }}
      blurRadius={6}
      style={s.background}
    >

      <LinearGradient
        colors={[
          'rgba(2,6,23,0.97)',
          'rgba(15,23,42,0.96)',
          'rgba(2,6,23,0.98)',
        ]}
        style={s.overlay}
      >

        <SafeAreaView style={s.screen}>

          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />

          <ScrollView
            contentContainerStyle={s.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
          >

            {/* HEADER */}
            <View style={s.header}>

              <LinearGradient
                colors={['#6D5DFC', '#9333EA']}
                style={s.logoBox}
              >

                <Text style={s.logoIcon}>
                  📚
                </Text>

              </LinearGradient>

              <Text style={s.title}>
                Crear cuenta
              </Text>

              <Text style={s.subtitle}>
                Únete y empieza a leer hoy
              </Text>

            </View>

            {/* CARD */}
            <View style={s.card}>

              {/* NAME */}
              <Text style={s.label}>
                Nombre completo
              </Text>

              <View style={s.inputWrap}>

                <TextInput
                  style={s.input}
                  placeholder="Tu nombre y apellido"
                  placeholderTextColor={colors.textSubtle}
                  value={name}
                  onChangeText={setName}
                />

                <Text style={s.icon}>
                  👤
                </Text>

              </View>

              {/* EMAIL */}
              <Text style={s.label}>
                Correo electrónico
              </Text>

              <View style={s.inputWrap}>

                <TextInput
                  style={s.input}
                  placeholder="usuario@correo.com"
                  placeholderTextColor={colors.textSubtle}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />

                <Text style={s.icon}>
                  ✉️
                </Text>

              </View>

              {/* PASSWORD */}
              <Text style={s.label}>
                Contraseña
              </Text>

              <View style={s.inputWrap}>

                <TextInput
                  style={s.input}
                  placeholder="Mínimo 8 caracteres"
                  placeholderTextColor={colors.textSubtle}
                  secureTextEntry={!showPass}
                  value={password}
                  onChangeText={setPassword}
                />

                <TouchableOpacity
                  style={s.eyeBtn}
                  onPress={() => setShowPass(!showPass)}
                >

                  <Text style={s.eye}>
                    {showPass ? '🙈' : '👁️'}
                  </Text>

                </TouchableOpacity>

              </View>

              {/* PASSWORD STRENGTH */}
              <View style={s.strengthContainer}>

                <View
                  style={[
                    s.bar,
                    password.length >= 1
                      ? s.barWeak
                      : s.barEmpty,
                  ]}
                />

                <View
                  style={[
                    s.bar,
                    password.length >= 5
                      ? s.barMedium
                      : s.barEmpty,
                  ]}
                />

                <View
                  style={[
                    s.bar,
                    password.length >= 9
                      ? s.barStrong
                      : s.barEmpty,
                  ]}
                />

                <Text style={s.strengthText}>
                  {password.length > 0
                    ? getStrength()
                    : ''}
                </Text>

              </View>

              {/* CONFIRM */}
              <Text style={s.label}>
                Confirmar contraseña
              </Text>

              <View style={s.inputWrap}>

                <TextInput
                  style={[
                    s.input,

                    confirm.length > 0 && {

                      borderColor: passwordMatch
                        ? colors.success
                        : colors.danger,
                    },
                  ]}
                  placeholder="Repite tu contraseña"
                  placeholderTextColor={colors.textSubtle}
                  secureTextEntry={!showConf}
                  value={confirm}
                  onChangeText={setConfirm}
                />

                <TouchableOpacity
                  style={s.eyeBtn}
                  onPress={() => setShowConf(!showConf)}
                >

                  <Text style={s.eye}>
                    {showConf ? '🙈' : '👁️'}
                  </Text>

                </TouchableOpacity>

              </View>

              {confirm.length > 0 && (

                <Text
                  style={[
                    s.matchText,

                    {
                      color: passwordMatch
                        ? colors.success
                        : colors.danger,
                    },
                  ]}
                >

                  {passwordMatch
                    ? '✓ Las contraseñas coinciden'
                    : '✗ Las contraseñas no coinciden'}

                </Text>

              )}

              {/* PLAN */}
              <Text style={s.label}>
                Tipo de cuenta
              </Text>

              <View style={s.planRow}>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setPlan('free')}
                  style={[
                    s.planCard,

                    plan === 'free' &&
                    s.planActive,
                  ]}
                >

                  <Text style={s.planIcon}>
                    📖
                  </Text>

                  <Text style={s.planTitle}>
                    Gratuita
                  </Text>

                  <Text style={s.planDesc}>
                    Dominio público
                  </Text>

                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setPlan('premium')}
                  style={[
                    s.planCard,

                    plan === 'premium' &&
                    s.planActive,
                  ]}
                >

                  <Text style={s.planIcon}>
                    ⭐
                  </Text>

                  <Text style={s.planTitle}>
                    Suscripción
                  </Text>

                  <Text style={s.planDesc}>
                    $99/mes
                  </Text>

                </TouchableOpacity>

              </View>

              {/* TERMS */}
              <TouchableOpacity
                style={s.termsRow}
                onPress={() => setAccepted(!accepted)}
                activeOpacity={0.8}
              >

                <View
                  style={[
                    s.checkbox,

                    accepted &&
                    s.checkboxActive,
                  ]}
                >

                  {accepted && (
                    <Text style={s.check}>
                      ✓
                    </Text>
                  )}

                </View>

                <Text style={s.termsText}>

                  Acepto los{' '}

                  <Text style={s.link}>
                    Términos y condiciones
                  </Text>

                  {' '}y la{' '}

                  <Text style={s.link}>
                    Política de privacidad
                  </Text>

                </Text>

              </TouchableOpacity>

              {/* BUTTON */}
              <TouchableOpacity
                activeOpacity={0.9}
                disabled={!accepted}
                onPress={() => navigation.navigate('Home')}
                style={{
                  opacity: accepted ? 1 : 0.5,
                }}
              >

                <LinearGradient
                  colors={['#6D5DFC', '#9333EA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={s.button}
                >

                  <Text style={s.buttonText}>
                    Crear cuenta
                  </Text>

                </LinearGradient>

              </TouchableOpacity>

              {/* LOGIN */}
              <View style={s.loginRow}>

                <Text style={s.loginText}>
                  ¿Ya tienes cuenta?
                </Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                >

                  <Text style={s.loginLink}>
                    {' '}Inicia sesión
                  </Text>

                </TouchableOpacity>

              </View>

            </View>

          </ScrollView>

        </SafeAreaView>

      </LinearGradient>

    </ImageBackground>
  );
}

const s = StyleSheet.create({

  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
  },

  screen: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,

    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 26,
  },

  logoBox: {
    width: 84,
    height: 84,

    borderRadius: 28,

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 14,

    shadowColor: '#7C3AED',

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.5,
    shadowRadius: 16,

    elevation: 14,
  },

  logoIcon: {
    fontSize: 40,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
  },

  subtitle: {
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 14,
  },

  card: {
    width: '100%',
    maxWidth: 500,

    backgroundColor: colors.card,

    borderRadius: 30,

    padding: 28,

    borderWidth: 1,
    borderColor: colors.border,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 12,
    },

    shadowOpacity: 0.4,
    shadowRadius: 18,

    elevation: 12,
  },

  label: {
    color: '#CBD5E1',

    fontSize: 12,
    fontWeight: '700',

    marginBottom: 8,

    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  inputWrap: {
    position: 'relative',
    marginBottom: 18,
  },

  input: {
    backgroundColor: colors.input,

    borderWidth: 1,
    borderColor: '#1E293B',

    borderRadius: 16,

    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingRight: 50,

    color: '#fff',

    fontSize: 14,
  },

  icon: {
    position: 'absolute',
    right: 16,
    top: 16,

    fontSize: 18,
  },

  eyeBtn: {
    position: 'absolute',
    right: 16,
    top: 16,
  },

  eye: {
    fontSize: 18,
  },

  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 6,

    marginTop: -4,
    marginBottom: 18,
  },

  bar: {
    flex: 1,
    height: 5,
    borderRadius: 10,
  },

  barEmpty: {
    backgroundColor: '#1E293B',
  },

  barWeak: {
    backgroundColor: colors.danger,
  },

  barMedium: {
    backgroundColor: colors.warning,
  },

  barStrong: {
    backgroundColor: colors.success,
  },

  strengthText: {
    color: colors.textMuted,
    fontSize: 12,
    width: 52,
    textAlign: 'right',
  },

  matchText: {
    marginTop: -6,
    marginBottom: 16,
    fontSize: 13,
    fontWeight: '600',
  },

  planRow: {
    flexDirection: 'row',
    gap: 14,

    marginBottom: 22,
  },

  planCard: {
    flex: 1,

    backgroundColor: '#0F172A',

    borderWidth: 1,
    borderColor: '#1E293B',

    borderRadius: 20,

    paddingVertical: 24,

    alignItems: 'center',
  },

  planActive: {
    borderColor: colors.primary,

    backgroundColor: 'rgba(124,58,237,0.12)',
  },

  planIcon: {
    fontSize: 26,
    marginBottom: 8,
  },

  planTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  planDesc: {
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 12,
  },

  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    marginBottom: 26,
  },

  checkbox: {
    width: 22,
    height: 22,

    borderRadius: 7,

    borderWidth: 1,
    borderColor: '#334155',

    backgroundColor: '#0F172A',

    marginRight: 12,

    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  check: {
    color: '#fff',
    fontWeight: '700',
  },

  termsText: {
    flex: 1,

    color: colors.textMuted,

    lineHeight: 22,
    fontSize: 13,
  },

  link: {
    color: colors.accent,
    fontWeight: '700',
  },

  button: {
    paddingVertical: 17,

    borderRadius: 18,

    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',

    fontSize: 16,
    fontWeight: '800',

    letterSpacing: 0.5,
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',

    marginTop: 24,
  },

  loginText: {
    color: colors.textMuted,
    fontSize: 13,
  },

  loginLink: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
  },

});