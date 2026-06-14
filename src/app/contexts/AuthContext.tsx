import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

type Perfil = 'admin' | 'funcionario';

type Usuario = {
  nome: string;
  email: string;
  perfil: Perfil;
};

type AuthContextData = {
  usuario: Usuario | null;
  carregando: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function mapearUsuario(user: { email?: string; user_metadata?: Record<string, string> }): Usuario {
  const meta = user.user_metadata ?? {};
  return {
    nome: meta.nome ?? user.email?.split('@')[0] ?? 'Usuário',
    email: user.email ?? '',
    perfil: meta.perfil === 'admin' ? 'admin' : 'funcionario',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUsuario(mapearUsuario(session.user));
      setCarregando(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ? mapearUsuario(session.user) : null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function login(email: string, senha: string): Promise<void> {
    setCarregando(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setCarregando(false);
    if (error) throw new Error('Email ou senha inválidos.');
  }

  function logout() {
    supabase.auth.signOut();
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
