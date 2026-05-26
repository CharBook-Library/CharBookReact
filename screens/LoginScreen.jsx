// LoginScreen.js

import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const colors = {
  bg: '#030712',

  card: 'rgba(15, 23, 42, 0.90)',

  primary: '#7C3AED',
  secondary: '#6D5DFC',

  accent: '#22D3EE',

  textPrimary: '#F8FAFC',
  textMuted: '#94A3B8',
  textSubtle: '#64748B',

  border: 'rgba(255,255,255,0.06)',

  input: '#0B1220',
};

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [tab, setTab] = useState('correo');

  return (

    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1974&auto=format&fit=crop',
      }}
      blurRadius={5}
      style={s.background}
    >

      <LinearGradient
        colors={[
          'rgba(2,6,23,0.96)',
          'rgba(15,23,42,0.95)',
          'rgba(17,24,39,0.96)',
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
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >

            {/* LOGO */}
            <View style={s.logoContainer}>

              <View style={s.logoBox}>

                <Image
                  source={require('../assets/images/logo.png')}
                  style={s.logoImage}
                  resizeMode="contain"
                />

              </View>

              <Text style={s.title}>
                CharBook
              </Text>

              <Text style={s.subtitle}>
                Tu biblioteca inteligente
              </Text>

            </View>

            {/* CARD */}
            <View style={s.card}>

              <Text style={s.welcome}>
                Bienvenido de vuelta
              </Text>

              <Text style={s.welcomeSub}>
                Inicia sesión para continuar leyendo
              </Text>

              {/* TABS */}
              <View style={s.tabs}>

                {['correo', 'teléfono'].map((item) => (

                  <TouchableOpacity
                    key={item}
                    activeOpacity={0.8}
                    onPress={() => setTab(item)}
                    style={[
                      s.tab,
                      tab === item && s.tabActive,
                    ]}
                  >

                    <Text
                      style={[
                        s.tabText,
                        tab === item && s.tabTextActive,
                      ]}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Text>

                  </TouchableOpacity>

                ))}

              </View>

              {/* SOCIAL */}
              <View style={s.socialContainer}>

                <TouchableOpacity style={s.socialBtn}>
                  <Text style={s.socialText}>G</Text>
                </TouchableOpacity>

                <TouchableOpacity style={s.socialBtn}>
                  <Text style={s.socialText}>f</Text>
                </TouchableOpacity>

              </View>

              {/* DIVIDER */}
              <View style={s.dividerContainer}>

                <View style={s.divider} />

                <Text style={s.dividerText}>
                  o inicia sesión con correo
                </Text>

                <View style={s.divider} />

              </View>

              {/* EMAIL */}
              <Text style={s.label}>
                Correo electrónico
              </Text>

              <TextInput
                style={s.input}
                placeholder="Correo electrónico"
                placeholderTextColor={colors.textSubtle}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* PASSWORD */}
              <Text style={s.label}>
                Contraseña
              </Text>

              <View>

                <TextInput
                  style={s.input}
                  placeholder="Contraseña"
                  placeholderTextColor={colors.textSubtle}
                  secureTextEntry={!showPass}
                  value={password}
                  onChangeText={setPassword}
                />

                <TouchableOpacity
                  style={s.eyeButton}
                  onPress={() => setShowPass(!showPass)}
                >

                  <Text style={s.eye}>
                    {showPass ? '🙈' : '👁️'}
                  </Text>

                </TouchableOpacity>

              </View>

              {/* FORGOT */}
              <TouchableOpacity style={s.forgotContainer}>

                <Text style={s.forgot}>
                  ¿Olvidaste tu contraseña?
                </Text>

              </TouchableOpacity>

              {/* LOGIN BUTTON */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Home')}
              >

                <LinearGradient
                  colors={['#6D5DFC', '#9333EA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={s.loginButton}
                >

                  <Text style={s.loginText}>
                    Iniciar sesión
                  </Text>

                </LinearGradient>

              </TouchableOpacity>

              {/* REGISTER */}
              <View style={s.registerRow}>

                <Text style={s.registerText}>
                  ¿No tienes cuenta?
                </Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                >

                  <Text style={s.registerLink}>
                    {' '}Regístrate gratis
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

  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },

  logoBox: {
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 10,

    shadowColor: '#7C3AED',

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.35,
    shadowRadius: 20,

    elevation: 12,
  },

  logoImage: {
    width: 120,
    height: 120,
  },

  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 8,
    letterSpacing: 1,
  },

  subtitle: {
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 14,
  },

  card: {
    width: '100%',
    maxWidth: 430,

    backgroundColor: colors.card,

    borderRadius: 30,

    padding: 28,

    borderWidth: 1,
    borderColor: colors.border,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.35,
    shadowRadius: 18,

    elevation: 12,
  },

  welcome: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
  },

  welcomeSub: {
    color: colors.textMuted,
    fontSize: 14,
    marginBottom: 24,
  },

  tabs: {
    flexDirection: 'row',

    backgroundColor: '#081120',

    borderRadius: 16,

    padding: 4,

    marginBottom: 22,
  },

  tab: {
    flex: 1,

    paddingVertical: 13,

    borderRadius: 14,

    alignItems: 'center',
  },

  tabActive: {
    backgroundColor: '#1E293B',
  },

  tabText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },

  tabTextActive: {
    color: '#fff',
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 24,
  },

  socialBtn: {
    width: 54,
    height: 54,

    borderRadius: 18,

    backgroundColor: '#111827',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: colors.border,
  },

  socialText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#243041',
  },

  dividerText: {
    color: colors.textSubtle,
    marginHorizontal: 10,
    fontSize: 12,
  },

  label: {
    color: '#CBD5E1',
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 13,
  },

  input: {
    backgroundColor: colors.input,

    borderRadius: 16,

    paddingHorizontal: 16,
    paddingVertical: 15,

    color: '#fff',

    borderWidth: 1,
    borderColor: '#1E293B',

    fontSize: 14,

    marginBottom: 16,
  },

  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 14,
  },

  eye: {
    fontSize: 18,
  },

  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },

  forgot: {
    color: colors.accent,
    fontWeight: '600',
    fontSize: 13,
  },

  loginButton: {
    paddingVertical: 17,

    borderRadius: 16,

    alignItems: 'center',
  },

  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },

  registerText: {
    color: colors.textMuted,
    fontSize: 13,
  },

  registerLink: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: 13,
  },

});