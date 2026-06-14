import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!usuario) {
    return <Redirect href="/login" />;
  }

  if (usuario.perfil === 'admin') {
    return <Redirect href="/(admin)" />;
  }

  return <Redirect href="/(funcionario)" />;
}
