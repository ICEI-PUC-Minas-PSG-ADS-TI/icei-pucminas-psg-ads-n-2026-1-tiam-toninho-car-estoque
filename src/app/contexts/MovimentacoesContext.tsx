import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { Movimentacao, TipoMovimentacao } from '@/types';

type NovaMovimentacao = Omit<Movimentacao, 'id'>;

type MovimentacoesContextData = {
  movimentacoes: Movimentacao[];
  registrarMovimentacao: (data: NovaMovimentacao) => void;
};

type MovimentacaoRow = {
  id_movimentacao: number;
  id_produto: number;
  nome_produto: string;
  tipo: string;
  quantidade: number;
  nome_usuario: string;
  data_hora: string;
  motivo: string | null;
};

function mapRow(row: MovimentacaoRow): Movimentacao {
  return {
    id: row.id_movimentacao,
    id_produto: row.id_produto,
    nome_produto: row.nome_produto,
    tipo: row.tipo as TipoMovimentacao,
    quantidade: row.quantidade,
    nome_usuario: row.nome_usuario,
    data_hora: row.data_hora,
    motivo: row.motivo ?? '',
  };
}

const MovimentacoesContext = createContext<MovimentacoesContextData>({} as MovimentacoesContextData);

export function MovimentacoesProvider({ children }: { children: ReactNode }) {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);

  async function carregar() {
    const { data } = await supabase
      .from('movimentacao')
      .select('*')
      .order('data_hora', { ascending: false });
    if (data) setMovimentacoes((data as MovimentacaoRow[]).map(mapRow));
  }

  useEffect(() => { carregar(); }, []);

  function registrarMovimentacao(data: NovaMovimentacao) {
    const nova: Movimentacao = { ...data, id: Date.now() };
    setMovimentacoes((prev) => [nova, ...prev]);
    supabase.from('movimentacao').insert({
      id_produto: data.id_produto,
      nome_produto: data.nome_produto,
      nome_usuario: data.nome_usuario,
      tipo: data.tipo,
      quantidade: data.quantidade,
      data_hora: data.data_hora,
      motivo: data.motivo,
    }).then(() => carregar());
  }

  return (
    <MovimentacoesContext.Provider value={{ movimentacoes, registrarMovimentacao }}>
      {children}
    </MovimentacoesContext.Provider>
  );
}

export function useMovimentacoes() {
  return useContext(MovimentacoesContext);
}

export type { TipoMovimentacao, NovaMovimentacao };
