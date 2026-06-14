import FichasLista from '@/components/fichas/FichasLista';

export default function FichasAdminScreen() {
  return (
    <FichasLista
      rotaCriar="/(admin)/fichas/criar"
      rotaDetalhes="/(admin)/fichas/[id]"
    />
  );
}
