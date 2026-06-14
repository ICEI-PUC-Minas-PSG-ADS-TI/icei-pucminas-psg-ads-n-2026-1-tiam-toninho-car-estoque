import { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMovimentacoes } from '@/contexts/MovimentacoesContext';
import { useProdutos } from '@/contexts/ProdutosContext';
import { Movimentacao, TipoMovimentacao } from '@/types';

type FiltroPeriodo = 'hoje' | 'semana' | 'mes' | 'todos';
type FiltroTipo = 'todos' | TipoMovimentacao;

function filtrarPorPeriodo(lista: Movimentacao[], periodo: FiltroPeriodo): Movimentacao[] {
  if (periodo === 'todos') return lista;
  const agora = new Date();
  return lista.filter((m) => {
    const data = new Date(m.data_hora);
    if (periodo === 'hoje') return data.toDateString() === agora.toDateString();
    if (periodo === 'semana') {
      return (agora.getTime() - data.getTime()) / (1000 * 60 * 60 * 24) <= 7;
    }
    if (periodo === 'mes') {
      return data.getMonth() === agora.getMonth() && data.getFullYear() === agora.getFullYear();
    }
    return true;
  });
}

function formatarDataHora(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

const PERIODOS: { label: string; value: FiltroPeriodo }[] = [
  { label: 'Hoje', value: 'hoje' },
  { label: 'Semana', value: 'semana' },
  { label: 'Mês', value: 'mes' },
  { label: 'Todos', value: 'todos' },
];

const TIPOS: { label: string; value: FiltroTipo; cor: string; bg: string; icone: keyof typeof Ionicons.glyphMap }[] = [
  { label: 'Todos',   value: 'todos',   cor: '#6B7280', bg: '#F3F4F6', icone: 'list-outline' },
  { label: 'Entrada', value: 'entrada', cor: '#059669', bg: '#D1FAE5', icone: 'arrow-up-outline' },
  { label: 'Saída',   value: 'saida',   cor: '#D97706', bg: '#FEF3C7', icone: 'arrow-down-outline' },
  { label: 'Baixa',   value: 'baixa',   cor: '#EF4444', bg: '#FEE2E2', icone: 'close-outline' },
];

const BADGE: Record<TipoMovimentacao, { bg: string; cor: string; label: string }> = {
  entrada: { bg: '#D1FAE5', cor: '#059669', label: 'Entrada' },
  saida:   { bg: '#FEF3C7', cor: '#D97706', label: 'Saída' },
  baixa:   { bg: '#FEE2E2', cor: '#EF4444', label: 'Baixa' },
};

const ICONE_TIPO: Record<TipoMovimentacao, keyof typeof Ionicons.glyphMap> = {
  entrada: 'arrow-up-circle',
  saida: 'arrow-down-circle',
  baixa: 'close-circle',
};

export default function RelatoriosScreen() {
  const { movimentacoes } = useMovimentacoes();
  const { produtos } = useProdutos();
  const [periodo, setPeriodo] = useState<FiltroPeriodo>('mes');
  const [tipo, setTipo] = useState<FiltroTipo>('todos');

  const porPeriodo = useMemo(
    () => filtrarPorPeriodo(movimentacoes, periodo),
    [movimentacoes, periodo],
  );

  const filtradas = useMemo(() => {
    if (tipo === 'todos') return porPeriodo;
    return porPeriodo.filter((m) => m.tipo === tipo);
  }, [porPeriodo, tipo]);

  const resumo = useMemo(() => {
    const calc = (t: TipoMovimentacao) => {
      const lista = porPeriodo.filter((m) => m.tipo === t);
      return { count: lista.length, itens: lista.reduce((s, m) => s + m.quantidade, 0) };
    };
    return { entrada: calc('entrada'), saida: calc('saida'), baixa: calc('baixa') };
  }, [porPeriodo]);

  const estoque = useMemo(() => ({
    total: produtos.length,
    baixo: produtos.filter((p) => p.quantidade_atual > 0 && p.quantidade_atual <= p.estoque_minimo).length,
    zerado: produtos.filter((p) => p.quantidade_atual === 0).length,
    valor: produtos.reduce((s, p) => s + p.quantidade_atual * p.preco_atual, 0),
  }), [produtos]);

  return (
    <ScrollView
      style={s.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header limpo — igual ao de Produtos */}
      <View style={s.header}>
        <Text style={s.titulo}>Relatórios</Text>
        <Text style={s.subtitulo}>Estoque e movimentações</Text>
      </View>

      {/* Filtros de período */}
      <View style={s.bloco}>
        <Text style={s.blocoTitulo}>Período</Text>
        <View style={s.chipRow}>
          {PERIODOS.map((p) => (
            <TouchableOpacity
              key={p.value}
              style={[s.chip, periodo === p.value && s.chipAtivo]}
              onPress={() => setPeriodo(p.value)}
            >
              <Text style={[s.chipTexto, periodo === p.value && s.chipTextoAtivo]}>
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Cards de resumo de movimentações */}
      <View style={s.bloco}>
        <Text style={s.blocoTitulo}>Movimentações no período</Text>
        <View style={s.cardsRow}>
          {(['entrada', 'saida', 'baixa'] as TipoMovimentacao[]).map((t) => {
            const cfg = TIPOS.find((x) => x.value === t)!;
            const dado = resumo[t];
            return (
              <View key={t} style={s.cardResumo}>
                <View style={[s.cardResumoIcone, { backgroundColor: cfg.bg }]}>
                  <Ionicons name={cfg.icone} size={18} color={cfg.cor} />
                </View>
                <Text style={[s.cardResumoValor, { color: cfg.cor }]}>{dado.count}</Text>
                <Text style={s.cardResumoLabel}>{cfg.label}</Text>
                <Text style={s.cardResumoSub}>{dado.itens} un.</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Painel de estoque atual */}
      <View style={s.bloco}>
        <Text style={s.blocoTitulo}>Estoque atual</Text>
        <View style={s.estoqueCard}>
          <View style={s.estoqueItem}>
            <View style={[s.estoqueIcone, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="cube-outline" size={16} color="#3B82F6" />
            </View>
            <Text style={s.estoqueNumero}>{estoque.total}</Text>
            <Text style={s.estoqueLabel}>Produtos</Text>
          </View>
          <View style={s.estoqueDivider} />
          <View style={s.estoqueItem}>
            <View style={[s.estoqueIcone, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="warning-outline" size={16} color="#D97706" />
            </View>
            <Text style={[s.estoqueNumero, { color: '#D97706' }]}>{estoque.baixo}</Text>
            <Text style={s.estoqueLabel}>Est. Baixo</Text>
          </View>
          <View style={s.estoqueDivider} />
          <View style={s.estoqueItem}>
            <View style={[s.estoqueIcone, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="close-circle-outline" size={16} color="#EF4444" />
            </View>
            <Text style={[s.estoqueNumero, { color: '#EF4444' }]}>{estoque.zerado}</Text>
            <Text style={s.estoqueLabel}>Zerados</Text>
          </View>
          <View style={s.estoqueDivider} />
          <View style={s.estoqueItem}>
            <View style={[s.estoqueIcone, { backgroundColor: '#D1FAE5' }]}>
              <Ionicons name="cash-outline" size={16} color="#059669" />
            </View>
            <Text style={[s.estoqueNumero, { color: '#059669', fontSize: 13 }]}>
              {estoque.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
            <Text style={s.estoqueLabel}>Valor Total</Text>
          </View>
        </View>
      </View>

      {/* Histórico filtrado por tipo */}
      <View style={s.bloco}>
        <View style={s.historicoHeader}>
          <Text style={s.blocoTitulo}>Histórico</Text>
          {/* Chips de tipo inline com o título */}
          <View style={s.chipRow}>
            {TIPOS.map((t) => (
              <TouchableOpacity
                key={t.value}
                style={[
                  s.chipTipo,
                  tipo === t.value && { backgroundColor: t.cor, borderColor: t.cor },
                ]}
                onPress={() => setTipo(t.value)}
              >
                <Text style={[s.chipTipoTexto, tipo === t.value && { color: '#FFF' }]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={s.contagemHistorico}>
          {filtradas.length} registro{filtradas.length !== 1 ? 's' : ''}
        </Text>

        {filtradas.length === 0 ? (
          <View style={s.vazio}>
            <Ionicons name="document-text-outline" size={44} color="#D1D5DB" />
            <Text style={s.vazioTexto}>Nenhuma movimentação encontrada</Text>
          </View>
        ) : (
          <View style={{ gap: 10 }}>
            {filtradas.map((m) => {
              const b = BADGE[m.tipo];
              return (
                <View key={m.id} style={s.item}>
                  {/* Ícone de tipo à esquerda */}
                  <View style={[s.itemIcone, { backgroundColor: b.bg }]}>
                    <Ionicons name={ICONE_TIPO[m.tipo]} size={20} color={b.cor} />
                  </View>

                  {/* Conteúdo central */}
                  <View style={s.itemConteudo}>
                    <View style={s.itemLinha1}>
                      <Text style={s.itemProduto} numberOfLines={1}>{m.nome_produto}</Text>
                      <View style={[s.badge, { backgroundColor: b.bg }]}>
                        <Text style={[s.badgeTexto, { color: b.cor }]}>{b.label}</Text>
                      </View>
                    </View>
                    <Text style={s.itemSub}>{m.motivo}</Text>
                    <View style={s.itemRodape}>
                      <Text style={[s.itemQtd, { color: b.cor }]}>
                        {m.tipo === 'entrada' ? '+' : '-'}{m.quantidade} un.
                      </Text>
                      <Text style={s.itemData}>{formatarDataHora(m.data_hora)}</Text>
                    </View>
                    <Text style={s.itemUsuario}>por {m.nome_usuario}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },

  // Header limpo
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#F3F4F6',
  },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  subtitulo: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },

  // Blocos de seção
  bloco: { paddingHorizontal: 16, marginBottom: 20 },
  blocoTitulo: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 10 },

  // Chips de período
  chipRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipAtivo: { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
  chipTexto: { fontSize: 13, fontWeight: '500', color: '#374151' },
  chipTextoAtivo: { color: '#FFF' },

  // Cards de resumo (3 em linha)
  cardsRow: { flexDirection: 'row', gap: 10 },
  cardResumo: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardResumoIcone: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  cardResumoValor: { fontSize: 26, fontWeight: 'bold' },
  cardResumoLabel: { fontSize: 12, color: '#6B7280', fontWeight: '500' },
  cardResumoSub: { fontSize: 11, color: '#9CA3AF' },

  // Painel de estoque
  estoqueCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  estoqueItem: { flex: 1, alignItems: 'center', gap: 4 },
  estoqueIcone: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  estoqueNumero: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  estoqueLabel: { fontSize: 10, color: '#9CA3AF', textAlign: 'center' },
  estoqueDivider: { width: 1, backgroundColor: '#F3F4F6', marginVertical: 8 },

  // Histórico
  historicoHeader: { marginBottom: 8 },
  contagemHistorico: { fontSize: 12, color: '#9CA3AF', marginBottom: 12 },

  // Chips de tipo (menores, abaixo do título)
  chipTipo: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipTipoTexto: { fontSize: 12, fontWeight: '500', color: '#374151' },

  // Item do histórico
  item: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  itemIcone: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  itemConteudo: { flex: 1 },
  itemLinha1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  itemProduto: { fontSize: 14, fontWeight: '700', color: '#111827', flex: 1, marginRight: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  badgeTexto: { fontSize: 11, fontWeight: '700' },
  itemSub: { fontSize: 12, color: '#6B7280', marginBottom: 6 },
  itemRodape: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemQtd: { fontSize: 13, fontWeight: '700' },
  itemData: { fontSize: 11, color: '#9CA3AF' },
  itemUsuario: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },

  // Estado vazio
  vazio: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  vazioTexto: { fontSize: 14, color: '#9CA3AF' },
});
