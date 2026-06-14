import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { Produto, ProdutoFormData } from '@/types';

type ProdutosContextData = {
  produtos: Produto[];
  proximoCodigo: string;
  adicionarProduto: (data: ProdutoFormData) => void;
  editarProduto: (id: number, data: ProdutoFormData) => void;
  excluirProduto: (id: number) => void;
  buscarPorId: (id: number) => Produto | undefined;
  atualizarQuantidade: (id: number, delta: number) => void;
};

type ProdutoRow = {
  id_produto: number;
  codigo: string;
  nome: string;
  descricao: string | null;
  quantidade_atual: number;
  preco_atual: number;
  estoque_minimo: number;
  data_cadastro: string;
};

function mapRow(row: ProdutoRow): Produto {
  return {
    id: row.id_produto,
    codigo: row.codigo,
    nome: row.nome,
    descricao: row.descricao ?? '',
    quantidade_atual: row.quantidade_atual,
    preco_atual: Number(row.preco_atual),
    estoque_minimo: row.estoque_minimo,
    data_cadastro: row.data_cadastro,
  };
}

const ProdutosContext = createContext<ProdutosContextData>({} as ProdutosContextData);

export function ProdutosProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  async function carregar() {
    const { data } = await supabase
      .from('produto')
      .select('*')
      .order('data_cadastro', { ascending: false });
    if (data) setProdutos((data as ProdutoRow[]).map(mapRow));
  }

  useEffect(() => { carregar(); }, []);

  const proximoCodigo = `PROD-${String(produtos.length + 1).padStart(3, '0')}`;

  function adicionarProduto(data: ProdutoFormData) {
    const temp: Produto = { ...data, id: Date.now(), data_cadastro: new Date().toISOString().split('T')[0] };
    setProdutos((prev) => [temp, ...prev]);
    supabase.from('produto').insert({
      codigo: data.codigo,
      nome: data.nome,
      descricao: data.descricao,
      quantidade_atual: data.quantidade_atual,
      preco_atual: data.preco_atual,
      estoque_minimo: data.estoque_minimo,
    }).then(() => carregar());
  }

  function editarProduto(id: number, data: ProdutoFormData) {
    setProdutos((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    supabase.from('produto').update({
      codigo: data.codigo,
      nome: data.nome,
      descricao: data.descricao,
      quantidade_atual: data.quantidade_atual,
      preco_atual: data.preco_atual,
      estoque_minimo: data.estoque_minimo,
    }).eq('id_produto', id).then(() => carregar());
  }

  function excluirProduto(id: number) {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
    supabase.from('produto').delete().eq('id_produto', id);
  }

  function buscarPorId(id: number) {
    return produtos.find((p) => p.id === id);
  }

  function atualizarQuantidade(id: number, delta: number) {
    const produto = produtos.find((p) => p.id === id);
    if (!produto) return;
    const novaQtd = Math.max(0, produto.quantidade_atual + delta);
    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantidade_atual: novaQtd } : p)),
    );
    supabase.from('produto').update({ quantidade_atual: novaQtd }).eq('id_produto', id);
  }

  return (
    <ProdutosContext.Provider
      value={{ produtos, proximoCodigo, adicionarProduto, editarProduto, excluirProduto, buscarPorId, atualizarQuantidade }}
    >
      {children}
    </ProdutosContext.Provider>
  );
}

export function useProdutos() {
  return useContext(ProdutosContext);
}
