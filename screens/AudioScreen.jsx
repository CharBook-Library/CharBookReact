import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { colors } from '../constants/colors';

const AUDIOS = [
  {
    id: '1',
    titulo: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
  },
  {
    id: '2',
    titulo: 'El Arte de la Guerra',
    autor: 'Sun Tzu',
  },
  {
    id: '3',
    titulo: 'Sapiens',
    autor: 'Yuval Harari',
  },
];

export default function AudioScreen({ navigation, route }) {

  const user = route?.params?.user || {
    name: 'Invitado',
  };

  return (

    <View style={s.screen}>

      <View style={s.header}>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Home', { user })
          }
        >
          <Text style={s.back}>←</Text>
        </TouchableOpacity>

        <Text style={s.title}>
          Audiolibros
        </Text>

      </View>

      <ScrollView
        contentContainerStyle={s.container}
        showsVerticalScrollIndicator={false}
      >

        {AUDIOS.map(audio => (

          <View
            key={audio.id}
            style={s.card}
          >

            <Text style={s.emoji}>
              🎧
            </Text>

            <View style={{ flex: 1 }}>

              <Text style={s.bookTitle}>
                {audio.titulo}
              </Text>

              <Text style={s.author}>
                {audio.autor}
              </Text>

            </View>

            <TouchableOpacity style={s.playBtn}>
              <Text style={s.playText}>
                ▶
              </Text>
            </TouchableOpacity>

          </View>

        ))}

      </ScrollView>

      {/* NAVBAR */}

      <View style={s.navbar}>

        <TouchableOpacity
          style={s.navItem}
          onPress={() =>
            navigation.navigate('Home', { user })
          }
        >
          <Text style={s.navIcon}>🏠</Text>
          <Text style={s.navLabel}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.navItem}
          onPress={() =>
            navigation.navigate('Crud')
          }
        >
          <Text style={s.navIcon}>📚</Text>
          <Text style={s.navLabel}>Biblioteca</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.navItem}>
          <Text style={s.navIconActive}>🎧</Text>
          <Text style={s.navLabelActive}>Audio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.navItem}
          onPress={() =>
            navigation.navigate('Profile', { user })
          }
        >
          <Text style={s.navIcon}>👤</Text>
          <Text style={s.navLabel}>Perfil</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const s = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    gap: 16,
  },

  back: {
    color: colors.textPrimary,
    fontSize: 28,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },

  container: {
    padding: 20,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  emoji: {
    fontSize: 40,
  },

  bookTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },

  author: {
    color: colors.textMuted,
    marginTop: 4,
  },

  playBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  playText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    paddingBottom: 24,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
  },

  navIcon: {
    fontSize: 22,
  },

  navIconActive: {
    fontSize: 22,
  },

  navLabel: {
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 11,
  },

  navLabelActive: {
    color: colors.accent,
    marginTop: 4,
    fontSize: 11,
    fontWeight: '700',
  },

});