import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProdutosProvider } from '@/contexts/ProdutosContext';
import { MovimentacoesProvider } from '@/contexts/MovimentacoesContext';
import { FichasProvider } from '@/contexts/FichasContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProdutosProvider>
        <MovimentacoesProvider>
          <FichasProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </FichasProvider>
        </MovimentacoesProvider>
      </ProdutosProvider>
    </AuthProvider>
  );
}
