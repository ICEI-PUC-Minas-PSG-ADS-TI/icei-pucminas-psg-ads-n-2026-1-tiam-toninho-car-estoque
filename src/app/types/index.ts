export type Produto = {
  id: number;
  codigo: string;
  nome: string;
  descricao: string;
  quantidade_atual: number;
  preco_atual: number;
  estoque_minimo: number;
  data_cadastro: string;
};

export type ProdutoFormData = Omit<Produto, 'id' | 'data_cadastro'>;

export type StatusFicha = 'aberta' | 'concluida' | 'cancelada';

export type ItemFicha = {
  id: number;
  id_produto: number;
  nome_produto: string;
  quantidade: number;
  preco_unitario: number;
};

export type FichaCarro = {
  id: number;
  placa: string;
  modelo: string;
  ano: number | null;
  nome_cliente: string;
  data_atendimento: string;
  observacoes: string;
  status: StatusFicha;
  itens: ItemFicha[];
};

export type TipoMovimentacao = 'entrada' | 'saida' | 'baixa';

export type Movimentacao = {
  id: number;
  id_produto: number;
  nome_produto: string;
  tipo: TipoMovimentacao;
  quantidade: number;
  nome_usuario: string;
  data_hora: string;
  motivo: string;
};
