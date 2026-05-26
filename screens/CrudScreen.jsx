import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert,
} from 'react-native';
import { colors } from '../constants/colors';

const INITIAL_LIBROS = [
  { id: '1', titulo: 'Don Quijote',            autor: 'Cervantes',      categoria: 'Ficción',  tipo: 'libro' },
  { id: '2', titulo: 'Cien años de soledad',   autor: 'García Márquez', categoria: 'Ficción',  tipo: 'audio' },
  { id: '3', titulo: 'Breve Historia del Tiempo', autor: 'Hawking',     categoria: 'Ciencia',  tipo: 'libro' },
  { id: '4', titulo: 'El Arte de la Guerra',   autor: 'Sun Tzu',        categoria: 'Historia', tipo: 'audio' },
];

const EMPTY = { titulo: '', autor: '', categoria: '', tipo: 'libro' };

export default function CrudScreen() {
  const [libros, setLibros]       = useState(INITIAL_LIBROS);
  const [form, setForm]           = useState(EMPTY);
  const [editId, setEditId]       = useState(null);
  const [vista, setVista]         = useState('lista'); // 'lista' | 'form'
  const [busqueda, setBusqueda]   = useState('');

  const librosFiltrados = libros.filter(l =>
    l.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    l.autor.toLowerCase().includes(busqueda.toLowerCase())
  );

  // CREATE / UPDATE
  const guardar = () => {
    if (!form.titulo.trim() || !form.autor.trim() || !form.categoria.trim()) {
      Alert.alert('Campos requeridos', 'Completa todos los campos antes de guardar.');
      return;
    }
    if (editId) {
      setLibros(prev => prev.map(l => l.id === editId ? { ...form, id: editId } : l));
    } else {
      setLibros(prev => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setForm(EMPTY);
    setEditId(null);
    setVista('lista');
  };

  // EDIT
  const editar = (libro) => {
    setForm({ titulo: libro.titulo, autor: libro.autor,
              categoria: libro.categoria, tipo: libro.tipo });
    setEditId(libro.id);
    setVista('form');
  };

  // DELETE
  const eliminar = (id) => {
    Alert.alert('Eliminar libro',
      '¿Estás seguro de que deseas eliminar este libro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive',
          onPress: () => setLibros(prev => prev.filter(l => l.id !== id)) },
      ]
    );
  };

  const cancelar = () => {
    setForm(EMPTY);
    setEditId(null);
    setVista('lista');
  };

  // ── FORMULARIO ──────────────────────────────────────
  if (vista === 'form') {
    return (
      <ScrollView style={s.screen} contentContainerStyle={s.container}
        keyboardShouldPersistTaps="handled">

        <View style={s.formHeader}>
          <TouchableOpacity onPress={cancelar}
            accessibilityRole="button" accessibilityLabel="Cancelar y volver">
            <Text style={s.backBtn}>← Volver</Text>
          </TouchableOpacity>
          <Text style={s.formTitle}>
            {editId ? 'Editar libro' : 'Nuevo libro'}
          </Text>
        </View>

        {/* Título */}
        <Text style={s.label}>Título del libro</Text>
        <TextInput style={s.input}
          value={form.titulo} onChangeText={v => setForm({ ...form, titulo: v })}
          placeholder="Ej. Don Quijote"
          placeholderTextColor={colors.textSubtle}
          accessibilityLabel="Título del libro"
          returnKeyType="next" />

        {/* Autor */}
        <Text style={s.label}>Autor</Text>
        <TextInput style={s.input}
          value={form.autor} onChangeText={v => setForm({ ...form, autor: v })}
          placeholder="Ej. Miguel de Cervantes"
          placeholderTextColor={colors.textSubtle}
          accessibilityLabel="Autor del libro"
          returnKeyType="next" />

        {/* Categoría */}
        <Text style={s.label}>Categoría</Text>
        <TextInput style={s.input}
          value={form.categoria} onChangeText={v => setForm({ ...form, categoria: v })}
          placeholder="Ej. Ficción, Historia, Ciencia..."
          placeholderTextColor={colors.textSubtle}
          accessibilityLabel="Categoría del libro"
          returnKeyType="done" />

        {/* Tipo */}
        <Text style={s.label}>Tipo</Text>
        <View style={s.tipoRow}>
          {['libro', 'audio'].map(t => (
            <TouchableOpacity key={t}
              style={[s.tipoBtn, form.tipo === t && s.tipoBtnActive]}
              onPress={() => setForm({ ...form, tipo: t })}
              accessibilityRole="radio"
              accessibilityState={{ checked: form.tipo === t }}
              accessibilityLabel={t === 'libro' ? 'Libro digital' : 'Audiolibro'}>
              <Text style={s.tipoIcon}>{t === 'libro' ? '📖' : '🎧'}</Text>
              <Text style={[s.tipoText, form.tipo === t && s.tipoTextActive]}>
                {t === 'libro' ? 'Libro digital' : 'Audiolibro'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botones */}
        <TouchableOpacity style={s.btnPrimary} onPress={guardar}
          accessibilityRole="button"
          accessibilityLabel={editId ? 'Guardar cambios' : 'Agregar libro'}>
          <Text style={s.btnText}>{editId ? '💾 Guardar cambios' : '➕ Agregar libro'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.btnSecondary} onPress={cancelar}
          accessibilityRole="button" accessibilityLabel="Cancelar">
          <Text style={s.btnSecText}>Cancelar</Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }

  // ── LISTA ────────────────────────────────────────────
  return (
    <View style={s.screen}>
      <ScrollView contentContainerStyle={s.container}
        showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.pageTitle}>Gestión de libros</Text>
            <Text style={s.pageSubtitle}>{libros.length} libros en catálogo</Text>
          </View>
          <TouchableOpacity style={s.addBtn}
            onPress={() => { setForm(EMPTY); setEditId(null); setVista('form'); }}
            accessibilityRole="button"
            accessibilityLabel="Agregar nuevo libro">
            <Text style={s.addBtnText}>＋ Nuevo</Text>
          </TouchableOpacity>
        </View>

        {/* Buscador */}
        <View style={s.searchWrap}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput style={s.searchInput}
            value={busqueda} onChangeText={setBusqueda}
            placeholder="Buscar en el catálogo..."
            placeholderTextColor={colors.textSubtle}
            accessibilityLabel="Buscar libros"
            returnKeyType="search" />
          {busqueda.length > 0 && (
            <TouchableOpacity onPress={() => setBusqueda('')}
              accessibilityLabel="Limpiar búsqueda">
              <Text style={{ color: colors.textMuted, fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats */}
        <View style={s.statsRow}>
          {[
            { label: 'Total',      value: libros.length,                          icon: '📚' },
            { label: 'Libros',     value: libros.filter(l=>l.tipo==='libro').length, icon: '📖' },
            { label: 'Audiolibros',value: libros.filter(l=>l.tipo==='audio').length, icon: '🎧' },
          ].map(stat => (
            <View key={stat.label} style={s.statCard}
              accessible accessibilityLabel={`${stat.label}: ${stat.value}`}>
              <Text style={s.statIcon}>{stat.icon}</Text>
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Lista */}
        {librosFiltrados.length === 0 ? (
          <View style={s.empty}>
            <Text style={{ fontSize: 40 }}>📭</Text>
            <Text style={s.emptyText}>No se encontraron libros</Text>
          </View>
        ) : (
          librosFiltrados.map(libro => (
            <View key={libro.id} style={s.bookRow}
              accessible
              accessibilityLabel={`${libro.titulo} de ${libro.autor}, ${libro.categoria}`}>

              <View style={s.bookEmoji}>
                <Text style={{ fontSize: 24 }}>
                  {libro.tipo === 'audio' ? '🎧' : '📖'}
                </Text>
              </View>

              <View style={s.bookInfo}>
                <Text style={s.bookTitle} numberOfLines={1}>{libro.titulo}</Text>
                <Text style={s.bookAuthor}>{libro.autor}</Text>
                <View style={s.badgeRow}>
                  <View style={s.badge}>
                    <Text style={s.badgeText}>{libro.categoria}</Text>
                  </View>
                  <View style={[s.badge, libro.tipo === 'audio' && s.badgeAudio]}>
                    <Text style={s.badgeText}>
                      {libro.tipo === 'audio' ? 'Audio' : 'Libro'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={s.actions}>
                <TouchableOpacity style={s.editBtn} onPress={() => editar(libro)}
                  accessibilityRole="button"
                  accessibilityLabel={`Editar ${libro.titulo}`}>
                  <Text style={s.editIcon}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.deleteBtn} onPress={() => eliminar(libro.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Eliminar ${libro.titulo}`}>
                  <Text style={s.deleteIcon}>🗑️</Text>
                </TouchableOpacity>
              </View>

            </View>
          ))
        )}

      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen:        { flex: 1, backgroundColor: colors.bg },
  container:     { padding: 24, paddingBottom: 40 },
  header:        { flexDirection: 'row', justifyContent: 'space-between',
                   alignItems: 'center', marginBottom: 20 },
  pageTitle:     { fontSize: 20, fontWeight: '600', color: colors.textPrimary },
  pageSubtitle:  { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  addBtn:        { backgroundColor: colors.primary, paddingHorizontal: 14,
                   paddingVertical: 8, borderRadius: 10 },
  addBtnText:    { color: '#fff', fontSize: 13, fontWeight: '600' },
  searchWrap:    { flexDirection: 'row', alignItems: 'center',
                   backgroundColor: colors.surface, borderWidth: 1,
                   borderColor: colors.border, borderRadius: 12,
                   paddingHorizontal: 12, marginBottom: 16 },
  searchIcon:    { fontSize: 16, marginRight: 8 },
  searchInput:   { flex: 1, padding: 12, color: colors.textPrimary, fontSize: 14 },
  statsRow:      { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard:      { flex: 1, backgroundColor: colors.surface, borderWidth: 1,
                   borderColor: colors.border, borderRadius: 12,
                   padding: 12, alignItems: 'center', gap: 4 },
  statIcon:      { fontSize: 20 },
  statValue:     { fontSize: 20, fontWeight: '600', color: colors.textPrimary },
  statLabel:     { fontSize: 10, color: colors.textMuted },
  bookRow:       { flexDirection: 'row', alignItems: 'center',
                   backgroundColor: colors.surface, borderWidth: 1,
                   borderColor: colors.border, borderRadius: 14,
                   padding: 12, marginBottom: 10, gap: 12 },
  bookEmoji:     { width: 46, height: 46, backgroundColor: colors.bg,
                   borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  bookInfo:      { flex: 1, gap: 2 },
  bookTitle:     { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  bookAuthor:    { fontSize: 12, color: colors.textMuted },
  badgeRow:      { flexDirection: 'row', gap: 6, marginTop: 4 },
  badge:         { backgroundColor: colors.bg, borderRadius: 6,
                   paddingHorizontal: 8, paddingVertical: 2 },
  badgeAudio:    { backgroundColor: '#1A1730' },
  badgeText:     { fontSize: 10, color: colors.accent },
  actions:       { gap: 8 },
  editBtn:       { width: 34, height: 34, backgroundColor: colors.bg,
                   borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  deleteBtn:     { width: 34, height: 34, backgroundColor: '#1A0F0F',
                   borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  editIcon:      { fontSize: 15 },
  deleteIcon:    { fontSize: 15 },
  empty:         { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyText:     { fontSize: 14, color: colors.textMuted },
  formHeader:    { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24 },
  backBtn:       { fontSize: 14, color: colors.accent },
  formTitle:     { fontSize: 18, fontWeight: '600', color: colors.textPrimary },
  label:         { fontSize: 11, fontWeight: '500', color: colors.textMuted,
                   textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  input:         { backgroundColor: colors.surface, borderWidth: 1,
                   borderColor: colors.border, borderRadius: 12,
                   padding: 12, color: colors.textPrimary, fontSize: 14, marginBottom: 16 },
  tipoRow:       { flexDirection: 'row', gap: 10, marginBottom: 24 },
  tipoBtn:       { flex: 1, backgroundColor: colors.surface, borderWidth: 1,
                   borderColor: colors.border, borderRadius: 12,
                   padding: 14, alignItems: 'center', gap: 6 },
  tipoBtnActive: { borderColor: colors.primary, backgroundColor: '#1A1730' },
  tipoIcon:      { fontSize: 24 },
  tipoText:      { fontSize: 13, color: colors.textMuted },
  tipoTextActive:{ color: colors.textPrimary, fontWeight: '500' },
  btnPrimary:    { backgroundColor: colors.primary, borderRadius: 14,
                   padding: 15, alignItems: 'center', marginBottom: 12 },
  btnText:       { color: '#fff', fontSize: 15, fontWeight: '600' },
  btnSecondary:  { borderWidth: 1, borderColor: colors.border, borderRadius: 14,
                   padding: 15, alignItems: 'center' },
  btnSecText:    { color: colors.textMuted, fontSize: 15 },
});