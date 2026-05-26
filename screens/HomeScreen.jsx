import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '../constants/colors';

const CATEGORIAS = [
  'Todos',
  'Ficción',
  'Historia',
  'Ciencia',
  'Poesía',
  'Educación',
];

const LIBROS = [
  {
    id: '1',
    titulo: 'Don Quijote',
    autor: 'Miguel de Cervantes',
    tipo: 'libro',
    emoji: '📖',
    categoria: 'Ficción',
  },
  {
    id: '2',
    titulo: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
    tipo: 'audio',
    emoji: '🎧',
    categoria: 'Ficción',
  },
  {
    id: '3',
    titulo: 'Breve Historia del Tiempo',
    autor: 'Stephen Hawking',
    tipo: 'libro',
    emoji: '📘',
    categoria: 'Ciencia',
  },
  {
    id: '4',
    titulo: 'El Arte de la Guerra',
    autor: 'Sun Tzu',
    tipo: 'audio',
    emoji: '🎧',
    categoria: 'Historia',
  },
  {
    id: '5',
    titulo: 'Veinte poemas de amor',
    autor: 'Pablo Neruda',
    tipo: 'libro',
    emoji: '📕',
    categoria: 'Poesía',
  },
  {
    id: '6',
    titulo: 'Sapiens',
    autor: 'Yuval Harari',
    tipo: 'audio',
    emoji: '🎧',
    categoria: 'Historia',
  },
];

export default function HomeScreen({ navigation, route }) {

  const user = route?.params?.user || {
  name: 'Invitado',
  email: 'Sin correo',
};

  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  const librosFiltrados = LIBROS.filter((libro) => {

    const coincideCategoria =
      categoria === 'Todos' ||
      libro.categoria === categoria;

    const coincideBusqueda =
      libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      libro.autor.toLowerCase().includes(busqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  return (

    <View style={s.screen}>

      <ScrollView
        contentContainerStyle={s.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >

        {/* HEADER */}

        <View style={s.header}>

          <View>
            <Text style={s.greeting}>
              Hola, {user.name} 👋
            </Text>

            <Text style={s.headerSub}>
              Descubre tu próxima lectura
            </Text>
          </View>

          <TouchableOpacity
            style={s.avatarBtn}
            onPress={() =>
              navigation.navigate('Profile', { user })
            }
          >
            <Text style={s.avatarText}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </TouchableOpacity>

        </View>

        {/* BUSCADOR */}

        <View style={s.searchContainer}>

          <Text style={s.searchIcon}>🔍</Text>

          <TextInput
            style={s.searchInput}
            placeholder="Buscar libros o autores..."
            placeholderTextColor={colors.textSubtle}
            value={busqueda}
            onChangeText={setBusqueda}
          />

        </View>

        {/* CONTINUAR */}

        <Text style={s.sectionTitle}>
          Continuar leyendo
        </Text>

        <TouchableOpacity style={s.continueCard}>

          <View style={s.continueEmoji}>
            <Text style={s.bigEmoji}>📖</Text>
          </View>

          <View style={s.continueInfo}>

            <Text style={s.continueTitle}>
              Don Quijote de la Mancha
            </Text>

            <Text style={s.continueAuthor}>
              Miguel de Cervantes
            </Text>

            <View style={s.progressBar}>
              <View style={s.progressFill} />
            </View>

            <Text style={s.progressText}>
              Página 42 de 863 · 35%
            </Text>

          </View>

        </TouchableOpacity>

        {/* CATEGORÍAS */}

        <Text style={s.sectionTitle}>
          Categorías
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={s.categoriesRow}
        >

          {CATEGORIAS.map((cat) => (

            <TouchableOpacity
              key={cat}
              style={[
                s.categoryBtn,
                categoria === cat && s.categoryBtnActive,
              ]}
              onPress={() => setCategoria(cat)}
            >

              <Text
                style={[
                  s.categoryText,
                  categoria === cat && s.categoryTextActive,
                ]}
              >
                {cat}
              </Text>

            </TouchableOpacity>

          ))}

        </ScrollView>

        {/* CATÁLOGO */}

        <View style={s.catalogHeader}>

          <Text style={s.sectionTitle}>
            {categoria}
          </Text>

          <Text style={s.countText}>
            {librosFiltrados.length} libros
          </Text>

        </View>

        <View style={s.grid}>

          {librosFiltrados.map((libro) => (

            <TouchableOpacity
              key={libro.id}
              style={s.bookCard}
            >

              <View style={s.bookCover}>
                <Text style={s.bookEmoji}>
                  {libro.emoji}
                </Text>
              </View>

              <Text
                style={s.bookTitle}
                numberOfLines={2}
              >
                {libro.titulo}
              </Text>

              <Text
                style={s.bookAuthor}
                numberOfLines={1}
              >
                {libro.autor}
              </Text>

              <View style={s.badge}>

                <Text style={s.badgeText}>
                  {libro.tipo === 'audio'
                    ? '🎧 Audiolibro'
                    : '📖 Libro'}
                </Text>

              </View>

            </TouchableOpacity>

          ))}

        </View>

        {/* VACÍO */}

        {librosFiltrados.length === 0 && (

          <View style={s.emptyBox}>

            <Text style={s.emptyEmoji}>
              🔍
            </Text>

            <Text style={s.emptyText}>
              No se encontraron resultados
            </Text>

          </View>

        )}

      </ScrollView>

      {/* NAVBAR */}

      <View style={s.navbar}>

        {/* INICIO */}

        <TouchableOpacity
          style={s.navItem}
          onPress={() => navigation.navigate('Home', { user })}
        >
          <Text style={s.navIconActive}>🏠</Text>
          <Text style={s.navLabelActive}>Inicio</Text>
        </TouchableOpacity>

        {/* BIBLIOTECA */}

        <TouchableOpacity
          style={s.navItem}
          onPress={() =>
            navigation.navigate('Crud', { user })
          }
        >
          <Text style={s.navIcon}>📚</Text>
          <Text style={s.navLabel}>Biblioteca</Text>
        </TouchableOpacity>

        {/* AUDIO */}

        <TouchableOpacity
  style={s.navItem}
  onPress={() =>
    navigation.navigate('Audio', { user })
  }
>
  <Text style={s.navIcon}>🎧</Text>
  <Text style={s.navLabel}>Audio</Text>
</TouchableOpacity>

        {/* PERFIL */}

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

  container: {
    padding: 20,
    paddingBottom: 120,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },

  greeting: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '700',
  },

  headerSub: {
    color: colors.textMuted,
    marginTop: 6,
    fontSize: 14,
  },

  avatarBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    marginBottom: 28,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    paddingVertical: 16,
    fontSize: 15,
  },

  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 14,
  },

  continueCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: colors.border,
  },

  continueEmoji: {
    width: 70,
    height: 70,
    borderRadius: 18,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  bigEmoji: {
    fontSize: 34,
  },

  continueInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  continueTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },

  continueAuthor: {
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 12,
  },

  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 20,
    overflow: 'hidden',
  },

  progressFill: {
    width: '35%',
    height: 6,
    backgroundColor: colors.primary,
  },

  progressText: {
    color: colors.textMuted,
    marginTop: 8,
    fontSize: 12,
  },

  categoriesRow: {
    marginBottom: 24,
  },

  categoryBtn: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,
    marginRight: 10,
  },

  categoryBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  categoryText: {
    color: colors.textMuted,
    fontWeight: '600',
  },

  categoryTextActive: {
    color: '#fff',
  },

  catalogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  countText: {
    color: colors.textMuted,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  bookCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },

  bookCover: {
    height: 120,
    borderRadius: 16,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  bookEmoji: {
    fontSize: 42,
  },

  bookTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },

  bookAuthor: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 12,
  },

  badge: {
    backgroundColor: colors.bg,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },

  badgeText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '600',
  },

  emptyBox: {
    alignItems: 'center',
    paddingVertical: 50,
  },

  emptyEmoji: {
    fontSize: 50,
    marginBottom: 14,
  },

  emptyText: {
    color: colors.textMuted,
    fontSize: 15,
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