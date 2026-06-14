# Plano de Testes de Usabilidade

O Plano de Testes de Usabilidade do projeto **Toninho Car Estoque** tem como objetivo avaliar se a interface do aplicativo é clara, intuitiva e adequada à rotina da mecânica. Os testes serão aplicados com base nas telas já prototipadas do sistema, buscando verificar se os usuários conseguem navegar, localizar informações e executar tarefas sem dificuldade excessiva.

A avaliação será feita considerando os dois perfis principais do sistema, **Administrador** e **Funcionário**, observando especialmente a facilidade de uso das telas de login, dashboard, produtos, movimentação de estoque, fichas de veículo e cadastro de produtos.

## Objetivos dos testes

- verificar se os usuários entendem facilmente a navegação do aplicativo;
- avaliar se as telas apresentam informações claras e bem organizadas;
- identificar dificuldades no uso das funções principais;
- analisar se os usuários conseguem concluir as tarefas com agilidade;
- levantar melhorias para a interface e para o fluxo de uso.

## Escopo dos testes

Os testes de usabilidade irão abranger as seguintes telas e funcionalidades do sistema:

- tela de login;
- dashboard inicial;
- consulta de produtos;
- cadastro de produto;
- edição de produto;
- movimentação de estoque;
- consulta de fichas;
- criação de ficha do carro;
- visualização do detalhe da ficha do carro.

## Perfis dos participantes

| Perfil | Descrição |
|---|---|
| Administrador | Usuário responsável por cadastrar produtos, editar preços, acompanhar estoque e visualizar informações gerenciais |
| Funcionário | Usuário responsável por consultar produtos, registrar movimentações e preencher fichas de veículos |

## Quantidade de participantes

Serão considerados entre **4 e 5 participantes**, distribuídos entre os perfis de administrador e funcionário, para permitir uma avaliação prática das principais interações do sistema.

## Critérios de avaliação

Durante os testes, serão observados os seguintes aspectos:

- facilidade para entender a tela de login e escolher o perfil correto;
- clareza das informações do dashboard;
- facilidade para localizar produtos;
- facilidade para registrar entrada ou saída de item;
- compreensão dos formulários de cadastro e edição;
- facilidade para criar e consultar fichas de veículos;
- percepção geral sobre organização visual e navegação.

## Métricas de usabilidade

| Métrica | Descrição |
|---|---|
| Taxa de sucesso | Percentual de tarefas concluídas corretamente |
| Tempo de execução | Tempo necessário para realizar cada tarefa |
| Quantidade de erros | Número de erros cometidos pelo usuário |
| Necessidade de ajuda | Quantidade de vezes em que o usuário precisou de orientação |
| Satisfação | Avaliação subjetiva sobre facilidade de uso |

## Casos de teste de usabilidade

| ID | Tela / Funcionalidade | Tarefa do usuário | Resultado esperado |
|---|---|---|---|
| TU-01 | Login | Selecionar o perfil correto e entrar no sistema | O usuário deve acessar o sistema sem dificuldade |
| TU-02 | Dashboard | Identificar total de produtos, estoque baixo e valor total | O usuário deve compreender rapidamente os indicadores exibidos |
| TU-03 | Produtos | Localizar um produto na lista | O usuário deve encontrar o item com facilidade |
| TU-04 | Cadastro de produto | Cadastrar um novo produto | O administrador deve preencher o formulário corretamente |
| TU-05 | Edição de produto | Editar um produto existente | O administrador deve alterar os dados sem dificuldade |
| TU-06 | Movimentação | Registrar entrada ou saída de item | O usuário deve concluir a movimentação corretamente |
| TU-07 | Fichas | Localizar uma ficha de carro existente | O usuário deve encontrar a ficha com rapidez |
| TU-08 | Criar ficha | Cadastrar uma nova ficha de veículo | O usuário deve preencher os dados corretamente |
| TU-09 | Detalhe da ficha | Consultar itens e informações da ficha do carro | O usuário deve entender os dados exibidos sem dificuldade |

## Procedimento de execução

1. apresentar ao participante o objetivo do teste;
2. informar que o foco da avaliação está na interface do sistema;
3. solicitar a execução das tarefas previstas;
4. observar dificuldades, dúvidas, erros e tempo de execução;
5. registrar comentários e sugestões ao final do uso.

## Critérios de sucesso

Os testes serão considerados satisfatórios quando:
- a maioria dos participantes conseguir concluir as tarefas propostas;
- a navegação ocorrer com poucas dúvidas;
- os formulários forem compreendidos com facilidade;
- as informações das telas forem interpretadas corretamente;
- os problemas encontrados forem pontuais e corrigíveis com ajustes simples.
