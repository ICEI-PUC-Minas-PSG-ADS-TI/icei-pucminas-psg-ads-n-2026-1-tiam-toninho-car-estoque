import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { FichaCarro, ItemFicha } from '@/types';

type NovaFicha = Omit<FichaCarro, 'id' | 'data_atendimento' | 'status' | 'itens'>;

type FichasContextData = {
  fichas: FichaCarro[];
  criarFicha: (data: NovaFicha) => number;
  atualizarFicha: (id: number, data: Partial<Pick<FichaCarro, 'status' | 'observacoes'>>) => void;
  excluirFicha: (id: number) => void;
  buscarPorId: (id: number) => FichaCarro | undefined;
  adicionarItem: (id_ficha: number, item: Omit<ItemFicha, 'id'>) => void;
  removerItem: (id_ficha: number, id_item: number) => void;
};

type FichaRow = {
  id_ficha: number;
  placa: string;
  modelo: string;
  ano: number | null;
  nome_cliente: string;
  data_atendimento: string;
  observacoes: string | null;
  status: string;
  itens: ItemFicha[] | null;
};

function mapRow(row: FichaRow): FichaCarro {
  return {
    id: row.id_ficha,
    placa: row.placa,
    modelo: row.modelo,
    ano: row.ano,
    nome_cliente: row.nome_cliente,
    data_atendimento: row.data_atendimento,
    observacoes: row.observacoes ?? '',
    status: row.status as FichaCarro['status'],
    itens: Array.isArray(row.itens) ? row.itens : [],
  };
}

const FichasContext = createContext<FichasContextData>({} as FichasContextData);

export function FichasProvider({ children }: { children: ReactNode }) {
  const [fichas, setFichas] = useState<FichaCarro[]>([]);

  async function carregar() {
    const { data } = await supabase
      .from('ficha_carro')
      .select('*')
      .order('data_atendimento', { ascending: false });
    if (data) setFichas((data as FichaRow[]).map(mapRow));
  }

  useEffect(() => { carregar(); }, []);

  function criarFicha(data: NovaFicha): number {
    const idTemp = Date.now();
    const nova: FichaCarro = {
      ...data,
      id: idTemp,
      data_atendimento: new Date().toISOString(),
      status: 'aberta',
      itens: [],
    };
    setFichas((prev) => [nova, ...prev]);
    supabase.from('ficha_carro').insert({
      placa: data.placa,
      modelo: data.modelo,
      ano: data.ano,
      nome_cliente: data.nome_cliente,
      observacoes: data.observacoes,
      itens: [],
    }).then(() => carregar());
    return idTemp;
  }

  function atualizarFicha(id: number, data: Partial<Pick<FichaCarro, 'status' | 'observacoes'>>) {
    setFichas((prev) => prev.map((f) => (f.id === id ? { ...f, ...data } : f)));
    supabase.from('ficha_carro').update(data).eq('id_ficha', id);
  }

  function excluirFicha(id: number) {
    setFichas((prev) => prev.filter((f) => f.id !== id));
    supabase.from('ficha_carro').delete().eq('id_ficha', id);
  }

  function buscarPorId(id: number) {
    return fichas.find((f) => f.id === id);
  }

  function adicionarItem(id_ficha: number, item: Omit<ItemFicha, 'id'>) {
    setFichas((prev) =>
      prev.map((f) => {
        if (f.id !== id_ficha) return f;
        const novosItens = [...f.itens, { ...item, id: Date.now() }];
        supabase.from('ficha_carro').update({ itens: novosItens }).eq('id_ficha', id_ficha);
        return { ...f, itens: novosItens };
      }),
    );
  }

  function removerItem(id_ficha: number, id_item: number) {
    setFichas((prev) =>
      prev.map((f) => {
        if (f.id !== id_ficha) return f;
        const novosItens = f.itens.filter((i) => i.id !== id_item);
        supabase.from('ficha_carro').update({ itens: novosItens }).eq('id_ficha', id_ficha);
        return { ...f, itens: novosItens };
      }),
    );
  }

  return (
    <FichasContext.Provider
      value={{ fichas, criarFicha, atualizarFicha, excluirFicha, buscarPorId, adicionarItem, removerItem }}
    >
      {children}
    </FichasContext.Provider>
  );
}

export function useFichas() {
  return useContext(FichasContext);
}
