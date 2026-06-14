import { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProdutos } from '@/contexts/ProdutosContext';
import { Produto } from '@/types';

type Filtro = 'todos' | 'disponiveis' | 'baixo';

function getCorEstoque(qty: number, min: number): string {
  if (qty <= 0) return '#EF4444';
  if (qty <= min) return '#F59E0B';
  return '#22C55E';
}

function getPercentualBarra(qty: number, min: number): number {
  if (qty <= 0) return 0;
  return Math.min(qty / Math.max(min * 3, 1), 1);
}

export default function ProdutosFuncionarioScreen() {
  const { produtos } = useProdutos();
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('todos');

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) => {
      const termoBusca = busca.toLowerCase();
      const buscaOk =
        busca === '' ||
        p.nome.toLowerCase().includes(termoBusca) ||
        p.codigo.toLowerCase().includes(termoBusca);

      const filtroOk =
        filtro === 'todos' ||
        (filtro === 'disponiveis' && p.quantidade_atual > p.estoque_minimo) ||
        (filtro === 'baixo' && p.quantidade_atual <= p.estoque_minimo);

      return buscaOk && filtroOk;
    });
  }, [produtos, busca, filtro]);

  const renderItem: ListRenderItem<Produto> = ({ item }) => {
    const cor = getCorEstoque(item.quantidade_atual, item.estoque_minimo);
    const percentual = getPercentualBarra(item.quantidade_atual, item.estoque_minimo);

    return (
      <View style={styles.item}>
        <View style={styles.itemTop}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemNome} numberOfLines={1}>{item.nome}</Text>
            <Text style={styles.itemCodigo}>{item.codigo}</Text>
          </View>
          <View style={styles.itemDireita}>
            <Text style={[styles.itemQty, { color: cor }]}>{item.quantidade_atual} un.</Text>
            <Text style={styles.itemPreco}>
              {item.preco_atual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
        </View>
        <View style={styles.barraFundo}>
          <View style={[styles.barraPreenchimento, { width: `${percentual * 100}%`, backgroundColor: cor }]} />
        </View>
        {item.quantidade_atual <= item.estoque_minimo && (
          <Text style={styles.avisoEstoque}>Abaixo do mínimo ({item.estoque_minimo} un.)</Text>
        )}
      </View>
    );
  };

  const FILTROS: { key: Filtro; label: string }[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'disponiveis', label: 'Disponíveis' },
    { key: 'baixo', label: 'Estoque Baixo' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Produtos</Text>
        <Text style={styles.contagem}>{produtosFiltrados.length} itens</Text>
      </View>

      <View style={styles.buscaContainer}>
        <Ionicons name="search-outline" size={18} color="#94A3B8" style={styles.buscaIcone} />
        <TextInput
          style={styles.buscaInput}
          value={busca}
          onChangeText={setBusca}
          placeholder="Buscar por nome ou código..."
          placeholderTextColor="#94A3B8"
          autoCorrect={false}
        />
      </View>

      <View style={styles.filtros}>
        {FILTROS.map((f) => (
          <View
            key={f.key}
            style={[styles.chip, filtro === f.key && styles.chipAtivo]}
          >
            <Text
              style={[styles.chipTexto, filtro === f.key && styles.chipTextoAtivo]}
              onPress={() => setFiltro(f.key)}
            >
              {f.label}
            </Text>
          </View>
        ))}
      </View>

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Ionicons name="cube-outline" size={52} color="#CBD5E1" />
            <Text style={styles.vazioTexto}>Nenhum produto encontrado</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  contagem: { fontSize: 13, color: '#94A3B8', marginTop: 2 },
  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  buscaIcone: { marginRight: 8 },
  buscaInput: { flex: 1, fontSize: 15, color: '#1E293B' },
  filtros: { flexDirection: 'row', gap: 8, paddingHorizontal: 20, marginBottom: 12 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipAtivo: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  chipTexto: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  chipTextoAtivo: { color: '#fff', fontWeight: '600' },
  lista: { paddingHorizontal: 20, paddingBottom: 24 },
  item: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  itemInfo: { flex: 1, marginRight: 8 },
  itemNome: { fontSize: 15, fontWeight: '600', color: '#1E293B' },
  itemCodigo: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  itemDireita: { alignItems: 'flex-end' },
  itemQty: { fontSize: 15, fontWeight: '700' },
  itemPreco: { fontSize: 12, color: '#64748B', marginTop: 2 },
  barraFundo: { height: 6, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' },
  barraPreenchimento: { height: '100%', borderRadius: 4 },
  avisoEstoque: { fontSize: 11, color: '#F59E0B', marginTop: 6, fontWeight: '500' },
  vazio: { alignItems: 'center', marginTop: 80, gap: 12 },
  vazioTexto: { fontSize: 15, color: '#94A3B8' },
});
