import CriarFichaForm from '@/components/fichas/CriarFichaForm';

export default function CriarFichaFuncionarioScreen() {
  return <CriarFichaForm rotaDetalhes="/(funcionario)/fichas/[id]" />;
}
