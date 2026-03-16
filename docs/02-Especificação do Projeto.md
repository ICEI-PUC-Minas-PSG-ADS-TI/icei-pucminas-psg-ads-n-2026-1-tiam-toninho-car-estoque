# Especificações do Projeto

Esta seção apresenta a especificação do projeto **Toninho Car Estoque** com foco na forma como os usuários irão interagir com a aplicação no contexto real da mecânica. A partir das necessidades levantadas junto ao cliente, foram definidos os perfis de usuários, as histórias de usuário, os requisitos funcionais e não funcionais, as restrições do projeto, o diagrama de casos de uso, a matriz de rastreabilidade e os elementos básicos de gerenciamento do projeto.

O sistema será desenvolvido como uma aplicação mobile voltada para o controle de estoque da mecânica **Toninho Car**, permitindo o cadastro e exclusão de produtos, controle de preços, registro de entrada e saída de peças, consulta rápida de itens, preenchimento da ficha do carro, histórico de movimentações, alerta de estoque baixo e geração de relatórios.

Para a elaboração desta especificação, foram utilizadas as seguintes técnicas e ferramentas:
- levantamento de requisitos por meio de conversa direta com o cliente;
- definição de personas com base nos perfis reais de uso da aplicação;
- construção de histórias de usuário para representar as necessidades dos usuários;
- identificação e organização dos requisitos funcionais e não funcionais;
- priorização de requisitos com apoio da técnica **MoSCoW**;
- modelagem textual do diagrama de casos de uso;
- criação da matriz de rastreabilidade para alinhar objetivos, histórias e requisitos;
- organização inicial das atividades da equipe e estimativa de orçamento do projeto.

---

## Personas

### Persona 1 – Antônio
Antônio tem 42 anos, é o dono da mecânica **Toninho Car** e acompanha diretamente a rotina do negócio, desde o atendimento até a organização interna da oficina. Ele precisa de uma aplicação simples e confiável para controlar os produtos cadastrados, atualizar preços, registrar entradas e saídas e consultar relatórios, pois deseja manter o estoque organizado e ter mais segurança nas informações utilizadas na gestão da mecânica.

### Persona 2 – Carol
Carol tem 31 anos e atua no setor administrativo da mecânica, auxiliando no controle interno e na conferência das informações do estoque. Ela precisa acessar dados organizados, acompanhar preços, consultar produtos e verificar movimentações, pois sua função exige apoio à administração e maior clareza no acompanhamento das informações registradas no sistema.

### Persona 3 – Antoni
Antoni tem 27 anos e trabalha como funcionário da oficina, participando da rotina operacional dos serviços realizados nos veículos. Ele precisa consultar produtos com rapidez, verificar a quantidade disponível, remover unidades do estoque e preencher a ficha do carro, pois utiliza peças durante os atendimentos e precisa registrar essas informações sem atrapalhar o andamento do trabalho.

---

## Histórias de Usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuário para o projeto **Toninho Car Estoque**:

| EU COMO... `PERSONA` | QUERO/PRECISO ... `FUNCIONALIDADE` | PARA ... `MOTIVO/VALOR` |
|----------------------|------------------------------------|--------------------------|
| Administrador | realizar login com perfil administrativo | acessar as funcionalidades de gerenciamento do sistema |
| Administrador | cadastrar novos produtos | manter o estoque atualizado |
| Administrador | excluir produtos | remover itens que não são mais utilizados |
| Administrador | cadastrar preços dos produtos | garantir o controle correto dos valores |
| Administrador | alterar preços dos produtos | atualizar os valores sempre que necessário |
| Administrador | registrar entrada de peças | controlar o que foi adicionado ao estoque |
| Administrador | visualizar o histórico de movimentações | acompanhar tudo o que foi registrado no sistema |
| Administrador | receber alerta de estoque baixo | planejar a reposição de produtos |
| Administrador | gerar relatório de entrada e saída | acompanhar a movimentação quantitativa das peças |
| Administrador | gerar relatório de valores | acompanhar os valores movimentados no estoque |
| Funcionário | realizar login com perfil de funcionário | acessar apenas as funções permitidas para minha rotina |
| Funcionário | consultar produtos cadastrados | localizar rapidamente as peças disponíveis |
| Funcionário | visualizar a quantidade disponível de um produto | saber se há item suficiente para uso |
| Funcionário | remover unidade de produto do estoque | registrar a utilização da peça no serviço realizado |
| Funcionário | criar ficha do carro | associar os itens utilizados a um veículo atendido |
| Funcionário | consultar ficha do carro | verificar os registros vinculados ao atendimento |

---

## Requisitos

Os requisitos do projeto foram definidos com base nas histórias de usuário e organizados em requisitos funcionais e requisitos não funcionais. Para determinar a prioridade de cada item, foi utilizada a técnica **MoSCoW**, que permite classificar os requisitos conforme sua importância para a primeira versão da aplicação.

A técnica foi aplicada da seguinte forma:
- requisitos essenciais para o funcionamento inicial do sistema foram classificados como **ALTA**;
- requisitos importantes, mas não críticos para a primeira entrega, foram classificados como **MÉDIA**;
- requisitos desejáveis, porém complementares, foram classificados como **BAIXA**.

### Requisitos Funcionais

| ID | Descrição do Requisito | Prioridade | Responsável |
|------|-----------------------------------------|----|----|
| RF-001 | Permitir que o usuário realize login no sistema conforme seu perfil de acesso | ALTA | Equipe |
| RF-002 | Permitir que o administrador cadastre produtos no estoque | ALTA | Equipe |
| RF-003 | Permitir que o administrador exclua produtos cadastrados | ALTA | Equipe |
| RF-004 | Permitir que o administrador cadastre preços dos produtos | ALTA | Equipe |
| RF-005 | Permitir que o administrador altere os preços dos produtos | ALTA | Equipe |
| RF-006 | Permitir registrar entrada de produtos no estoque | ALTA | Equipe |
| RF-007 | Permitir registrar saída de produtos do estoque | ALTA | Equipe |
| RF-008 | Permitir que o funcionário remova unidade de produto do estoque | ALTA | Equipe |
| RF-009 | Permitir consulta rápida dos produtos cadastrados | ALTA | Equipe |
| RF-010 | Exibir a quantidade disponível de cada produto | ALTA | Equipe |
| RF-011 | Permitir criar ficha do carro | ALTA | Equipe |
| RF-012 | Permitir consultar ficha do carro | MÉDIA | Equipe |
| RF-013 | Registrar histórico de movimentações de entrada e saída | ALTA | Equipe |
| RF-014 | Emitir alerta de estoque baixo | MÉDIA | Equipe |
| RF-015 | Gerar relatório com valores movimentados no estoque | MÉDIA | Equipe |

### Requisitos não Funcionais

| ID | Descrição do Requisito | Prioridade |
|-------|-------------------------|----|
| RNF-001 | O sistema deve ser responsivo para rodar em dispositivos móveis | ALTA |
| RNF-002 | O sistema deve possuir interface simples, intuitiva e adequada ao ambiente de oficina | ALTA |
| RNF-003 | O sistema deve processar as principais requisições do usuário em no máximo 3 segundos | MÉDIA |
| RNF-004 | O sistema deve controlar o acesso às funcionalidades de acordo com o perfil autenticado | ALTA |
| RNF-005 | O sistema deve manter consistência dos dados nas movimentações de entrada e saída | ALTA |
| RNF-006 | O sistema deve apresentar informações legíveis e organizadas em telas de celular | ALTA |
| RNF-007 | O sistema deve permitir manutenção e evolução futura da aplicação | MÉDIA |
| RNF-008 | O sistema deve registrar as movimentações de forma confiável para consulta posterior | ALTA |

---

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID | Restrição |
|----|-----------|
| 01 | O projeto deverá ser entregue até o final do semestre |
| 02 | Não pode ser desenvolvido um módulo de backend |
| 03 | A primeira versão do sistema será focada em ambiente mobile |
| 04 | O escopo inicial estará limitado às funcionalidades levantadas junto ao cliente |
| 05 | O sistema trabalhará inicialmente com apenas dois perfis de acesso: administrador e funcionário |
| 06 | O projeto deverá utilizar ferramentas gratuitas ou disponíveis em contexto acadêmico |
| 07 | Funcionalidades não validadas com o cliente não farão parte da primeira entrega |

---

## Diagrama de Casos de Uso

O diagrama de casos de uso representa as interações entre os atores do sistema e as funcionalidades centrais da aplicação **Toninho Car Estoque**. Foram identificados dois atores principais: **Administrador** e **Funcionário**, cada um com permissões específicas de acordo com sua responsabilidade dentro da mecânica.

![Diagrama de Caso de Uso](img/caso_uso_toninho_car_estoque.png)

### Descrição sucinta dos atores e casos de uso

| Ator / Caso de Uso | Descrição |
|---|---|
| Administrador | Usuário responsável pelo gerenciamento do estoque, cadastro de produtos, controle de preços e relatórios |
| Funcionário | Usuário responsável pelas operações de consulta, retirada de peças e preenchimento da ficha do carro |
| Realizar login | Permite acesso ao sistema com autenticação e controle de perfil |
| Cadastrar produto | Permite incluir novos itens no estoque |
| Excluir produto | Permite remover itens que não serão mais utilizados |
| Cadastrar preço | Permite informar o valor inicial do produto |
| Alterar preço | Permite atualizar o valor de um produto já cadastrado |
| Registrar entrada de estoque | Permite lançar novos produtos ou reposições no estoque |
| Registrar saída de estoque | Permite registrar a retirada de itens do estoque |
| Consultar produtos | Permite pesquisar e visualizar produtos cadastrados |
| Visualizar quantidade disponível | Permite verificar o saldo atual de cada item |
| Criar ficha do carro | Permite registrar veículo e itens utilizados em determinado serviço |
| Consultar ficha do carro | Permite visualizar fichas já registradas |
| Visualizar histórico de movimentações | Permite rastrear entradas e saídas registradas |
| Receber alerta de estoque baixo | Permite identificar necessidade de reposição |
| Gerar relatório de valores | Permite acompanhar financeiramente os itens movimentados |

---

# Matriz de Rastreabilidade

A matriz de rastreabilidade relaciona os objetivos do sistema, as histórias de usuário e os requisitos especificados, garantindo alinhamento entre a necessidade do usuário e a funcionalidade prevista na solução.

| Objetivo do Sistema | História de Usuário Relacionada | Requisito(s) Relacionado(s) |
|---|---|---|
| Controlar o acesso ao sistema por perfil | Como administrador, quero realizar login com perfil administrativo para acessar as funcionalidades de gerenciamento do sistema | RF-001, RNF-004 |
| Controlar o acesso ao sistema por perfil | Como funcionário, quero realizar login com perfil de funcionário para acessar apenas as funções permitidas para minha rotina | RF-001, RNF-004 |
| Manter o estoque atualizado | Como administrador, quero cadastrar novos produtos para manter o estoque atualizado | RF-002 |
| Remover itens sem uso | Como administrador, quero excluir produtos para remover itens que não são mais utilizados | RF-003 |
| Garantir controle correto dos preços | Como administrador, quero cadastrar preços dos produtos para garantir o controle correto dos valores | RF-004 |
| Atualizar valores sempre que necessário | Como administrador, quero alterar preços dos produtos para atualizar os valores sempre que necessário | RF-005 |
| Registrar entrada de peças | Como administrador, quero registrar entrada de peças para controlar o que foi adicionado ao estoque | RF-006, RF-013 |
| Registrar saída de produtos utilizados | Como funcionário, quero remover unidade de produto do estoque para registrar a utilização da peça no serviço realizado | RF-007, RF-008, RF-013 |
| Localizar produtos rapidamente | Como funcionário, quero consultar produtos cadastrados para localizar rapidamente as peças disponíveis | RF-009 |
| Verificar disponibilidade de item | Como funcionário, quero visualizar a quantidade disponível de um produto para saber se há item suficiente para uso | RF-010 |
| Relacionar peças ao atendimento | Como funcionário, quero criar ficha do carro para associar os itens utilizados a um veículo atendido | RF-011 |
| Consultar registros de atendimento | Como funcionário, quero consultar ficha do carro para verificar os registros vinculados ao atendimento | RF-012 |
| Acompanhar histórico do estoque | Como administrador, quero visualizar o histórico de movimentações para acompanhar tudo o que foi registrado no sistema | RF-013, RNF-008 |
| Planejar reposição de itens | Como administrador, quero receber alerta de estoque baixo para planejar a reposição de produtos | RF-014 |
| Acompanhar movimentação financeira | Como administrador, quero gerar relatório de valores para acompanhar os valores movimentados no estoque | RF-015 |
| Garantir usabilidade no contexto real de uso | Como funcionário, quero consultar produtos cadastrados para localizar rapidamente as peças disponíveis | RNF-001, RNF-002, RNF-003, RNF-006 |

---

# Gerenciamento de Projeto

De acordo com o PMBoK v6, o gerenciamento de projetos envolve diferentes áreas integradas, como escopo, tempo, custos, qualidade, recursos e partes interessadas. No contexto do projeto **Toninho Car Estoque**, o gerenciamento será conduzido com foco na organização da equipe, no planejamento das atividades e no uso de recursos compatíveis com o contexto acadêmico do projeto.

## Gerenciamento de Equipe

O gerenciamento da equipe será orientado pela divisão das atividades em etapas, permitindo melhor controle das entregas e distribuição equilibrada das responsabilidades entre os integrantes. Como o projeto envolve levantamento de requisitos, documentação, prototipação, desenvolvimento e testes, será necessário adotar uma dinâmica colaborativa, com acompanhamento contínuo da evolução das tarefas.

A equipe atuará no levantamento e validação dos requisitos com base nas informações fornecidas pelo cliente, na documentação do projeto e atualização do repositório, na modelagem das telas e fluxo de navegação, no desenvolvimento da aplicação mobile, nos testes das funcionalidades e na preparação da apresentação final.

| Área de Atuação | Responsabilidades |
|---|---|
| Análise de Requisitos | levantamento das necessidades, organização das histórias de usuário, definição e revisão dos requisitos |
| Documentação | produção e manutenção dos documentos do projeto e organização do GitHub |
| UX/UI | criação de esboços, definição de fluxo de navegação e melhoria da experiência de uso |
| Desenvolvimento | implementação da aplicação e das funcionalidades priorizadas |
| Testes e Validação | verificação do funcionamento do sistema e identificação de ajustes necessários |

## Gestão de Orçamento

A gestão de orçamento do projeto considera o contexto de um trabalho acadêmico, no qual a equipe utilizará recursos próprios e ferramentas gratuitas. Dessa forma, o custo financeiro direto do projeto é reduzido, concentrando-se principalmente no esforço de desenvolvimento, organização e testes.

O projeto será desenvolvido com ferramentas gratuitas ou gratuitas para fins acadêmicos, os integrantes utilizarão seus próprios computadores e dispositivos móveis, não haverá contratação de serviços pagos para a primeira versão e a proposta atual contempla o desenvolvimento de um protótipo funcional.

| Item | Descrição | Custo Estimado |
|---|---|---|
| Ambiente de desenvolvimento | uso de editor de código, bibliotecas e framework React | R$ 0,00 |
| Repositório e versionamento | uso do GitHub Classroom | R$ 0,00 |
| Prototipação e diagramas | uso de ferramentas gratuitas como Figma, Draw.io ou Mermaid | R$ 0,00 |
| Testes | execução em computadores e celulares dos integrantes | R$ 0,00 |
| Documentação | produção realizada pela própria equipe | R$ 0,00 |

Neste cenário, o projeto apresenta custo financeiro direto nulo, pois depende principalmente do tempo, da dedicação e da organização da equipe.
