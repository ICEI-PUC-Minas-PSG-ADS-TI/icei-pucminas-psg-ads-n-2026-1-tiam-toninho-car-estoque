import { Stack } from 'expo-router';

export default function ProdutosLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="adicionar"
        options={{ title: 'Cadastrar Produto', headerBackTitle: 'Voltar', presentation: 'modal' }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: 'Produto', headerBackTitle: 'Voltar', presentation: 'modal' }}
      />
    </Stack>
  );
}
