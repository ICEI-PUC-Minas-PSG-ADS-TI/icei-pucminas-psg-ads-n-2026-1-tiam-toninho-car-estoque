import FichasLista from '@/components/fichas/FichasLista';

export default function FichasFuncionarioScreen() {
  return (
    <FichasLista
      rotaCriar="/(funcionario)/fichas/criar"
      rotaDetalhes="/(funcionario)/fichas/[id]"
    />
  );
}
