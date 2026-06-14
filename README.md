# TONINHO CAR ESTOQUE

`Tecnologia em Análise e Desenvolvimento de Sistemas`

`Trabalho Interdisciplinar: Aplicação Móvel`

`4° SEMESTRE`

O projeto Toninho Car Estoque é um aplicativo mobile para controle de estoque de uma mecânica automotiva. Ele foi criado para organizar o cadastro de peças e produtos, registrar entradas e saídas, consultar itens disponíveis e acompanhar preços e movimentações do estoque.

A aplicação terá acesso para administrador e funcionário, permitindo mais controle, agilidade e organização na rotina da oficina.

## Integrantes

* Marcus Vinicius
* Geovane Araujo
* Rafael Oliveira

## Orientador

* Pedro Felipe

## Instruções de utilização

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS) e npm instalados;
- Aplicativo **Expo Go** instalado no smartphone (Android/iOS) ou um emulador configurado.

### Instalação e execução

```bash
# 1. Acessar a pasta da aplicação
cd src/app

# 2. Instalar as dependências
npm install

# 3. Configurar as variáveis de ambiente do Supabase
#    Criar um arquivo .env na pasta src/app com:
#    EXPO_PUBLIC_SUPABASE_URL=<url-do-projeto-supabase>
#    EXPO_PUBLIC_SUPABASE_KEY=<chave-publica-do-projeto>

# 4. Iniciar a aplicação
npx expo start
```

Após iniciar, escaneie o QR Code com o aplicativo **Expo Go** (ou pressione `a` para abrir no emulador Android).

### Credenciais de teste

| Perfil | E-mail | Senha |
|---|---|---|
| Administrador | admin@toninho.com | 123456 |
| Funcionário | func@toninho.com | 123456 |

O script de criação do banco de dados está disponível em [`src/bd/ToninhoCar.sql`](src/bd/ToninhoCar.sql).

# Documentação

<ol>
<li><a href="docs/01-Documentação de Contexto.md"> Documentação de Contexto</a></li>
<li><a href="docs/02-Especificação do Projeto.md"> Especificação do Projeto</a></li>
<li><a href="docs/03-Metodologia.md"> Metodologia</a></li>
<li><a href="docs/04-Projeto de Interface.md"> Projeto de Interface</a></li>
<li><a href="docs/05-Arquitetura da Solução.md"> Arquitetura da Solução</a></li>
<li><a href="docs/06-Template Padrão da Aplicação.md"> Template Padrão da Aplicação</a></li>
<li><a href="docs/07-Programação de Funcionalidades.md"> Programação de Funcionalidades</a></li>
<li><a href="docs/08-Plano de Testes de Software.md"> Plano de Testes de Software</a></li>
<li><a href="docs/09-Registro de Testes de Software.md"> Registro de Testes de Software</a></li>
<li><a href="docs/10-Plano de Testes de Usabilidade.md"> Plano de Testes de Usabilidade</a></li>
<li><a href="docs/11-Registro de Testes de Usabilidade.md"> Registro de Testes de Usabilidade</a></li>
<li><a href="docs/12-Apresentação do Projeto.md"> Apresentação do Projeto</a></li>
<li><a href="docs/13-Referências.md"> Referências</a></li>
</ol>

# Código

<li><a href="src/README.md"> Código Fonte</a></li>

# Apresentação

<li><a href="presentation/README.md"> Apresentação da solução</a></li>
