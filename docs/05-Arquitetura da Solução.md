# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="02-Especificação do Projeto.md"> Especificação do Projeto</a></span>

Esta seção apresenta a arquitetura da solução **Toninho Car Estoque**, descrevendo os componentes do software, o fluxo de dados, o modelo de persistência, o ambiente de hospedagem e os critérios de qualidade adotados. A solução é um **aplicativo mobile** desenvolvido em **React Native com TypeScript e Expo**, que utiliza o **Supabase** como plataforma de backend como serviço (BaaS), responsável pela persistência dos dados em banco **PostgreSQL** e pela infraestrutura de autenticação. Dessa forma, a equipe não desenvolve um módulo de backend próprio (em conformidade com a restrição 02 da Especificação do Projeto), consumindo os serviços gerenciados do Supabase diretamente a partir do aplicativo.

## 1. Componentes da Solução (Arquitetura de Software)

### 1.1 Camada de Apresentação (Aplicativo Mobile)

Desenvolvida em **React Native + Expo**, com roteamento baseado em arquivos via **expo-router** e grupos de rotas separados por perfil: `(admin)` e `(funcionario)`.

- **Tela de Login**: e-mail e senha, com redirecionamento automático por perfil (Administrador/Funcionário)
- **Dashboard** (diferenciado por perfil): indicadores de total de produtos, estoque baixo e valor total
- **Formulários de Gestão**:
  - Adicionar/Editar Produto (nome, código, descrição, quantidade, preço, estoque mínimo)
  - Registro de Movimentações (entradas/saídas/baixas, vinculáveis a fichas de carro)
  - Consulta de produtos e estoque, com busca e filtros
  - Ficha do Carro (placa, modelo, ano, cliente, observações e produtos associados)
- **Relatórios Gerenciais** (apenas Administrador), com filtros por período e tipo

### 1.2 Camada de Lógica da Aplicação (Estado e Regras no App)

A lógica da aplicação é organizada por meio da **Context API** do React, com um contexto por domínio:

- **AuthContext — Autenticação e Perfis**: validação de credenciais, estado global do usuário autenticado e redirecionamento por perfil
- **ProdutosContext — Gerenciamento de Produtos**: CRUD completo, controle de estoque mínimo e preço
- **MovimentacoesContext — Controle de Estoque**: registro de entradas, saídas e baixas com validação da quantidade disponível e atualização consistente do estoque
- **FichasContext — Gestão de Fichas de Carro**: associação placa ↔ cliente ↔ produtos utilizados, com datas e cálculo do valor total do atendimento
- **Geração de Relatórios**: agregação de movimentações recentes, valor total por ficha e histórico por período

### 1.3 Camada de Dados (Persistência — Supabase/PostgreSQL)

A persistência é realizada no banco **PostgreSQL** gerenciado pelo **Supabase**, acessado pelo aplicativo por meio da biblioteca oficial `@supabase/supabase-js` (cliente configurado em `src/app/lib/supabase.ts`, com URL e chave fornecidas por variáveis de ambiente). O modelo de dados é composto por cinco tabelas:

- **USUARIO**: id, nome, e-mail, senha (hash), perfil (admin/funcionário), ativo, data de cadastro
- **PRODUTO**: id, código, nome, descrição, quantidade atual, preço atual, estoque mínimo, datas de cadastro e atualização
- **MOVIMENTACAO**: id, produto (FK), usuário (FK), ficha de carro (FK opcional), tipo (entrada/saída/baixa), quantidade, data/hora, motivo
- **FICHA_CARRO**: id, placa, modelo, ano, nome do cliente, data de atendimento, observações
- **HISTORICO_PRECO**: id, produto (FK), usuário (FK), preço anterior, preço novo, data da alteração, motivo

As chaves estrangeiras utilizam `ON DELETE RESTRICT` para produtos e usuários com movimentações vinculadas (impedindo exclusões que quebrariam o histórico) e `ON DELETE SET NULL` para a ficha de carro.

### 1.4 Fluxo de Interação

O fluxo de interação da solução ocorre em ciclo: o **usuário** acessa o aplicativo mobile e faz o **login**; o sistema verifica o **perfil de acesso** e o direciona para o grupo de rotas correspondente; quando o usuário consulta, cadastra ou registra alguma informação, a ação passa pela **camada de contextos**, que valida os dados (por exemplo, impedindo saída maior que o estoque disponível) e grava ou busca as informações no **banco de dados do Supabase**; a resposta retorna ao aplicativo e é exibida na tela.

```
Usuário → Aplicativo (React Native/Expo) → Contextos (regras e validações) → Supabase (PostgreSQL) → Aplicativo → Usuário
```

## 2. Ambiente de Hospedagem da Aplicação

Por se tratar de uma solução mobile com backend como serviço, o ambiente de execução é composto por:

| Componente | Tecnologia / Configuração |
|---|---|
| **Aplicativo (cliente)** | React Native 0.81 + Expo SDK 54, executado em dispositivo Android/iOS ou via Expo Go durante o desenvolvimento |
| **Backend (BaaS)** | Supabase (plano gratuito, adequado ao contexto acadêmico) |
| **Banco de Dados** | PostgreSQL gerenciado pelo Supabase |
| **Distribuição** | Expo Go (desenvolvimento) e build via Expo/EAS para geração de APK (entrega) |
| **Versionamento e documentação** | GitHub / GitHub Classroom |

### 2.1 Requisitos de Rede e Segurança

- **Protocolo**: toda a comunicação entre o aplicativo e o Supabase ocorre via **HTTPS** (TLS), padrão da plataforma
- **Credenciais**: a URL e a chave pública do projeto Supabase são fornecidas por variáveis de ambiente (`EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_KEY`), não sendo versionadas no repositório
- **Autenticação**: controle de acesso por perfil (admin/funcionário) aplicado na navegação do aplicativo; na evolução prevista, a autenticação será integrada ao **Supabase Auth** (JWT), com regras de acesso por linha (Row Level Security) no banco
- **Backup**: o Supabase mantém a infraestrutura do banco gerenciada; o script de criação das tabelas é versionado no repositório, permitindo a recriação do ambiente

## 3. Diagrama de Classes

<img width="1701" height="1603" alt="Diagrama de Classe - Toninho drawio" src="https://github.com/user-attachments/assets/0b86c74f-9b5e-4adc-8136-bddb33da6654" />

## 4. Modelo ER

<img width="1672" height="1490" alt="Toninho Car - Modelo ER drawio (1)" src="https://github.com/user-attachments/assets/1d3ba23c-c8c0-490b-93f5-fc3c13d77a2d" />

## 5. Esquema Relacional

<img width="862" height="551" alt="Esquema Relacional drawio" src="https://github.com/user-attachments/assets/4bd7c43a-2836-4c0c-8b26-11f04744e9b7" />

## 6. Modelo Físico

O arquivo `ToninhoCar.sql`, contendo os scripts de criação das tabelas do banco de dados, está incluído na pasta `src/bd` do repositório. Os scripts DDL e DML completos também estão documentados na <a href="07-Programação de Funcionalidades.md">Programação de Funcionalidades</a>.

## 7. Tecnologias Utilizadas

A solução é implementada como um aplicativo mobile desenvolvido em **React Native com TypeScript**, tecnologia adequada para criar interfaces leves, responsivas e compatíveis com a rotina de uso em celular dentro da oficina. O gerenciamento de navegação entre telas é feito com o **expo-router** (roteamento baseado em arquivos), e o estado global da aplicação é organizado com a **Context API**, com um contexto por domínio (autenticação, produtos, movimentações e fichas).

A persistência dos dados é feita no **Supabase** (PostgreSQL gerenciado), o que mantém a coerência com o modelo relacional estruturado no projeto — tabelas, chaves primárias, chaves estrangeiras e integridade referencial — sem exigir o desenvolvimento de um backend próprio. A autenticação e o controle de perfis tratam internamente os acessos de administrador e funcionário com base no campo de perfil do usuário, garantindo que cada tipo de conta veja apenas as funcionalidades permitidas.

No apoio ao desenvolvimento, a equipe utiliza o **VS Code** como editor, **Git/GitHub** para controle de versão e colaboração, **Figma** para prototipação das telas e **draw.io** para a modelagem dos diagramas do projeto (esquema relacional, diagrama de casos de uso e fluxos de navegação).

| Dimensão | Tecnologia |
|---|---|
| Linguagem | TypeScript |
| Framework mobile | React Native 0.81 + Expo SDK 54 |
| Navegação | expo-router |
| Estado global | React Context API |
| Backend (BaaS) | Supabase |
| Banco de dados | PostgreSQL (Supabase) |
| Qualidade de código | ESLint + Prettier |
| Versionamento | Git + GitHub |
| Prototipação e diagramas | Figma e draw.io |

## 8. Hospedagem e Lançamento

A hospedagem e o lançamento da plataforma foram pensados de forma simples e compatível com o contexto acadêmico. Como a solução foi desenvolvida para ambiente mobile e utiliza o Supabase como backend gerenciado, o principal apoio para publicação e organização do projeto é o **GitHub**, que serve para versionamento do código, controle das alterações e compartilhamento com a equipe. Durante o desenvolvimento, o **Expo Go** permite testes rápidos em dispositivos reais; para a entrega, o build do aplicativo pode ser gerado via **Expo/EAS** (APK para Android). A documentação do projeto é publicada no próprio repositório, podendo o **GitHub Pages** ser usado para divulgação da página do projeto.

## 9. Qualidade de Software

Para o projeto Toninho Car Estoque, a equipe definiu como base de qualidade as características da **ISO/IEC 25010** que melhor atendem ao contexto real de uso da aplicação, que é um sistema mobile simples, prático e voltado para a rotina de uma mecânica automotiva. Nesse cenário, as subcaracterísticas priorizadas foram principalmente as de adequação funcional, usabilidade, confiabilidade, eficiência de desempenho e segurança, pois elas estão diretamente relacionadas à necessidade de registrar produtos, consultar informações rapidamente, controlar movimentações e garantir que os dados permaneçam íntegros e acessíveis apenas aos perfis autorizados.

Dentro de **adequação funcional**, a equipe buscará garantir completude funcional, correção funcional e adequação funcional, assegurando que o sistema contemple os requisitos previstos, execute corretamente as operações de cadastro, consulta, baixa e geração de relatórios, e realmente ajude na gestão do estoque. As métricas para essa parte incluem a quantidade de requisitos funcionais implementados, a taxa de aprovação nos testes funcionais e o percentual de cenários de uso executados com sucesso.

Na característica de **usabilidade**, as subcaracterísticas mais importantes serão operabilidade, aprendizado do uso, proteção contra erros do usuário e acessibilidade/clareza da interface, porque o sistema será utilizado em ambiente de oficina, com necessidade de rapidez e interação simples pelo celular. Para avaliar isso, a equipe observa o tempo médio para realizar tarefas como consultar um produto ou registrar uma saída, a quantidade de erros cometidos durante o uso, a necessidade de retrabalho em telas e a avaliação dos usuários quanto à facilidade de navegação (ver <a href="10-Plano de Testes de Usabilidade.md">Plano de Testes de Usabilidade</a>).

Em relação à **confiabilidade**, as subcaracterísticas escolhidas serão maturidade, disponibilidade e recuperabilidade, já que o sistema precisa manter os registros de forma consistente e confiável, sem perder informações de estoque e histórico. As métricas incluem a taxa de falhas durante testes, o número de interrupções no uso, a capacidade de recuperação após erro e a integridade dos dados após inserções, atualizações e exclusões.

Para **eficiência de desempenho**, a equipe considera principalmente o tempo de resposta e o uso de recursos, pois o aplicativo deve responder rapidamente, sem atrapalhar a rotina dos funcionários. As métricas incluem o tempo médio de carregamento das telas, o tempo de resposta nas consultas (meta de até 3 segundos, conforme RNF-003), a quantidade de operações processadas em curto período e o consumo de memória durante o uso em dispositivos móveis.

Por fim, a característica de **segurança** será tratada por meio de confidencialidade, integridade e controle de acesso, uma vez que o sistema possui perfis diferentes de usuário, e cada um deve acessar apenas as funções permitidas. Nesse caso, as métricas incluem o número de acessos bloqueados por perfil incorreto, a ausência de falhas de autenticação, o percentual de operações realizadas com controle de permissão correto e a validação da preservação dos dados armazenados.

Assim, a escolha dessas subcaracterísticas se justifica porque elas atendem diretamente aos objetivos do projeto e às necessidades dos usuários da mecânica Toninho Car. Com isso, a equipe consegue orientar o desenvolvimento para um produto funcional, fácil de usar, confiável, rápido e seguro, aumentando as chances de aceitação da solução no uso cotidiano.
