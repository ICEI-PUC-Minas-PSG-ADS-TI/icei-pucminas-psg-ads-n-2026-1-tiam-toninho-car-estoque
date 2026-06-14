# Programação de Funcionalidades

<span style="color:red">Pré-requisitos: <a href="02-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="04-Projeto de Interface.md"> Projeto de Interface</a>, <a href="03-Metodologia.md"> Metodologia</a>, <a href="05-Arquitetura da Solução.md"> Arquitetura da Solução</a>

Esta seção apresenta a implementação das funcionalidades do sistema **Toninho Car Estoque**, descrevendo o modelo físico do banco de dados, os scripts SQL de manipulação de dados, as telas desenvolvidas, os CRUDs implementados, o fluxo de autenticação, os padrões de codificação adotados e as evidências de funcionamento da aplicação.

---

## 1. Modelo Físico do Projeto de BD

O modelo físico do banco de dados do sistema **Toninho Car Estoque** foi definido com base nos requisitos funcionais levantados e no modelo lógico elaborado anteriormente. O banco é composto por cinco tabelas principais: `USUARIO`, `PRODUTO`, `FICHA_CARRO`, `MOVIMENTACAO` e `HISTORICO_PRECO`, conforme detalhado abaixo.

### Diagrama das tabelas

```
USUARIO (id_usuario PK, nome, email, senha_hash, perfil, ativo, data_cadastro)
PRODUTO (id_produto PK, codigo, nome, descricao, quantidade_atual, preco_atual, estoque_minimo, data_cadastro, ultima_atualizacao)
FICHA_CARRO (id_ficha PK, placa, modelo, ano, nome_cliente, data_atendimento, observacoes)
MOVIMENTACAO (id_movimentacao PK, id_produto FK, id_usuario FK, id_ficha_carro FK, tipo, quantidade, data_hora, motivo)
HISTORICO_PRECO (id_historico_preco PK, id_produto FK, id_usuario FK, preco_anterior, preco_novo, data_alteracao, motivo)
```

### Script DDL — Criação das tabelas

```sql
-- Tabela: USUARIO
CREATE TABLE IF NOT EXISTS USUARIO (
    id_usuario    INT            NOT NULL AUTO_INCREMENT,
    nome          VARCHAR(120)   NOT NULL,
    email         VARCHAR(150)   NOT NULL UNIQUE,
    senha_hash    VARCHAR(255)   NOT NULL,
    perfil        ENUM('admin', 'funcionario') NOT NULL,
    ativo         BOOLEAN        NOT NULL DEFAULT TRUE,
    data_cadastro DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: PRODUTO
CREATE TABLE IF NOT EXISTS PRODUTO (
    id_produto         INT            NOT NULL AUTO_INCREMENT,
    codigo             VARCHAR(50)    NOT NULL UNIQUE,
    nome               VARCHAR(120)   NOT NULL,
    descricao          TEXT,
    quantidade_atual   INT            NOT NULL DEFAULT 0,
    preco_atual        DECIMAL(10,2)  NOT NULL,
    estoque_minimo     INT            NOT NULL DEFAULT 0,
    data_cadastro      DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao DATETIME       DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_produto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: FICHA_CARRO
CREATE TABLE IF NOT EXISTS FICHA_CARRO (
    id_ficha        INT           NOT NULL AUTO_INCREMENT,
    placa           VARCHAR(10)   NOT NULL,
    modelo          VARCHAR(100)  NOT NULL,
    ano             INT,
    nome_cliente    VARCHAR(120)  NOT NULL,
    data_atendimento DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    observacoes     TEXT,
    PRIMARY KEY (id_ficha)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: MOVIMENTACAO
CREATE TABLE IF NOT EXISTS MOVIMENTACAO (
    id_movimentacao INT           NOT NULL AUTO_INCREMENT,
    id_produto      INT           NOT NULL,
    id_usuario      INT           NOT NULL,
    id_ficha_carro  INT           NULL,
    tipo            ENUM('entrada', 'saida', 'baixa') NOT NULL,
    quantidade      INT           NOT NULL,
    data_hora       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    motivo          TEXT,
    PRIMARY KEY (id_movimentacao),
    FOREIGN KEY (id_produto)     REFERENCES PRODUTO(id_produto)         ON DELETE RESTRICT,
    FOREIGN KEY (id_usuario)     REFERENCES USUARIO(id_usuario)         ON DELETE RESTRICT,
    FOREIGN KEY (id_ficha_carro) REFERENCES FICHA_CARRO(id_ficha)       ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: HISTORICO_PRECO
CREATE TABLE IF NOT EXISTS HISTORICO_PRECO (
    id_historico_preco INT           NOT NULL AUTO_INCREMENT,
    id_produto         INT           NOT NULL,
    id_usuario         INT           NOT NULL,
    preco_anterior     DECIMAL(10,2) NOT NULL,
    preco_novo         DECIMAL(10,2) NOT NULL,
    data_alteracao     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    motivo             TEXT,
    PRIMARY KEY (id_historico_preco),
    FOREIGN KEY (id_produto) REFERENCES PRODUTO(id_produto) ON DELETE RESTRICT,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Índices para performance em consultas frequentes
CREATE INDEX idx_movimentacao_produto ON MOVIMENTACAO (id_produto);
CREATE INDEX idx_movimentacao_usuario ON MOVIMENTACAO (id_usuario);
CREATE INDEX idx_movimentacao_ficha   ON MOVIMENTACAO (id_ficha_carro);
CREATE INDEX idx_historico_produto    ON HISTORICO_PRECO (id_produto);
CREATE INDEX idx_historico_usuario    ON HISTORICO_PRECO (id_usuario);
CREATE INDEX idx_produto_codigo       ON PRODUTO (codigo);
CREATE INDEX idx_usuario_email        ON USUARIO (email);
```

---

## 2. Scripts SQL de DML

Os scripts de Linguagem de Manipulação de Dados (DML) apresentados a seguir contemplam as operações de inserção de dados iniciais, atualização de registros e exclusão, refletindo o fluxo de uso da aplicação.

### 2.1 Inserção de dados iniciais (INSERT)

```sql
-- Usuários do sistema (senhas armazenadas com hash — valores abaixo são ilustrativos)
INSERT INTO USUARIO (nome, email, senha_hash, perfil) VALUES
  ('Admin Toninho',    'admin@toninho.com', '$2b$10$hashAdminExemplo',   'admin'),
  ('José Funcionário', 'func@toninho.com',  '$2b$10$hashFuncExemplo',    'funcionario'),
  ('Carol Administrativa', 'carol@toninho.com', '$2b$10$hashCarolExemplo', 'admin');

-- Produtos iniciais do estoque
INSERT INTO PRODUTO (codigo, nome, descricao, quantidade_atual, preco_atual, estoque_minimo) VALUES
  ('PROD-001', 'Óleo Motor 5W30',    'Óleo sintético para motores a gasolina e flex', 2,  45.90, 5),
  ('PROD-002', 'Filtro de Ar',       'Filtro de ar universal para carros de passeio',  8,  35.00, 3),
  ('PROD-003', 'Vela de Ignição',    'Vela NGK iridium para motores 1.0 e 1.4',        1,  28.50, 4),
  ('PROD-004', 'Pastilha de Freio',  'Pastilha dianteira para carros compactos',       12, 120.00, 5),
  ('PROD-005', 'Fluido de Freio DOT4', 'Fluido de freio DOT4 500ml',                   0,  22.00, 2),
  ('PROD-006', 'Correia Dentada',    'Correia dentada para motores 1.6 16v',            5,  85.00, 2);

-- Fichas de atendimento de exemplo
INSERT INTO FICHA_CARRO (placa, modelo, ano, nome_cliente, observacoes) VALUES
  ('HYD-0001', 'Volkswagen Golf 1.4',    2021, 'João Silva',    'Revisão completa + troca de pastilhas'),
  ('ABC-9876', 'Toyota Corolla 2.0',     2019, 'Maria Santos',  'Troca de óleo e filtro de ar'),
  ('XYZ-5432', 'Honda Civic 1.5T',       2022, 'Pedro Oliveira', 'Cliente reportou barulho no motor');
```

### 2.2 Registro de movimentações (INSERT com atualização de estoque)

```sql
-- Registrar saída de produto vinculada a uma ficha de atendimento
INSERT INTO MOVIMENTACAO (id_produto, id_usuario, id_ficha_carro, tipo, quantidade, motivo)
VALUES (4, 2, 1, 'saida', 2, 'Substituição pastilha veículo HYD-0001');

-- Atualizar quantidade do produto após a saída
UPDATE PRODUTO
SET quantidade_atual = quantidade_atual - 2,
    ultima_atualizacao = CURRENT_TIMESTAMP
WHERE id_produto = 4;

-- Registrar entrada de produto no estoque (reposição)
INSERT INTO MOVIMENTACAO (id_produto, id_usuario, tipo, quantidade, motivo)
VALUES (2, 1, 'entrada', 5, 'Reposição de estoque — nota fiscal 1234');

-- Atualizar quantidade do produto após a entrada
UPDATE PRODUTO
SET quantidade_atual = quantidade_atual + 5,
    ultima_atualizacao = CURRENT_TIMESTAMP
WHERE id_produto = 2;

-- Registrar baixa por perda/dano
INSERT INTO MOVIMENTACAO (id_produto, id_usuario, tipo, quantidade, motivo)
VALUES (3, 2, 'baixa', 3, 'Peças danificadas na entrega');

UPDATE PRODUTO
SET quantidade_atual = quantidade_atual - 3,
    ultima_atualizacao = CURRENT_TIMESTAMP
WHERE id_produto = 3;
```

### 2.3 Atualização de preço com registro de histórico

```sql
-- Registrar alteração de preço no histórico antes de atualizar
INSERT INTO HISTORICO_PRECO (id_produto, id_usuario, preco_anterior, preco_novo, motivo)
SELECT id_produto, 1, preco_atual, 50.00, 'Reajuste fornecedor maio/2026'
FROM PRODUTO WHERE id_produto = 1;

-- Atualizar o preço atual do produto
UPDATE PRODUTO
SET preco_atual = 50.00,
    ultima_atualizacao = CURRENT_TIMESTAMP
WHERE id_produto = 1;
```

### 2.4 Consultas principais (SELECT)

```sql
-- Listar produtos com estoque abaixo do mínimo (alerta)
SELECT codigo, nome, quantidade_atual, estoque_minimo
FROM PRODUTO
WHERE quantidade_atual <= estoque_minimo
ORDER BY quantidade_atual ASC;

-- Buscar produto por nome ou código
SELECT * FROM PRODUTO
WHERE nome LIKE '%Filtro%' OR codigo LIKE '%PROD-002%';

-- Histórico de movimentações com nome do produto e do usuário
SELECT
    m.id_movimentacao,
    p.nome          AS produto,
    u.nome          AS usuario,
    m.tipo,
    m.quantidade,
    m.data_hora,
    m.motivo
FROM MOVIMENTACAO m
JOIN PRODUTO  p ON p.id_produto = m.id_produto
JOIN USUARIO  u ON u.id_usuario = m.id_usuario
ORDER BY m.data_hora DESC;

-- Valor total em estoque
SELECT SUM(quantidade_atual * preco_atual) AS valor_total_estoque
FROM PRODUTO;

-- Ficha do carro com itens utilizados
SELECT
    fc.placa, fc.modelo, fc.nome_cliente, fc.data_atendimento,
    p.nome   AS produto_usado,
    m.quantidade,
    m.quantidade * p.preco_atual AS valor_item
FROM FICHA_CARRO fc
JOIN MOVIMENTACAO m ON m.id_ficha_carro = fc.id_ficha
JOIN PRODUTO p      ON p.id_produto     = m.id_produto
WHERE fc.id_ficha = 1;

-- Excluir um produto (somente se não houver movimentações vinculadas)
DELETE FROM PRODUTO WHERE id_produto = 6;
```

---

## 3. Funcionalidades de Telas

As telas foram desenvolvidas com **React Native + Expo** utilizando o sistema de rotas baseado em arquivos do **expo-router**. A aplicação possui dois grupos de navegação separados por perfil de acesso: `(admin)` e `(funcionario)`.

### 3.1 Estrutura de navegação

```
app/
├── _layout.tsx           → Layout raiz com os provedores de contexto (Auth, Produtos, Movimentações, Fichas)
├── index.tsx             → Redirecionamento automático conforme perfil autenticado
├── login.tsx             → Tela de login
├── (admin)/
│   ├── _layout.tsx       → Navegação por abas do administrador (5 abas)
│   ├── index.tsx         → Dashboard do administrador
│   ├── produtos/
│   │   ├── index.tsx     → Listagem de produtos com busca e filtros
│   │   ├── adicionar.tsx → Formulário de cadastro de produto
│   │   └── [id].tsx      → Edição e exclusão de produto
│   ├── movimentacoes.tsx → Registro de entrada, saída e baixa de estoque
│   ├── fichas/
│   │   ├── index.tsx     → Listagem de fichas de veículos
│   │   ├── criar.tsx     → Formulário de criação de ficha
│   │   └── [id].tsx      → Detalhes e itens da ficha
│   └── relatorios.tsx    → Relatórios gerenciais com filtros de período e tipo
└── (funcionario)/
    ├── _layout.tsx       → Navegação por abas do funcionário (4 abas)
    ├── index.tsx         → Dashboard do funcionário
    ├── produtos.tsx      → Consulta de produtos (somente leitura)
    ├── movimentacoes.tsx → Registro de saída de estoque
    └── fichas/
        ├── index.tsx     → Listagem de fichas
        ├── criar.tsx     → Criação de ficha
        └── [id].tsx      → Detalhes da ficha
```

### 3.2 Telas implementadas

| Tela | Perfil | Descrição | RF atendido |
|---|---|---|---|
| Login | Todos | Autenticação com email/senha e redirecionamento por perfil | RF-001 |
| Dashboard (Admin) | Admin | Cards com total de produtos, estoque baixo e valor total; prévia da lista de produtos | RF-008 |
| Dashboard (Funcionário) | Funcionário | Mesmos indicadores do admin, sem acesso às funções de gestão | RF-005 |
| Listagem de Produtos (Admin) | Admin | Busca por nome/código, filtros Todos/Disponíveis/Estoque Baixo, barra de nível de estoque por produto | RF-002, RF-005 |
| Adicionar Produto | Admin | Formulário com validação de nome, código, quantidade, preço e estoque mínimo | RF-002, RF-003 |
| Editar Produto | Admin | Edição de todos os campos + indicadores de valor em estoque e status; opção de exclusão com confirmação | RF-002, RF-003 |
| Movimentações | Admin/Funcionário | Seleção de tipo (Entrada/Saída/Baixa), busca de produto, campo de quantidade e motivo; histórico recente | RF-004, RF-007 |
| Fichas — Listagem | Admin/Funcionário | Lista de fichas com status (aberta/concluída), placa, modelo e cliente | RF-006 |
| Fichas — Criar | Admin/Funcionário | Formulário com placa, modelo, ano, cliente e observações | RF-006 |
| Fichas — Detalhes | Admin/Funcionário | Exibição dos itens usados, valor total do atendimento, opções de fechar/excluir ficha | RF-006 |
| Relatórios | Admin | Filtros por período (hoje/semana/mês/todos) e por tipo; cards de resumo; painel de estoque atual; histórico completo | RF-009 |

---

## 4. CRUDs Implementados

### 4.1 CRUD de Produtos (RF-002, RF-003)

| Operação | Tela | Implementação |
|---|---|---|
| **Create** | `(admin)/produtos/adicionar.tsx` | Formulário com validação. Chama `adicionarProduto()` do `ProdutosContext` |
| **Read** | `(admin)/produtos/index.tsx` | Lista filtrada com busca em tempo real via `useMemo`. Lê do `ProdutosContext` |
| **Update** | `(admin)/produtos/[id].tsx` | Formulário pré-preenchido. Chama `editarProduto(id, data)` |
| **Delete** | `(admin)/produtos/[id].tsx` | Confirmação via `Alert`. Chama `excluirProduto(id)` e redireciona |

Campos gerenciados: `nome`, `codigo`, `descricao`, `quantidade_atual`, `preco_atual`, `estoque_minimo`.

### 4.2 CRUD de Fichas de Carro (RF-006)

| Operação | Tela | Implementação |
|---|---|---|
| **Create** | `fichas/criar.tsx` | Formulário com placa, modelo, ano, cliente e observações. Chama `criarFicha()` |
| **Read** | `fichas/index.tsx` e `fichas/[id].tsx` | Listagem geral e visualização detalhada com itens usados e valor total |
| **Update** | `fichas/[id].tsx` | Alteração de status (aberta → concluída/cancelada) e adição/remoção de itens via `adicionarItem()` e `removerItem()` |
| **Delete** | `fichas/[id].tsx` | Exclusão com confirmação. Chama `excluirFicha(id)` |

### 4.3 Registro de Movimentações (RF-004, RF-007)

| Operação | Tela | Implementação |
|---|---|---|
| **Create** | `movimentacoes.tsx` | Seleção de tipo, busca de produto com autocomplete, campo de quantidade com validação de estoque, motivo. Chama `registrarMovimentacao()` e `atualizarQuantidade()` simultaneamente |
| **Read** | `movimentacoes.tsx` e `relatorios.tsx` | Histórico exibido em ordem cronológica descendente com badge colorido por tipo |

**Validação de estoque:** ao registrar saída ou baixa, o sistema verifica se a quantidade solicitada é menor ou igual ao estoque disponível, exibindo alerta em caso de insuficiência.

---

## 5. Autenticação

### 5.1 Fluxo de autenticação implementado

O sistema de autenticação foi implementado utilizando **React Context API** com o `AuthContext`, que gerencia o estado global do usuário autenticado em toda a aplicação.

**Fluxo:**
1. O usuário acessa a tela de login (`app/login.tsx`) e informa e-mail e senha.
2. A função `login(email, senha)` do `AuthContext` valida as credenciais.
3. Em caso de sucesso, o estado `usuario` é preenchido com nome, e-mail e perfil (`admin` ou `funcionario`).
4. A tela `app/index.tsx` redireciona automaticamente: perfil `admin` → rota `/(admin)`, perfil `funcionario` → rota `/(funcionario)`.
5. O logout limpa o estado `usuario` e redireciona para a tela de login.

**Separação de acesso por perfil:**

As rotas `(admin)` e `(funcionario)` são grupos distintos de navegação. O funcionário não tem acesso às telas de gestão de produtos (adicionar/editar/excluir) nem ao módulo de relatórios.

### 5.2 Estrutura do AuthContext

```typescript
// Tipo do usuário autenticado
type Usuario = {
  nome:   string;
  email:  string;
  perfil: 'admin' | 'funcionario';
};

// Operações disponíveis via contexto
type AuthContextData = {
  usuario:   Usuario | null;
  carregando: boolean;
  login:     (email: string, senha: string) => Promise<void>;
  logout:    () => void;
};
```

### 5.3 Credenciais de teste

| Perfil | E-mail | Senha |
|---|---|---|
| Administrador | admin@toninho.com | 123456 |
| Funcionário | func@toninho.com | 123456 |

> **Nota:** a autenticação atual utiliza dados mockados em memória para fins de desenvolvimento. A integração com o Supabase (autenticação real com JWT) está prevista para a próxima etapa.

---

## 6. Padrões de Projeto de Codificação

### 6.1 Padrões adotados

| Padrão | Descrição | Ferramenta / Arquivo |
|---|---|---|
| **TypeScript estrito** | Tipagem explícita em todos os componentes, contexts e funções. Tipos centralizados em `src/app/types/index.ts` | `tsconfig.json` |
| **ESLint** | Análise estática de código com regras da configuração oficial Expo | `eslint.config.js` |
| **Prettier** | Formatação automática e consistente do código | `.prettierrc` |
| **Context API** | Padrão de gerenciamento de estado global sem dependência externa. Um contexto por domínio: Auth, Produtos, Movimentações, Fichas | `src/app/contexts/` |
| **expo-router** | Roteamento baseado em sistema de arquivos, eliminando configuração manual de rotas. Grupos de rota `(admin)` e `(funcionario)` para separação de acesso | `src/app/app/` |
| **Componentização** | Componentes reutilizáveis para listas e formulários: `DashboardView`, `MovimentacoesView`, `FichasLista`, `CriarFichaForm`, `FichaDetalhes` | `src/app/components/` |
| **StyleSheet** | Estilos declarados via `StyleSheet.create()` do React Native, mantendo separação entre lógica e apresentação | Todos os arquivos de tela |
| **Paleta de cores consistente** | Cores definidas por constantes e reutilizadas entre telas para manter identidade visual uniforme | `#2563EB` (azul primário), `#10B981` (verde), `#EF4444` (vermelho), `#F59E0B` (amarelo) |

### 6.2 Organização de pastas

```
src/app/
├── app/          → Telas e rotas (expo-router)
├── components/   → Componentes reutilizáveis
├── contexts/     → Gerenciamento de estado global (Context API)
├── types/        → Definições de tipos TypeScript
└── assets/       → Imagens e ícones
```

---

## 7. Evidências de Implementação das Funcionalidades de CRUD

> **Instrução:** inserir abaixo os screenshots da aplicação em execução, capturados via Expo Go ou emulador. Para cada funcionalidade, adicionar a imagem correspondente com legenda.

### 7.1 CRUD de Produtos

**Listagem de produtos com busca e filtros:**

> _[Inserir screenshot da tela de listagem de produtos mostrando a barra de busca e os chips de filtro]_

**Cadastro de novo produto:**

> _[Inserir screenshot do formulário de adição de produto preenchido]_

**Edição e exclusão de produto:**

> _[Inserir screenshot da tela de edição com os botões "Salvar Alterações" e "Excluir Produto" visíveis]_

### 7.2 CRUD de Fichas de Carro

**Listagem de fichas:**

> _[Inserir screenshot da tela de listagem de fichas com status exibido]_

**Criação de ficha:**

> _[Inserir screenshot do formulário de criação de ficha preenchido]_

**Detalhes da ficha com itens e valor total:**

> _[Inserir screenshot da tela de detalhes da ficha mostrando os produtos utilizados e o valor total do atendimento]_

### 7.3 Registro de Movimentações

**Formulário de movimentação (Entrada/Saída/Baixa):**

> _[Inserir screenshot da tela de movimentações com produto selecionado, quantidade preenchida e tipo ativo destacado]_

**Histórico de movimentações:**

> _[Inserir screenshot do histórico exibindo os registros com badges coloridos por tipo]_

---

## 8. Evidências de Implementação da Autenticação

**Tela de login:**

> _[Inserir screenshot da tela de login com os campos de e-mail e senha preenchidos]_

**Redirecionamento para painel do administrador:**

> _[Inserir screenshot do dashboard do administrador exibido após o login com perfil admin]_

**Redirecionamento para painel do funcionário:**

> _[Inserir screenshot do dashboard do funcionário exibido após o login com perfil funcionário]_

**Separação de acesso por perfil:**

> _[Inserir screenshot comparativo mostrando que o funcionário não possui acesso à aba de Relatórios ou ao botão de adicionar produto]_

---

## 9. Quadro Visual Atual de Gestão de Trabalho

O gerenciamento das atividades da equipe é realizado por meio do **GitHub Projects**, utilizando um quadro Kanban com as colunas: *A Fazer*, *Em Progresso* e *Concluído*. As tarefas foram distribuídas entre os integrantes conforme os requisitos funcionais atribuídos a cada um.

> _[Inserir screenshot atual do quadro Kanban do GitHub Projects mostrando o estado das tarefas na Sprint 3]_

**Resumo do status atual:**

| Coluna | Quantidade de tarefas |
|---|---|
| Concluído | 9 (todos os RFs implementados) |
| Em Progresso | 0 |
| A Fazer | 0 |

---

## 10. Status Atual das Contribuições dos Membros do Time

### Distribuição de Requisitos Funcionais

Cada integrante ficou responsável pela implementação de três Requisitos Funcionais, conforme a tabela abaixo:

| RF | Funcionalidade | Responsável |
|---|---|---|
| RF-001 | Login por perfil de acesso (autenticação, contexto, redirecionamento) | Geovane Araujo |
| RF-002 | Gerenciamento de produtos (cadastro, edição, exclusão) | Geovane Araujo |
| RF-003 | Gerenciamento de preços dos produtos | Geovane Araujo |
| RF-004 | Movimentações de estoque (entrada, saída, baixa) | Marcus Vinicius |
| RF-005 | Consulta de produtos e quantidade disponível | Marcus Vinicius |
| RF-007 | Histórico de movimentações | Marcus Vinicius |
| RF-006 | Gerenciamento de ficha do carro (criação, consulta, itens) | Rafael Oliveira |
| RF-008 | Alerta de estoque baixo | Rafael Oliveira |
| RF-009 | Relatórios gerenciais | Rafael Oliveira |

### Participação geral

| Integrante | RFs Implementados | Contribuição |
|---|---|---|
| Geovane Araujo | RF-001, RF-002, RF-003 | Autenticação, CRUD de Produtos, Gestão de Preços, estrutura base do projeto |
| Marcus Vinicius | RF-004, RF-005, RF-007 | Movimentações de Estoque, Consulta de Produtos, Histórico |
| Rafael Oliveira | RF-006, RF-008, RF-009 | Ficha do Carro, Alerta de Estoque Baixo, Relatórios Gerenciais |

---

## 11. Comentários Adicionais sobre as Participações Individuais

### Geovane Araujo
Responsável pela configuração inicial do projeto (estrutura de pastas, dependências, TypeScript, ESLint e Prettier), pela implementação do sistema de autenticação com Context API e redirecionamento por perfil (RF-001), pelo CRUD completo de produtos com validação de formulários (RF-002) e pela integração da gestão de preços com o formulário de edição (RF-003). Também contribuiu com a definição dos tipos TypeScript centralizados e com a arquitetura de contextos da aplicação.

### Marcus Vinicius
Responsável pelo módulo de movimentações de estoque, incluindo a lógica de registro de entrada, saída e baixa com validação de quantidade disponível (RF-004), pelo componente de consulta de produtos com busca em tempo real e filtros de estoque (RF-005) e pelo histórico de movimentações com exibição cronológica e identificação visual por tipo (RF-007). Contribuiu com o componente `MovimentacoesView`, reutilizado nos painéis de administrador e funcionário.

### Rafael Oliveira
Responsável pelo módulo de fichas de veículos, incluindo criação, listagem, detalhamento e gerenciamento de itens utilizados (RF-006), pela implementação do alerta visual de estoque baixo no dashboard e na listagem de produtos (RF-008) e pela tela de relatórios gerenciais com filtros por período e tipo de movimentação (RF-009). Contribuiu com os componentes reutilizáveis de fichas (`FichasLista`, `CriarFichaForm`, `FichaDetalhes`) e com a tela de relatórios.
