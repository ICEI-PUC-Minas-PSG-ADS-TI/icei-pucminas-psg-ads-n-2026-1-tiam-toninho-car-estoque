import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useProdutos } from '@/contexts/ProdutosContext';

export default function AdicionarProdutoScreen() {
  const { adicionarProduto, proximoCodigo } = useProdutos();
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState(proximoCodigo);
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [estoqueMinimo, setEstoqueMinimo] = useState('');
  const [descricao, setDescricao] = useState('');

  function validar(): string | null {
    if (!nome.trim() || nome.trim().length < 2) return 'Informe o nome do produto (mín. 2 caracteres).';
    if (!codigo.trim()) return 'Informe o código do produto.';
    if (isNaN(Number(quantidade)) || Number(quantidade) < 0) return 'Quantidade inicial inválida.';
    const precoNum = parseFloat(preco.replace(',', '.'));
    if (isNaN(precoNum) || precoNum <= 0) return 'Preço unitário inválido.';
    if (isNaN(Number(estoqueMinimo)) || Number(estoqueMinimo) < 0) return 'Estoque mínimo inválido.';
    return null;
  }

  function handleCadastrar() {
    const erro = validar();
    if (erro) {
      Alert.alert('Dados inválidos', erro);
      return;
    }

    adicionarProduto({
      nome: nome.trim(),
      codigo: codigo.trim().toUpperCase(),
      descricao: descricao.trim(),
      quantidade_atual: parseInt(quantidade, 10),
      preco_atual: parseFloat(preco.replace(',', '.')),
      estoque_minimo: parseInt(estoqueMinimo, 10),
    });

    Alert.alert('Sucesso', 'Produto cadastrado com sucesso!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <Campo label="Nome do produto *">
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Ex: Óleo Motor 5W30"
            placeholderTextColor="#94A3B8"
          />
        </Campo>

        <Campo label="Código *">
          <TextInput
            style={styles.input}
            value={codigo}
            onChangeText={setCodigo}
            placeholder="Ex: PROD-007"
            placeholderTextColor="#94A3B8"
            autoCapitalize="characters"
          />
        </Campo>

        <View style={styles.linha}>
          <Campo label="Qtd. inicial *" style={{ flex: 1, marginRight: 8 }}>
            <TextInput
              style={styles.input}
              value={quantidade}
              onChangeText={setQuantidade}
              placeholder="0"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
            />
          </Campo>

          <Campo label="Estoque mínimo *" style={{ flex: 1 }}>
            <TextInput
              style={styles.input}
              value={estoqueMinimo}
              onChangeText={setEstoqueMinimo}
              placeholder="0"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
            />
          </Campo>
        </View>

        <Campo label="Preço unitário (R$) *">
          <TextInput
            style={styles.input}
            value={preco}
            onChangeText={setPreco}
            placeholder="0,00"
            placeholderTextColor="#94A3B8"
            keyboardType="decimal-pad"
          />
        </Campo>

        <Campo label="Descrição">
          <TextInput
            style={[styles.input, styles.inputMultilinha]}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descrição opcional do produto..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </Campo>

        <TouchableOpacity style={styles.botao} onPress={handleCadastrar} activeOpacity={0.85}>
          <Text style={styles.botaoTexto}>Cadastrar Produto</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Campo({
  label,
  children,
  style,
}: {
  label: string;
  children: React.ReactNode;
  style?: object;
}) {
  return (
    <View style={[{ marginBottom: 16 }, style]}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  conteudo: { padding: 20, paddingBottom: 40 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1E293B',
  },
  inputMultilinha: { height: 88, paddingTop: 12 },
  linha: { flexDirection: 'row' },
  botao: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
