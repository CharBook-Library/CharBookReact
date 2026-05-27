import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../constants/colors';
import { useAccessibility } from '../context/AccessibilityContext';

const INITIAL_LIBROS = [
  {
    id: '1',
    titulo: 'Don Quijote',
    autor: 'Cervantes',
    categoria: 'Ficción',
    tipo: 'libro',
  },
  {
    id: '2',
    titulo: 'Cien años de soledad',
    autor: 'García Márquez',
    categoria: 'Ficción',
    tipo: 'audio',
  },
  {
    id: '3',
    titulo: 'Breve Historia del Tiempo',
    autor: 'Hawking',
    categoria: 'Ciencia',
    tipo: 'libro',
  },
  {
    id: '4',
    titulo: 'El Arte de la Guerra',
    autor: 'Sun Tzu',
    categoria: 'Historia',
    tipo: 'audio',
  },
];

const EMPTY = {
  titulo: '',
  autor: '',
  categoria: '',
  tipo: 'libro',
};

export default function CrudScreen({ navigation }) {
  const { theme, scaleFont } = useAccessibility();
  const [libros, setLibros] = useState(INITIAL_LIBROS);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [vista, setVista] = useState('lista');
  const [busqueda, setBusqueda] = useState('');

  const librosFiltrados = libros.filter(
    (l) =>
      l.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      l.autor.toLowerCase().includes(busqueda.toLowerCase())
  );

  const guardar = () => {
    if (
      !form.titulo.trim() ||
      !form.autor.trim() ||
      !form.categoria.trim()
    ) {
      Alert.alert(
        'Campos requeridos',
        'Completa todos los campos.'
      );
      return;
    }

    if (editId) {
      setLibros((prev) =>
        prev.map((l) =>
          l.id === editId
            ? { ...form, id: editId }
            : l
        )
      );

      Alert.alert('Actualizado', 'Libro actualizado correctamente');
    } else {
      setLibros((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now().toString(),
        },
      ]);

      Alert.alert('Agregado', 'Libro agregado correctamente');
    }

    setForm(EMPTY);
    setEditId(null);
    setVista('lista');
  };

  const editar = (libro) => {
    setForm({
      titulo: libro.titulo,
      autor: libro.autor,
      categoria: libro.categoria,
      tipo: libro.tipo,
    });

    setEditId(libro.id);
    setVista('form');
  };

  const eliminar = (id) => {
    Alert.alert(
      'Eliminar libro',
      '¿Seguro que deseas eliminar este libro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setLibros((prev) =>
              prev.filter((l) => l.id !== id)
            );
          },
        },
      ]
    );
  };

  const cancelar = () => {
    setForm(EMPTY);
    setEditId(null);
    setVista('lista');
  };

  // =========================
  // FORMULARIO
  // =========================

  if (vista === 'form') {
    return (
      <ScrollView
        style={[s.screen, { backgroundColor: theme.bg }]}
        contentContainerStyle={[s.container, { backgroundColor: theme.bg }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={s.formHeader}>
          <TouchableOpacity onPress={cancelar}>
            <Text style={[s.backBtn, { color: theme.textPrimary, fontSize: scaleFont(14) }]}>← Volver</Text>
          </TouchableOpacity>

          <Text style={[s.formTitle, { color: theme.textPrimary, fontSize: scaleFont(18) }] }>
            {editId ? 'Editar libro' : 'Nuevo libro'}
          </Text>
        </View>

        {/* TITULO */}
        <Text style={s.label}>Título</Text>

        <TextInput
          style={[s.input, { backgroundColor: theme.surface, borderColor: theme.border }]}
          value={form.titulo}
          onChangeText={(v) =>
            setForm({ ...form, titulo: v })
          }
          placeholder="Nombre del libro"
          placeholderTextColor={theme.textSubtle}
          accessible={true}
          importantForAccessibility="yes"
          accessibilityLabel="Título del libro"
          accessibilityHint="Ingresa el título del libro"
          returnKeyType="next"
        />

        {/* AUTOR */}
        <Text style={s.label}>Autor</Text>

        <TextInput
          style={[s.input, { backgroundColor: theme.surface, borderColor: theme.border }]}
          value={form.autor}
          onChangeText={(v) =>
            setForm({ ...form, autor: v })
          }
          placeholder="Autor del libro"
          placeholderTextColor={theme.textSubtle}
          accessible={true}
          importantForAccessibility="yes"
          accessibilityLabel="Autor del libro"
          accessibilityHint="Ingresa el nombre del autor"
          returnKeyType="next"
        />

        {/* CATEGORIA */}
        <Text style={s.label}>Categoría</Text>

        <TextInput
          style={[s.input, { backgroundColor: theme.surface, borderColor: theme.border }]}
          value={form.categoria}
          onChangeText={(v) =>
            setForm({ ...form, categoria: v })
          }
          placeholder="Ej. Ciencia"
          placeholderTextColor={theme.textSubtle}
          accessible={true}
          importantForAccessibility="yes"
          accessibilityLabel="Categoría"
          accessibilityHint="Ingresa la categoría del libro"
          returnKeyType="done"
        />

        {/* TIPO */}
        <Text style={s.label}>Tipo</Text>

        <View style={s.tipoRow}>
          {['libro', 'audio'].map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={[
                s.tipoBtn,
                form.tipo === tipo &&
                  s.tipoBtnActive,
              ]}
              onPress={() =>
                setForm({ ...form, tipo })
              }
            >
              <Text style={s.tipoEmoji}>
                {tipo === 'libro' ? '📖' : '🎧'}
              </Text>

              <Text
                style={[
                  s.tipoText,
                  form.tipo === tipo &&
                    s.tipoTextActive,
                ]}
              >
                {tipo === 'libro'
                  ? 'Libro'
                  : 'Audiolibro'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* BOTONES */}
        <TouchableOpacity
          style={s.saveBtn}
          onPress={guardar}
        >
          <Text style={s.saveBtnText}>
            {editId
              ? 'Guardar cambios'
              : 'Agregar libro'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.cancelBtn}
          onPress={cancelar}
        >
          <Text style={s.cancelBtnText}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // =========================
  // LISTA
  // =========================

  return (
    <View style={[s.screen, { backgroundColor: theme.bg }] }>
      <ScrollView
        contentContainerStyle={[s.container, { backgroundColor: theme.bg }]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={s.header}>
          <View>
            <Text style={[s.title, { color: theme.textPrimary, fontSize: scaleFont(20) }] }>
              Gestión de libros
            </Text>

            <Text style={[s.subtitle, { color: theme.textMuted, fontSize: scaleFont(13) }] }>
              {libros.length} libros en catálogo
            </Text>
          </View>

          <TouchableOpacity
            style={s.addBtn}
            onPress={() => {
              setForm(EMPTY);
              setEditId(null);
              setVista('form');
            }}
          >
            <Text style={s.addBtnText}>
              + Nuevo
            </Text>
          </TouchableOpacity>
        </View>

        {/* BUSCADOR */}
        <View style={s.searchBox}>
          <Text style={s.searchIcon}>🔍</Text>

          <TextInput
              style={s.searchInput}
              value={busqueda}
              onChangeText={setBusqueda}
              placeholder="Buscar libro..."
              placeholderTextColor={colors.textSubtle}
              accessible={true}
              importantForAccessibility="yes"
              accessibilityLabel="Buscar libro"
              accessibilityHint="Ingresa texto para filtrar los libros"
              returnKeyType="search"
            />

          {busqueda.length > 0 && (
            <TouchableOpacity
              onPress={() => setBusqueda('')}
            >
              <Text style={s.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* STATS */}
        <View style={s.statsRow}>
          <View style={s.statCard}>
            <Text style={s.statEmoji}>📚</Text>
            <Text style={s.statNumber}>
              {libros.length}
            </Text>
            <Text style={s.statLabel}>
              Total
            </Text>
          </View>

          <View style={s.statCard}>
            <Text style={s.statEmoji}>📖</Text>
            <Text style={s.statNumber}>
              {
                libros.filter(
                  (l) => l.tipo === 'libro'
                ).length
              }
            </Text>
            <Text style={s.statLabel}>
              Libros
            </Text>
          </View>

          <View style={s.statCard}>
            <Text style={s.statEmoji}>🎧</Text>
            <Text style={s.statNumber}>
              {
                libros.filter(
                  (l) => l.tipo === 'audio'
                ).length
              }
            </Text>
            <Text style={s.statLabel}>
              Audio
            </Text>
          </View>
        </View>

        {/* LISTADO */}
        {librosFiltrados.length === 0 ? (
          <View style={s.empty}>
            <Text style={s.emptyEmoji}>📭</Text>

            <Text style={s.emptyText}>
              No se encontraron libros
            </Text>
          </View>
        ) : (
          librosFiltrados.map((libro) => (
            <View
              key={libro.id}
              style={s.bookCard}
            >
              <View style={s.bookLeft}>
                <View style={s.bookEmojiBox}>
                  <Text style={s.bookEmoji}>
                    {libro.tipo === 'audio'
                      ? '🎧'
                      : '📖'}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={s.bookTitle}>
                    {libro.titulo}
                  </Text>

                  <Text style={s.bookAuthor}>
                    {libro.autor}
                  </Text>

                  <View style={s.badges}>
                    <View style={s.badge}>
                      <Text style={s.badgeText}>
                        {libro.categoria}
                      </Text>
                    </View>

                    <View
                      style={[
                        s.badge,
                        libro.tipo === 'audio' &&
                          s.audioBadge,
                      ]}
                    >
                      <Text style={s.badgeText}>
                        {libro.tipo === 'audio'
                          ? 'Audio'
                          : 'Libro'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={s.actions}>
                <TouchableOpacity
                  style={s.editBtn}
                  onPress={() => editar(libro)}
                >
                  <Text style={s.actionEmoji}>
                    ✏️
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={s.deleteBtn}
                  onPress={() =>
                    eliminar(libro.id)
                  }
                >
                  <Text style={s.actionEmoji}>
                    🗑️
                  </Text>
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
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },

  addBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },

  addBtnText: {
    color: '#fff',
    fontWeight: '600',
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    marginBottom: 20,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 14,
    color: colors.textPrimary,
  },

  clearText: {
    color: colors.textMuted,
    fontSize: 18,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },

  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    padding: 14,
  },

  statEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },

  bookCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
  },

  bookLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },

  bookEmojiBox: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bookEmoji: {
    fontSize: 28,
  },

  bookTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 15,
  },

  bookAuthor: {
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 12,
  },

  badges: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },

  badge: {
    backgroundColor: colors.bg,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  audioBadge: {
    backgroundColor: '#221738',
  },

  badgeText: {
    color: colors.accent,
    fontSize: 10,
  },

  actions: {
    gap: 8,
  },

  editBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#2B1515',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionEmoji: {
    fontSize: 16,
  },

  empty: {
    alignItems: 'center',
    paddingVertical: 60,
  },

  emptyEmoji: {
    fontSize: 42,
    marginBottom: 10,
  },

  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
  },

  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 14,
  },

  backBtn: {
    color: colors.accent,
    fontSize: 15,
  },

  formTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
  },

  label: {
    color: colors.textMuted,
    marginBottom: 8,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    color: colors.textPrimary,
    marginBottom: 18,
  },

  tipoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },

  tipoBtn: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },

  tipoBtnActive: {
    borderColor: colors.primary,
    backgroundColor: '#1F1733',
  },

  tipoEmoji: {
    fontSize: 26,
    marginBottom: 6,
  },

  tipoText: {
    color: colors.textMuted,
    fontSize: 13,
  },

  tipoTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },

  saveBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },

  cancelBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },

  cancelBtnText: {
    color: colors.textMuted,
    fontSize: 15,
  },
});