import CriarFichaForm from '@/components/fichas/CriarFichaForm';

export default function CriarFichaAdminScreen() {
  return <CriarFichaForm rotaDetalhes="/(admin)/fichas/[id]" />;
}
