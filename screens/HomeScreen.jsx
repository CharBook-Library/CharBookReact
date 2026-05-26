import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View
} from 'react-native';
import { colors } from '../constants/colors';

const CATEGORIAS = ['Todos', 'Ficción', 'Historia', 'Ciencia', 'Poesía', 'Educación'];

const LIBROS = [
  { id: '1', titulo: 'Don Quijote',       autor: 'Cervantes',   tipo: 'libro',      emoji: '📖', categoria: 'Ficción'   },
  { id: '2', titulo: 'Cien años de soledad', autor: 'García Márquez', tipo: 'audio', emoji: '🎧', categoria: 'Ficción'  },
  { id: '3', titulo: 'Breve Historia del Tiempo', autor: 'Hawking', tipo: 'libro',   emoji: '📖', categoria: 'Ciencia'  },
  { id: '4', titulo: 'El Arte de la Guerra', autor: 'Sun Tzu',   tipo: 'audio',      emoji: '🎧', categoria: 'Historia' },
  { id: '5', titulo: 'Veinte poemas de amor', autor: 'Neruda',   tipo: 'libro',      emoji: '📖', categoria: 'Poesía'   },
  { id: '6', titulo: 'Sapiens',            autor: 'Harari',      tipo: 'audio',      emoji: '🎧', categoria: 'Historia' },
];

export default function HomeScreen({ navigation }) {
  const [busqueda, setBusqueda]     = useState('');
  const [categoria, setCategoria]   = useState('Todos');

  const librosFiltrados = LIBROS.filter(l =>
    (categoria === 'Todos' || l.categoria === categoria) &&
    (l.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
     l.autor.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <View style={s.screen}>
      <ScrollView contentContainerStyle={s.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>Hola, Jafet 👋</Text>
            <Text style={s.headerSub}>¿Qué quieres leer hoy?</Text>
          </View>
          <TouchableOpacity style={s.avatarBtn}
            accessibilityRole="button"
            accessibilityLabel="Ver perfil de usuario">
            <Text style={s.avatarText}>JS</Text>
          </TouchableOpacity>
        </View>

        {/* Buscador */}
        <View style={s.searchWrap}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput style={s.searchInput}
            value={busqueda} onChangeText={setBusqueda}
            placeholder="Buscar libros o autores..."
            placeholderTextColor={colors.textSubtle}
            accessibilityLabel="Buscador de libros"
            accessibilityHint="Escribe el título o autor que buscas"
            returnKeyType="search" />
        </View>

        {/* Continuar leyendo */}
        <Text style={s.sectionTitle}>Continuar leyendo</Text>
        <TouchableOpacity style={s.continueCard}
          accessibilityRole="button"
          accessibilityLabel="Continuar leyendo Don Quijote, página 42 de 863">
          <View style={s.continueLeft}>
            <View style={s.continueEmoji}>
              <Text style={{ fontSize: 28 }}>📖</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.continueTitle}>Don Quijote de la Mancha</Text>
              <Text style={s.continueAuthor}>Miguel de Cervantes</Text>
              <View style={s.progressBar}>
                <View style={[s.progressFill, { width: '35%' }]} />
              </View>
              <Text style={s.progressText}>Página 42 de 863 · 35%</Text>
            </View>
          </View>
          <Text style={s.continueArrow}>▶</Text>
        </TouchableOpacity>

        {/* Categorías */}
        <Text style={s.sectionTitle}>Categorías</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 16 }}
          accessibilityRole="tablist">
          {CATEGORIAS.map(cat => (
            <TouchableOpacity key={cat}
              style={[s.catChip, categoria === cat && s.catChipActive]}
              onPress={() => setCategoria(cat)}
              accessibilityRole="tab"
              accessibilityState={{ selected: categoria === cat }}
              accessibilityLabel={`Categoría ${cat}`}>
              <Text style={[s.catText, categoria === cat && s.catTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Catálogo */}
        <Text style={s.sectionTitle}>
          {categoria === 'Todos' ? 'Catálogo completo' : categoria}
          <Text style={s.sectionCount}> ({librosFiltrados.length})</Text>
        </Text>

        <View style={s.grid}>
          {librosFiltrados.map(libro => (
            <TouchableOpacity key={libro.id} style={s.bookCard}
              accessibilityRole="button"
              accessibilityLabel={`${libro.titulo} de ${libro.autor}, ${libro.tipo === 'audio' ? 'audiolibro' : 'libro digital'}`}>
              <View style={s.bookCover}>
                <Text style={{ fontSize: 32 }}>{libro.emoji}</Text>
              </View>
              <Text style={s.bookTitle} numberOfLines={2}>{libro.titulo}</Text>
              <Text style={s.bookAuthor} numberOfLines={1}>{libro.autor}</Text>
              <View style={s.bookBadge}>
                <Text style={s.bookBadgeText}>
                  {libro.tipo === 'audio' ? '🎧 Audio' : '📖 Libro'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {librosFiltrados.length === 0 && (
          <View style={s.empty}>
            <Text style={{ fontSize: 40 }}>🔍</Text>
            <Text style={s.emptyText}>No se encontraron resultados</Text>
          </View>
        )}

      </ScrollView>

      {/* Navbar inferior */}
      <View style={s.navbar} accessibilityRole="tablist">
  {[
    { icon: '🏠', label: 'Inicio',     ruta: 'Home',    active: true  },
    { icon: '📚', label: 'Biblioteca', ruta: 'Crud',    active: false },
    { icon: '🎧', label: 'Audio',      ruta: 'Crud',    active: false },
    { icon: '👤', label: 'Perfil',     ruta: 'Profile', active: false },
  ].map(item => (
    <TouchableOpacity key={item.label} style={s.navItem}
      onPress={() => navigation.navigate(item.ruta)}
      accessibilityRole="tab"
      accessibilityState={{ selected: item.active }}
      accessibilityLabel={item.label}>
      <Text style={[s.navIcon, item.active && s.navIconActive]}>
        {item.icon}
      </Text>
      <Text style={[s.navLabel, item.active && s.navLabelActive]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  ))}
</View>
    </View>
  );
}

const s = StyleSheet.create({
  screen:          { flex: 1, backgroundColor: colors.bg },
  container:       { padding: 24, paddingBottom: 100 },
  header:          { flexDirection: 'row', justifyContent: 'space-between',
                     alignItems: 'center', marginBottom: 20 },
  greeting:        { fontSize: 20, fontWeight: '600', color: colors.textPrimary },
  headerSub:       { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  avatarBtn:       { width: 40, height: 40, borderRadius: 20,
                     backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText:      { color: '#fff', fontWeight: '600', fontSize: 14 },
  searchWrap:      { flexDirection: 'row', alignItems: 'center',
                     backgroundColor: colors.surface, borderWidth: 1,
                     borderColor: colors.border, borderRadius: 12,
                     paddingHorizontal: 12, marginBottom: 24 },
  searchIcon:      { fontSize: 16, marginRight: 8 },
  searchInput:     { flex: 1, padding: 12, color: colors.textPrimary, fontSize: 14 },
  sectionTitle:    { fontSize: 15, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 },
  sectionCount:    { fontWeight: '400', color: colors.textMuted },
  continueCard:    { backgroundColor: colors.surface, borderWidth: 1,
                     borderColor: colors.border, borderRadius: 16,
                     padding: 14, flexDirection: 'row',
                     alignItems: 'center', marginBottom: 24 },
  continueLeft:    { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  continueEmoji:   { width: 52, height: 52, backgroundColor: colors.bg,
                     borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  continueTitle:   { fontSize: 14, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  continueAuthor:  { fontSize: 12, color: colors.textMuted, marginBottom: 8 },
  progressBar:     { height: 4, backgroundColor: colors.border, borderRadius: 2, marginBottom: 4 },
  progressFill:    { height: 4, backgroundColor: colors.primary, borderRadius: 2 },
  progressText:    { fontSize: 11, color: colors.textMuted },
  continueArrow:   { color: colors.primary, fontSize: 16 },
  catChip:         { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
                     borderWidth: 1, borderColor: colors.border,
                     backgroundColor: colors.surface, marginRight: 8 },
  catChipActive:   { backgroundColor: colors.primary, borderColor: colors.primary },
  catText:         { fontSize: 13, color: colors.textMuted },
  catTextActive:   { color: '#fff', fontWeight: '500' },
  grid:            { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  bookCard:        { width: '47%', backgroundColor: colors.surface,
                     borderWidth: 1, borderColor: colors.border,
                     borderRadius: 14, padding: 12 },
  bookCover:       { width: '100%', height: 80, backgroundColor: colors.bg,
                     borderRadius: 10, alignItems: 'center',
                     justifyContent: 'center', marginBottom: 8 },
  bookTitle:       { fontSize: 13, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  bookAuthor:      { fontSize: 11, color: colors.textMuted, marginBottom: 8 },
  bookBadge:       { backgroundColor: colors.bg, borderRadius: 6,
                     paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' },
  bookBadgeText:   { fontSize: 10, color: colors.accent },
  empty:           { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyText:       { fontSize: 14, color: colors.textMuted },
  navbar:          { position: 'absolute', bottom: 0, left: 0, right: 0,
                     flexDirection: 'row', backgroundColor: colors.surface,
                     borderTopWidth: 1, borderTopColor: colors.border,
                     paddingBottom: 20, paddingTop: 10 },
  navItem:         { flex: 1, alignItems: 'center', gap: 4 },
  navIcon:         { fontSize: 20 },
  navIconActive:   { },
  navLabel:        { fontSize: 10, color: colors.textMuted },
  navLabelActive:  { color: colors.accent, fontWeight: '500' },
});