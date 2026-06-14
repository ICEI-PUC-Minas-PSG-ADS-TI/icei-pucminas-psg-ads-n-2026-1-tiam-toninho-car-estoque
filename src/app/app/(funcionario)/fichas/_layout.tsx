import { Stack } from 'expo-router';

export default function FichasLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="criar" options={{ title: 'Nova Ficha', headerBackTitle: 'Voltar', presentation: 'modal' }} />
      <Stack.Screen name="[id]" options={{ title: 'Ficha do Carro', headerBackTitle: 'Voltar', presentation: 'modal' }} />
    </Stack>
  );
}
