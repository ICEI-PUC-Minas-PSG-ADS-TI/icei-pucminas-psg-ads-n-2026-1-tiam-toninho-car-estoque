import { useState, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFichas } from '@/contexts/FichasContext';
import { useProdutos } from '@/contexts/ProdutosContext';
import { useMovimentacoes } from '@/contexts/MovimentacoesContext';
import { useAuth } from '@/contexts/AuthContext';
import { FichaCarro, StatusFicha, Produto } from '@/types';

const STATUS_CONFIG: Record<StatusFicha, { label: string; cor: string; proximo: StatusFicha | null }> = {
  aberta:    { label: 'Aberta',    cor: '#3B82F6', proximo: 'concluida' },
  concluida: { label: 'Concluída', cor: '#22C55E', proximo: null },
  cancelada: { label: 'Cancelada', cor: '#EF4444', proximo: null },
};

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function FichaDetalhes({ fichaId }: { fichaId: number }) {
  const { buscarPorId, atualizarFicha, excluirFicha, adicionarItem, removerItem } = useFichas();
  const { produtos, atualizarQuantidade } = useProdutos();
  const { registrarMovimentacao } = useMovimentacoes();
  const { usuario } = useAuth();
  const router = useRouter();

  const [observacoes, setObservacoes] = useState<string | null>(null);
  const [adicionandoPeca, setAdicionandoPeca] = useState(false);
  const [buscaPeca, setBuscaPeca] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [qtdPeca, setQtdPeca] = useState('');

  const ficha = buscarPorId(fichaId);
  if (!ficha) return null;

  const observacoesAtual = observacoes ?? ficha.observacoes;
  const status = STATUS_CONFIG[ficha.status];

  const total = ficha.itens.reduce((acc, i) => acc + i.quantidade * i.preco_unitario, 0);

  const resultadosBusca = useMemo(() => {
    if (!buscaPeca.trim() || produtoSelecionado) return [];
    const t = buscaPeca.toLowerCase();
    return produtos.filter(
      (p) => p.nome.toLowerCase().includes(t) || p.codigo.toLowerCase().includes(t),
    ).slice(0, 5);
  }, [buscaPeca, produtos, produtoSelecionado]);

  function handleSalvar() {
    atualizarFicha(ficha.id, { observacoes: observacoesAtual });
    Alert.alert('Salvo', 'Ficha atualizada com sucesso.');
  }

  function handleConcluir() {
    Alert.alert('Concluir atendimento', 'Deseja marcar esta ficha como concluída?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Concluir', onPress: () => atualizarFicha(ficha.id, { status: 'concluida' }) },
    ]);
  }

  function handleCancelar() {
    Alert.alert('Cancelar atendimento', 'Deseja cancelar esta ficha?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Cancelar ficha', style: 'destructive', onPress: () => atualizarFicha(ficha.id, { status: 'cancelada' }) },
    ]);
  }

  function handleExcluir() {
    Alert.alert('Excluir Ficha', `Deseja excluir a ficha de ${ficha.placa}? Esta ação não pode ser desfeita.`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => { excluirFicha(ficha.id); router.back(); } },
    ]);
  }

  function handleAdicionarPeca() {
    if (!produtoSelecionado) { Alert.alert('Atenção', 'Selecione um produto.'); return; }
    const qty = parseInt(qtdPeca, 10);
    if (isNaN(qty) || qty <= 0) { Alert.alert('Atenção', 'Informe uma quantidade válida.'); return; }
    if (qty > produtoSelecionado.quantidade_atual) {
      Alert.alert('Estoque insuficiente', `Estoque atual: ${produtoSelecionado.quantidade_atual} un.`);
      return;
    }

    adicionarItem(ficha.id, {
      id_produto: produtoSelecionado.id,
      nome_produto: produtoSelecionado.nome,
      quantidade: qty,
      preco_unitario: produtoSelecionado.preco_atual,
    });

    atualizarQuantidade(produtoSelecionado.id, -qty);

    registrarMovimentacao({
      id_produto: produtoSelecionado.id,
      nome_produto: produtoSelecionado.nome,
      tipo: 'saida',
      quantidade: qty,
      nome_usuario: usuario?.nome ?? 'Usuário',
      data_hora: new Date().toISOString(),
      motivo: `Ficha ${ficha.placa} — ${ficha.nome_cliente}`,
    });

    setAdicionandoPeca(false);
    setBuscaPeca('');
    setProdutoSelecionado(null);
    setQtdPeca('');
  }

  function handleRemoverItem(id_item: number, nome: string) {
    Alert.alert('Remover peça', `Remover "${nome}" desta ficha?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => removerItem(ficha.id, id_item) },
    ]);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.container} contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">

        {/* Card principal do veículo */}
        <View style={styles.carroCard}>
          <View style={styles.carroCardTopo}>
            <View>
              <Text style={styles.placa}>{ficha.placa}</Text>
              <Text style={styles.modelo}>{ficha.modelo}{ficha.ano ? ` • ${ficha.ano}` : ''}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: status.cor + '20', borderColor: status.cor }]}>
              <Text style={[styles.statusTexto, { color: status.cor }]}>{status.label}</Text>
            </View>
          </View>
          <View style={styles.carroCardInfo}>
            <Ionicons name="person-outline" size={14} color="#64748B" />
            <Text style={styles.carroInfoTexto}>{ficha.nome_cliente}</Text>
          </View>
          <View style={styles.carroCardInfo}>
            <Ionicons name="calendar-outline" size={14} color="#64748B" />
            <Text style={styles.carroInfoTexto}>{formatarData(ficha.data_atendimento)}</Text>
          </View>
        </View>

        {/* Ações de status */}
        {ficha.status === 'aberta' && (
          <View style={styles.acoesStatus}>
            <TouchableOpacity style={styles.btnConcluir} onPress={handleConcluir} activeOpacity={0.8}>
              <Ionicons name="checkmark-circle-outline" size={16} color="#fff" />
              <Text style={styles.btnConcluirTexto}>Concluir Atendimento</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCancelarStatus} onPress={handleCancelar} activeOpacity={0.8}>
              <Ionicons name="close-circle-outline" size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        )}

        {/* Observações */}
        <Text style={styles.secaoTitulo}>Observações</Text>
        <TextInput
          style={[styles.input, styles.inputMultilinha]}
          value={observacoesAtual}
          onChangeText={setObservacoes}
          placeholder="Nenhuma observação..."
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          editable={ficha.status === 'aberta'}
        />

        {/* Peças utilizadas */}
        <View style={styles.secaoHeader}>
          <Text style={styles.secaoTitulo}>Peças utilizadas</Text>
          {ficha.status === 'aberta' && (
            <TouchableOpacity onPress={() => setAdicionandoPeca(!adicionandoPeca)} activeOpacity={0.7}>
              <Text style={styles.adicionarPecaBtn}>
                {adicionandoPeca ? 'Cancelar' : '+ Adicionar'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Formulário inline para adicionar peça */}
        {adicionandoPeca && (
          <View style={styles.formPeca}>
            <View style={styles.buscaContainer}>
              <Ionicons name="search-outline" size={16} color="#94A3B8" style={{ marginRight: 6 }} />
              <TextInput
                style={styles.buscaInput}
                value={buscaPeca}
                onChangeText={(t) => { setBuscaPeca(t); setProdutoSelecionado(null); }}
                placeholder="Buscar produto..."
                placeholderTextColor="#94A3B8"
                autoCorrect={false}
              />
              {(buscaPeca || produtoSelecionado) && (
                <TouchableOpacity onPress={() => { setBuscaPeca(''); setProdutoSelecionado(null); }}>
                  <Ionicons name="close-circle" size={16} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            {resultadosBusca.length > 0 && (
              <View style={styles.resultados}>
                {resultadosBusca.map((p) => (
                  <TouchableOpacity key={p.id} style={styles.resultadoItem}
                    onPress={() => { setProdutoSelecionado(p); setBuscaPeca(p.nome); }} activeOpacity={0.7}>
                    <Text style={styles.resultadoNome}>{p.nome}</Text>
                    <Text style={styles.resultadoInfo}>
                      {p.codigo} • {p.quantidade_atual} un. • {p.preco_atual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {produtoSelecionado && (
              <View style={styles.pecaSelecionadaCard}>
                <Text style={styles.pecaSelecionadaNome}>{produtoSelecionado.nome}</Text>
                <Text style={styles.pecaSelecionadaInfo}>
                  Estoque: {produtoSelecionado.quantidade_atual} un. • {produtoSelecionado.preco_atual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/un.
                </Text>
              </View>
            )}

            <View style={styles.formPecaRow}>
              <TextInput
                style={[styles.input, styles.inputQty]}
                value={qtdPeca}
                onChangeText={setQtdPeca}
                placeholder="Qtd."
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.btnAdicionarPeca} onPress={handleAdicionarPeca} activeOpacity={0.85}>
                <Text style={styles.btnAdicionarPecaTexto}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Lista de itens */}
        {ficha.itens.length === 0 ? (
          <Text style={styles.semPecas}>Nenhuma peça registrada nesta ficha.</Text>
        ) : (
          ficha.itens.map((item) => (
            <View key={item.id} style={styles.itemPeca}>
              <View style={styles.itemPecaInfo}>
                <Text style={styles.itemPecaNome}>{item.nome_produto}</Text>
                <Text style={styles.itemPecaDetalhes}>
                  {item.quantidade} un. × {item.preco_unitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Text>
              </View>
              <View style={styles.itemPecaDireita}>
                <Text style={styles.itemPecaSubtotal}>
                  {(item.quantidade * item.preco_unitario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Text>
                {ficha.status === 'aberta' && (
                  <TouchableOpacity onPress={() => handleRemoverItem(item.id, item.nome_produto)}>
                    <Ionicons name="trash-outline" size={16} color="#EF4444" style={{ marginTop: 4 }} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}

        {/* Total */}
        {total > 0 && (
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total da ficha</Text>
            <Text style={styles.totalValor}>
              {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
        )}

        {/* Botões de ação */}
        {ficha.status === 'aberta' && (
          <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar} activeOpacity={0.85}>
            <Text style={styles.botaoSalvarTexto}>Salvar Observações</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.botaoExcluir} onPress={handleExcluir} activeOpacity={0.85}>
          <Ionicons name="trash-outline" size={16} color="#EF4444" />
          <Text style={styles.botaoExcluirTexto}>Excluir Ficha</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  conteudo: { padding: 20, paddingBottom: 40 },
  carroCard: {
    backgroundColor: '#1E293B', borderRadius: 16, padding: 18, marginBottom: 16,
  },
  carroCardTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  placa: { fontSize: 24, fontWeight: 'bold', color: '#fff', letterSpacing: 2 },
  modelo: { fontSize: 14, color: '#94A3B8', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  statusTexto: { fontSize: 11, fontWeight: '700' },
  carroCardInfo: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  carroInfoTexto: { fontSize: 13, color: '#CBD5E1' },
  acoesStatus: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  btnConcluir: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: '#22C55E', borderRadius: 10, paddingVertical: 12,
  },
  btnConcluirTexto: { color: '#fff', fontWeight: '700', fontSize: 14 },
  btnCancelarStatus: {
    width: 44, height: 44, borderRadius: 10, borderWidth: 1.5,
    borderColor: '#EF4444', justifyContent: 'center', alignItems: 'center',
  },
  secaoTitulo: { fontSize: 15, fontWeight: '700', color: '#1E293B', marginBottom: 10, marginTop: 4 },
  secaoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  adicionarPecaBtn: { fontSize: 14, color: '#2563EB', fontWeight: '600' },
  input: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#E2E8F0',
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: '#1E293B',
  },
  inputMultilinha: { height: 80, paddingTop: 12, marginBottom: 16 },
  formPeca: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12,
  },
  buscaContainer: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 8, marginBottom: 8,
  },
  buscaInput: { flex: 1, fontSize: 14, color: '#1E293B' },
  resultados: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, marginBottom: 8, overflow: 'hidden' },
  resultadoItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  resultadoNome: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  resultadoInfo: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  pecaSelecionadaCard: {
    backgroundColor: '#EFF6FF', borderRadius: 8, padding: 10, marginBottom: 8,
    borderLeftWidth: 3, borderLeftColor: '#2563EB',
  },
  pecaSelecionadaNome: { fontSize: 14, fontWeight: '600', color: '#1E40AF' },
  pecaSelecionadaInfo: { fontSize: 12, color: '#3B82F6', marginTop: 2 },
  formPecaRow: { flexDirection: 'row', gap: 10 },
  inputQty: { width: 80, textAlign: 'center' },
  btnAdicionarPeca: {
    flex: 1, backgroundColor: '#2563EB', borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  btnAdicionarPecaTexto: { color: '#fff', fontWeight: '700', fontSize: 14 },
  semPecas: { fontSize: 14, color: '#94A3B8', textAlign: 'center', marginVertical: 16 },
  itemPeca: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 8,
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  itemPecaInfo: { flex: 1, marginRight: 8 },
  itemPecaNome: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  itemPecaDetalhes: { fontSize: 12, color: '#64748B', marginTop: 2 },
  itemPecaDireita: { alignItems: 'flex-end' },
  itemPecaSubtotal: { fontSize: 14, fontWeight: '700', color: '#2563EB' },
  totalCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#1E293B', borderRadius: 12, padding: 16, marginTop: 8, marginBottom: 20,
  },
  totalLabel: { fontSize: 14, color: '#94A3B8', fontWeight: '500' },
  totalValor: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  botaoSalvar: {
    backgroundColor: '#2563EB', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center', marginBottom: 12,
  },
  botaoSalvarTexto: { color: '#fff', fontSize: 15, fontWeight: '700' },
  botaoExcluir: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderWidth: 1.5, borderColor: '#EF4444', borderRadius: 12, paddingVertical: 13,
  },
  botaoExcluirTexto: { color: '#EF4444', fontSize: 15, fontWeight: '600' },
});
