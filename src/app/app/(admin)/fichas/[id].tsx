import { useLocalSearchParams } from 'expo-router';
import FichaDetalhes from '@/components/fichas/FichaDetalhes';

export default function FichaDetalhesAdminScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <FichaDetalhes fichaId={Number(id)} />;
}
