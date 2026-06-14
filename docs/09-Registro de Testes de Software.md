# Registro de Testes de Software

<span style="color:red">Pré-requisitos: <a href="04-Projeto de Interface.md"> Projeto de Interface</a></span>, <a href="08-Plano de Testes de Software.md"> Plano de Testes de Software</a>

O Registro de Testes de Software do projeto **Toninho Car Estoque** apresenta os resultados obtidos na execução dos cenários definidos no plano de testes. O objetivo foi verificar se as principais funcionalidades do sistema atendem aos requisitos especificados, considerando os perfis de **Administrador** e **Funcionário** e o fluxo de uso previsto para a aplicação mobile.

Os testes foram conduzidos com foco nas funcionalidades centrais do sistema, como login por perfil, gerenciamento de produtos, controle de preços, movimentações de estoque, consulta de produtos, gerenciamento da ficha do carro, histórico de movimentações, alertas e relatórios. A análise dos resultados permitiu identificar pontos fortes da solução, falhas pontuais e melhorias necessárias para as próximas iterações do projeto.

## Identificação da execução

| Item | Informação |
|---|---|
| Projeto | Toninho Car Estoque |
| Data da execução | 11/04/2026 |
| Responsável pela execução | Equipe do projeto |
| Tipo de teste | Funcional manual |
| Tecnologia avaliada | React |
| Perfis testados | Administrador e Funcionário |

## Resumo da execução

| Total de cenários executados | Cenários aprovados | Cenários com falhas parciais | Cenários reprovados |
|---|---|---|---|
| 14 | 11 | 3 | 0 |

## Resultados dos testes

| ID | Funcionalidade avaliada | Perfil | Resultado obtido | Situação | Observação |
|---|---|---|---|---|---|
| CTS-01 | Login por perfil | Administrador / Funcionário | O sistema permitiu acesso conforme o perfil selecionado | Aprovado | Funcionamento correto |
| CTS-02 | Cadastro de produto | Administrador | Produto cadastrado com sucesso e exibido na lista | Aprovado | Cadastro validado |
| CTS-03 | Edição de produto | Administrador | Alterações salvas corretamente | Aprovado | Atualização funcionando |
| CTS-04 | Exclusão de produto | Administrador | Produto removido do cadastro | Aprovado | Exclusão concluída sem erro |
| CTS-05 | Gerenciamento de preços | Administrador | Preço alterado e refletido corretamente no item | Aprovado | Comportamento esperado |
| CTS-06 | Entrada de produto no estoque | Administrador | Quantidade atualizada corretamente após entrada | Aprovado | Estoque incrementado |
| CTS-07 | Saída de produto do estoque | Funcionário | Quantidade reduzida corretamente após saída | Aprovado | Estoque decrementado |
| CTS-08 | Consulta de produto por nome | Funcionário | Produto localizado na busca | Aprovado | Busca funcionando |
| CTS-09 | Visualização de quantidade disponível | Funcionário | Quantidade exibida corretamente | Aprovado | Informação clara |
| CTS-10 | Criação de ficha do carro | Funcionário | Ficha registrada com placa e proprietário | Aprovado | Cadastro funcionando |
| CTS-11 | Consulta de ficha do carro | Administrador / Funcionário | Sistema exibiu os dados da ficha corretamente | Aprovado | Visualização adequada |
| CTS-12 | Histórico de movimentações | Administrador | Histórico exibido corretamente, mas sem filtros adicionais | Parcial | Necessidade de melhoria |
| CTS-13 | Alerta de estoque baixo | Administrador | Alerta exibido para item com quantidade mínima atingida | Aprovado | Funcionamento correto |
| CTS-14 | Relatórios gerenciais | Administrador | Relatório exibido com dados de movimentação e valores, porém com necessidade de melhor organização visual | Parcial | Exige refinamento de interface |

## Evidências observadas

Durante a execução dos testes, foram observadas as seguintes evidências de funcionamento do sistema:

- a tela de login direcionou corretamente os usuários conforme o perfil selecionado;
- o cadastro e a edição de produtos refletiram as alterações na listagem;
- a movimentação de entrada e saída alterou corretamente a quantidade dos itens;
- a tela de produtos apresentou os dados esperados, incluindo nome e quantidade disponível;
- a funcionalidade de ficha do carro registrou e exibiu corretamente as informações do veículo;
- o alerta de estoque baixo foi exibido para produtos com quantidade mínima atingida;
- o histórico e o relatório gerencial apresentaram os dados básicos esperados, embora ainda exijam melhorias de organização visual.

## Falhas detectadas

| ID | Falha detectada | Impacto | Ação corretiva sugerida |
|---|---|---|---|
| F-01 | Histórico de movimentações sem filtros por data, produto ou tipo | Médio | Implementar filtros para facilitar a consulta |
| F-02 | Relatório gerencial com separação visual limitada entre quantidade e valor | Médio | Melhorar layout e hierarquia visual dos dados |
| F-03 | Alguns botões de ação possuem pouco destaque visual | Baixo | Aplicar maior contraste e reforço visual nos botões principais |

## Avaliação

Os resultados dos testes indicam que o sistema **Toninho Car Estoque** atende satisfatoriamente aos requisitos principais definidos para a primeira versão da aplicação. As funcionalidades mais importantes, como login por perfil, cadastro e edição de produtos, movimentações de estoque, consulta de produtos, criação de fichas e alerta de estoque baixo, apresentaram comportamento consistente e compatível com o esperado.

Entre os pontos fortes identificados, destacam-se a organização geral do fluxo da aplicação, a coerência entre as telas e a execução correta das funções principais do sistema. As telas de login, produtos, movimentação e fichas apresentaram bom desempenho funcional, demonstrando que a base do aplicativo está sólida para o escopo inicialmente definido.

Entre os pontos fracos, foram observadas limitações principalmente na camada de visualização e apoio à análise, como a ausência de filtros no histórico de movimentações e a necessidade de melhorar a leitura das informações no relatório gerencial. Também foram identificados pequenos ajustes de interface, especialmente relacionados ao destaque visual de botões e ações importantes.

Nas próximas iterações, o grupo pretende atuar nesses pontos por meio de melhorias no layout das telas, refinamento da organização visual dos relatórios, inclusão de filtros no histórico e fortalecimento da clareza das ações principais do sistema. Essas melhorias têm como objetivo aumentar a eficiência do uso e tornar a experiência do usuário ainda mais intuitiva.

## Melhorias geradas a partir dos testes

Com base nos resultados obtidos, foram definidas as seguintes melhorias para evolução da solução:

- implementar filtros no histórico de movimentações;
- melhorar a apresentação visual dos relatórios gerenciais;
- reforçar visualmente os botões de ação principais;
- aprimorar a leitura de informações quantitativas e financeiras nas telas de relatório;
- revisar detalhes visuais de navegação para tornar o fluxo ainda mais claro.

## Conclusão

Os testes realizados demonstraram que o sistema **Toninho Car Estoque** possui uma base funcional consistente e atende ao objetivo principal do projeto, que é oferecer um controle mobile de estoque adequado à rotina da mecânica. A maior parte dos cenários executados foi aprovada, e as falhas detectadas não comprometem o funcionamento essencial da aplicação.

Conclui-se que o projeto apresenta boa qualidade funcional para a etapa atual de desenvolvimento, sendo recomendada a continuidade do refinamento da interface e da visualização dos dados para fortalecer ainda mais a solução nas próximas entregas.
