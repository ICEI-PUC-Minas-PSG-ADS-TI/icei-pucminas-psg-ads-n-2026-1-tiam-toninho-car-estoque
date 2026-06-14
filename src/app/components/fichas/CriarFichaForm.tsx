import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFichas } from '@/contexts/FichasContext';

type Props = { rotaDetalhes: string };

export default function CriarFichaForm({ rotaDetalhes }: Props) {
  const { criarFicha } = useFichas();
  const router = useRouter();

  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [observacoes, setObservacoes] = useState('');

  function formatarPlaca(texto: string) {
    return texto.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 8);
  }

  function validar(): string | null {
    if (!placa.trim() || placa.trim().length < 7) return 'Informe uma placa válida (mín. 7 caracteres).';
    if (!modelo.trim()) return 'Informe o modelo do veículo.';
    if (!nomeCliente.trim()) return 'Informe o nome do proprietário.';
    if (ano && (isNaN(Number(ano)) || Number(ano) < 1900 || Number(ano) > 2030))
      return 'Ano inválido.';
    return null;
  }

  function handleCriar() {
    const erro = validar();
    if (erro) { Alert.alert('Dados inválidos', erro); return; }

    const id = criarFicha({
      placa: placa.trim(),
      modelo: modelo.trim(),
      ano: ano ? parseInt(ano, 10) : null,
      nome_cliente: nomeCliente.trim(),
      observacoes: observacoes.trim(),
    });

    router.replace({ pathname: rotaDetalhes as never, params: { id } });
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.container} contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">

        <Campo label="Placa *">
          <TextInput
            style={styles.input}
            value={placa}
            onChangeText={(t) => setPlaca(formatarPlaca(t))}
            placeholder="Ex: ABC-1234 ou ABC1D23"
            placeholderTextColor="#94A3B8"
            autoCapitalize="characters"
            autoCorrect={false}
          />
        </Campo>

        <Campo label="Nome do proprietário *">
          <TextInput
            style={styles.input}
            value={nomeCliente}
            onChangeText={setNomeCliente}
            placeholder="Ex: João da Silva"
            placeholderTextColor="#94A3B8"
          />
        </Campo>

        <Campo label="Modelo *">
          <TextInput
            style={styles.input}
            value={modelo}
            onChangeText={setModelo}
            placeholder="Ex: Volkswagen Golf 1.4"
            placeholderTextColor="#94A3B8"
          />
        </Campo>

        <Campo label="Ano">
          <TextInput
            style={styles.input}
            value={ano}
            onChangeText={setAno}
            placeholder="Ex: 2022"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            maxLength={4}
          />
        </Campo>

        <Campo label="Observações">
          <TextInput
            style={[styles.input, styles.inputMultilinha]}
            value={observacoes}
            onChangeText={setObservacoes}
            placeholder="Descrição do problema ou observações iniciais..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </Campo>

        <TouchableOpacity style={styles.botao} onPress={handleCriar} activeOpacity={0.85}>
          <Text style={styles.botaoTexto}>Criar Ficha</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 16 }}>
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
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#E2E8F0',
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, color: '#1E293B',
  },
  inputMultilinha: { height: 88, paddingTop: 12 },
  botao: {
    backgroundColor: '#2563EB', borderRadius: 12,
    paddingVertical: 15, alignItems: 'center', marginTop: 8,
  },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
