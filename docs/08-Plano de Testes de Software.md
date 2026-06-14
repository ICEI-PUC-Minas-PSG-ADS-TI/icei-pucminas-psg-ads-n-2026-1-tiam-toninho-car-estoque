# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="02-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="04-Projeto de Interface.md"> Projeto de Interface</a>

O Plano de Testes de Software do projeto **Toninho Car Estoque** tem como finalidade definir os cenários de teste que serão utilizados para verificar se as funcionalidades da aplicação atendem aos requisitos especificados. Os testes foram planejados com base nas principais funções do sistema, considerando os perfis de uso do **Administrador** e do **Funcionário**, além da estrutura da interface mobile proposta para a solução.

Os cenários selecionados buscam demonstrar se o sistema é capaz de realizar corretamente operações como login por perfil, gerenciamento de produtos, controle de preços, movimentações de estoque, consulta de produtos, gerenciamento da ficha do carro, histórico de movimentações, alertas de estoque baixo e relatórios gerenciais. A estratégia adotada prioriza testes funcionais e de interface, com foco em validar o comportamento esperado das telas e fluxos principais da aplicação.

## Objetivos dos testes

Os testes de software têm os seguintes objetivos:

- verificar se as funcionalidades principais do sistema estão operando corretamente;
- confirmar se os requisitos funcionais foram atendidos;
- validar o fluxo das telas e das ações executadas pelos usuários;
- identificar falhas de comportamento, navegação ou preenchimento de dados;
- apoiar correções antes da entrega final do projeto.

## Escopo dos testes

Os testes contemplam as principais funcionalidades do sistema **Toninho Car Estoque**, com foco nos seguintes módulos:

- autenticação e acesso por perfil;
- gerenciamento de produtos;
- gerenciamento de preços;
- movimentação de estoque;
- consulta de produtos e quantidade disponível;
- gerenciamento da ficha do carro;
- histórico de movimentações;
- alerta de estoque baixo;
- relatórios gerenciais.

## Tipos de testes adotados

Para este projeto, serão considerados os seguintes tipos de teste:

- **Teste funcional:** para verificar se cada função do sistema executa o comportamento esperado;
- **Teste de interface:** para validar a interação entre o usuário e as telas da aplicação;
- **Teste de fluxo:** para conferir se a navegação entre as telas ocorre corretamente;
- **Teste de validação de dados:** para verificar o comportamento do sistema diante de entradas válidas e inválidas.

## Perfis considerados nos testes

Os testes serão executados considerando os perfis de usuário definidos no projeto:

| Perfil | Descrição |
|---|---|
| Administrador | Usuário com acesso às funções de gerenciamento do estoque, preços, histórico, alertas e relatórios |
| Funcionário | Usuário com acesso às funções operacionais, como consulta de produtos, movimentações e ficha do carro |

## Ambiente de teste

Os testes serão realizados considerando o contexto mobile da aplicação e a estrutura prevista para o desenvolvimento em React.

| Item | Descrição |
|---|---|
| Aplicação | Toninho Car Estoque |
| Plataforma | Mobile |
| Tecnologia principal | React |
| Tipo de teste | Manual funcional e de interface |
| Dispositivo | Smartphone ou emulador mobile |
| Base de dados | Dados simulados para validação das funções |
| Responsáveis | Equipe do projeto |

## Cenários de testes selecionados

Os cenários abaixo foram definidos para demonstrar o atendimento dos requisitos principais do sistema.

| ID | Funcionalidade avaliada | Perfil | Cenário de teste | Resultado esperado | Requisito relacionado |
|---|---|---|---|---|---|
| CTS-01 | Login por perfil | Administrador / Funcionário | Realizar login informando credenciais e perfil | O sistema deve permitir o acesso conforme o perfil informado | RF-001 |
| CTS-02 | Gerenciamento de produtos | Administrador | Cadastrar um novo produto com nome, quantidade, preço e quantidade mínima | O produto deve ser salvo e exibido na lista de produtos | RF-002 |
| CTS-03 | Gerenciamento de produtos | Administrador | Editar informações de um produto já cadastrado | O sistema deve atualizar corretamente os dados do produto | RF-002 |
| CTS-04 | Gerenciamento de produtos | Administrador | Excluir um produto existente | O item deve ser removido do cadastro de produtos | RF-002 |
| CTS-05 | Gerenciamento de preços | Administrador | Cadastrar ou alterar o preço de um produto | O valor deve ser atualizado e refletido nas informações do item | RF-003 |
| CTS-06 | Movimentação de estoque | Administrador | Registrar entrada de produto no estoque | A quantidade disponível do item deve ser incrementada | RF-004 |
| CTS-07 | Movimentação de estoque | Funcionário | Registrar saída de produto do estoque | A quantidade disponível do item deve ser reduzida corretamente | RF-004 |
| CTS-08 | Consulta de produtos | Funcionário | Pesquisar um produto pelo nome | O sistema deve localizar e exibir o produto pesquisado | RF-005 |
| CTS-09 | Consulta de quantidade | Funcionário | Visualizar a quantidade disponível de um item | O sistema deve exibir a quantidade correta do produto | RF-005 |
| CTS-10 | Ficha do carro | Funcionário | Criar uma nova ficha informando placa e proprietário | O sistema deve registrar a ficha do veículo com sucesso | RF-006 |
| CTS-11 | Ficha do carro | Administrador / Funcionário | Consultar uma ficha já cadastrada | O sistema deve exibir os dados da ficha e os itens vinculados | RF-006 |
| CTS-12 | Histórico de movimentações | Administrador | Consultar as movimentações registradas no sistema | O sistema deve exibir o histórico de entradas e saídas realizadas | RF-007 |
| CTS-13 | Alerta de estoque baixo | Administrador | Verificar item com quantidade abaixo do mínimo cadastrado | O sistema deve sinalizar o produto em estoque baixo | RF-008 |
| CTS-14 | Relatórios gerenciais | Administrador | Visualizar relatório com movimentações e valores do estoque | O sistema deve apresentar os dados de forma organizada | RF-009 |

### Cenários de teste negativos (validação de dados e controle de acesso)

Além dos cenários principais, foram definidos cenários negativos para verificar o comportamento do sistema diante de entradas inválidas e tentativas de acesso indevido:

| ID | Funcionalidade avaliada | Perfil | Cenário de teste | Resultado esperado | Requisito relacionado |
|---|---|---|---|---|---|
| CTS-15 | Login com credenciais inválidas | Todos | Tentar realizar login com e-mail ou senha incorretos | O sistema deve exibir mensagem de erro e impedir o acesso | RF-001, RNF-004 |
| CTS-16 | Saída maior que o estoque | Funcionário | Registrar saída com quantidade superior à disponível | O sistema deve bloquear a operação e exibir alerta de estoque insuficiente | RF-004, RNF-005 |
| CTS-17 | Cadastro com campos obrigatórios vazios | Administrador | Tentar salvar produto sem preencher nome, código ou preço | O sistema deve impedir o salvamento e indicar os campos com erro | RF-002 |
| CTS-18 | Acesso indevido por perfil | Funcionário | Verificar se o funcionário visualiza funções de gestão (cadastro/edição de produtos, relatórios) | As funções administrativas não devem estar visíveis nem acessíveis ao funcionário | RNF-004 |
| CTS-19 | Criação de ficha sem dados mínimos | Funcionário | Tentar criar ficha sem informar placa ou nome do cliente | O sistema deve impedir o registro e solicitar o preenchimento dos campos obrigatórios | RF-006 |

## Casos de teste detalhados

### Caso de Teste 1 – Login por perfil

| Campo | Descrição |
|---|---|
| ID | CTS-01 |
| Objetivo | Validar o acesso ao sistema conforme o perfil informado |
| Pré-condição | Usuário cadastrado no sistema |
| Passos | Selecionar perfil, informar usuário e senha, acionar o botão de entrada |
| Resultado esperado | O sistema deve autenticar o usuário e abrir a área correspondente ao perfil |
| Critério de aceitação | O acesso deve ocorrer sem erro para credenciais válidas |

### Caso de Teste 2 – Cadastro de produto

| Campo | Descrição |
|---|---|
| ID | CTS-02 |
| Objetivo | Validar o cadastro de um novo produto no estoque |
| Pré-condição | Usuário com perfil de administrador autenticado |
| Passos | Acessar a tela de adicionar produto, preencher os campos e salvar |
| Resultado esperado | O produto deve ser registrado e aparecer na lista de produtos |
| Critério de aceitação | O item deve ficar disponível para consulta e movimentação |

### Caso de Teste 3 – Registro de saída de estoque

| Campo | Descrição |
|---|---|
| ID | CTS-07 |
| Objetivo | Validar a baixa de item no estoque |
| Pré-condição | Produto cadastrado com quantidade disponível |
| Passos | Acessar a tela de movimentação, selecionar saída, informar produto e quantidade, confirmar |
| Resultado esperado | A quantidade do item deve ser reduzida corretamente |
| Critério de aceitação | O estoque deve refletir a saída sem inconsistência |

### Caso de Teste 4 – Criação de ficha do carro

| Campo | Descrição |
|---|---|
| ID | CTS-10 |
| Objetivo | Validar o cadastro de uma ficha de veículo |
| Pré-condição | Usuário autenticado com permissão para acessar fichas |
| Passos | Acessar a tela de criar ficha, informar placa e nome do proprietário, salvar |
| Resultado esperado | A ficha deve ser registrada e disponibilizada para consulta |
| Critério de aceitação | O registro deve aparecer na lista de fichas do sistema |

### Caso de Teste 5 – Alerta de estoque baixo

| Campo | Descrição |
|---|---|
| ID | CTS-13 |
| Objetivo | Validar a exibição de alerta de estoque baixo |
| Pré-condição | Produto com quantidade disponível menor ou igual ao limite mínimo cadastrado |
| Passos | Consultar o dashboard ou listagem de produtos |
| Resultado esperado | O sistema deve destacar o item como estoque baixo |
| Critério de aceitação | O alerta deve ser visível ao administrador |

### Caso de Teste 6 – Login com credenciais inválidas

| Campo | Descrição |
|---|---|
| ID | CTS-15 |
| Objetivo | Validar o bloqueio de acesso com credenciais incorretas |
| Pré-condição | Aplicação na tela de login |
| Passos | Informar e-mail válido com senha incorreta (e depois e-mail não cadastrado), acionar o botão de entrada |
| Resultado esperado | O sistema deve exibir mensagem de erro e permanecer na tela de login |
| Critério de aceitação | Nenhum acesso deve ser concedido com credenciais inválidas |

### Caso de Teste 7 – Saída maior que o estoque disponível

| Campo | Descrição |
|---|---|
| ID | CTS-16 |
| Objetivo | Validar o bloqueio de saída com quantidade superior ao estoque |
| Pré-condição | Produto cadastrado com quantidade disponível conhecida |
| Passos | Acessar a tela de movimentação, selecionar saída, informar quantidade maior que a disponível, confirmar |
| Resultado esperado | O sistema deve exibir alerta de estoque insuficiente e não registrar a movimentação |
| Critério de aceitação | A quantidade do produto deve permanecer inalterada após a tentativa |

### Caso de Teste 8 – Controle de acesso por perfil

| Campo | Descrição |
|---|---|
| ID | CTS-18 |
| Objetivo | Validar que o funcionário não acessa funções administrativas |
| Pré-condição | Usuário com perfil de funcionário autenticado |
| Passos | Navegar por todas as abas disponíveis no perfil de funcionário |
| Resultado esperado | As funções de cadastro/edição/exclusão de produtos, alteração de preços e relatórios não devem estar visíveis nem acessíveis |
| Critério de aceitação | Nenhuma função administrativa deve ser executável pelo perfil de funcionário |

## Critérios de aprovação

Os testes serão considerados satisfatórios quando:

- os cenários principais forem executados com sucesso;
- as funções testadas apresentarem comportamento consistente com os requisitos;
- os erros identificados não comprometerem o fluxo principal do sistema;
- os perfis de usuário tiverem acesso apenas às funções previstas.

## Ferramentas de Testes (Opcional)

Os testes serão realizados principalmente de forma manual, utilizando o protótipo e a aplicação desenvolvida em **React**, com apoio de navegador, emulador ou dispositivo móvel. O controle das correções e ajustes poderá ser feito com apoio do **GitHub**, permitindo registrar problemas identificados, acompanhar alterações no código e organizar as melhorias necessárias.

Entre as ferramentas de apoio previstas para o processo de teste, destacam-se:

- **Visual Studio Code**, para acompanhamento e correção do código;
- **GitHub**, para versionamento e controle das alterações;
- **Emulador mobile ou dispositivo físico**, para validação do comportamento da interface;
- **Protótipo de interface**, para comparação entre fluxo previsto e fluxo implementado.

Essas ferramentas são suficientes para a realidade e o porte do projeto, permitindo validar os requisitos definidos e apoiar a evolução da aplicação até a entrega final.
