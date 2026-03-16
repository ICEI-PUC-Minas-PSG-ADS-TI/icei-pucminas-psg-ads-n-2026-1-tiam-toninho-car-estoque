# Metodologia

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

Esta seção descreve a metodologia de trabalho adotada pela equipe para o desenvolvimento do projeto **Toninho Car Estoque**, desde a organização dos ambientes de trabalho até a forma de gerenciamento das atividades, do código-fonte e da colaboração entre os integrantes. O projeto será desenvolvido utilizando **React** para construção da aplicação, com foco em uma solução mobile para controle de estoque da mecânica.

A equipe definiu uma metodologia de trabalho baseada em organização incremental, divisão de responsabilidades e acompanhamento contínuo das tarefas, de modo que cada etapa do projeto possa ser desenvolvida, validada e ajustada ao longo do semestre. Para isso, serão utilizados ambientes específicos para documentação, versionamento, desenvolvimento, prototipação e comunicação, além do GitHub como ferramenta central de gestão técnica do projeto.

## Relação de Ambientes de Trabalho

Os artefatos do projeto serão produzidos e organizados em diferentes ambientes, cada um com um propósito específico dentro do desenvolvimento da solução. A tabela a seguir apresenta os principais ambientes de trabalho que serão utilizados pela equipe.

| Ambiente | Plataforma | Link de Acesso |
|---|---|---|
| Repositório do projeto | GitHub Classroom / GitHub | https://github.com |
| Desenvolvimento da aplicação | Visual Studio Code | https://code.visualstudio.com/ |
| Desenvolvimento mobile com React | React / React Native / Expo | https://react.dev/ |
| Prototipação de telas | Figma | https://www.figma.com/ |
| Criação de diagramas | Draw.io / Diagrams.net | https://app.diagrams.net/ |
| Comunicação da equipe | WhatsApp | https://www.whatsapp.com/ |
| Documentação complementar | Markdown no GitHub | https://github.com/ |

O **GitHub** será utilizado como ambiente principal para armazenamento do código-fonte, versionamento, documentação e acompanhamento técnico das entregas. O **Visual Studio Code** será o editor de código adotado pela equipe por possuir integração direta com Git e GitHub, o que facilita commits, merges e sincronização do projeto. Para a construção da interface e da aplicação, será utilizado **React**, considerando a proposta de desenvolvimento mobile do sistema. O **Figma** será empregado para a criação de wireframes e protótipos das telas, enquanto o **Draw.io** será utilizado na construção de diagramas, como casos de uso e outros artefatos visuais do projeto. A comunicação interna do grupo será feita por **WhatsApp**, devido à praticidade e rapidez no alinhamento das atividades.

## Controle de Versão

A ferramenta de controle de versão adotada no projeto será o [Git](https://git-scm.com/), enquanto o [GitHub](https://github.com) será utilizado para hospedagem do repositório e apoio à organização do trabalho da equipe.

A configuração do repositório será estruturada para permitir que o grupo trabalhe de forma organizada, evitando conflitos desnecessários e garantindo rastreabilidade nas alterações realizadas ao longo do desenvolvimento. A estratégia adotada pela equipe será baseada em uma branch principal estável e uma branch de desenvolvimento, além de branches específicas para novas funcionalidades e correções.

O projeto seguirá a seguinte convenção para o nome das branches:

- `main`: versão principal e estável do projeto;
- `dev`: branch de desenvolvimento e integração das funcionalidades;
- `feature/nome-da-funcionalidade`: branches criadas para desenvolvimento de novas funcionalidades;
- `fix/nome-do-ajuste`: branches criadas para correção de erros ou ajustes pontuais.

A branch `main` será reservada para versões mais estáveis da aplicação, enquanto a branch `dev` concentrará a integração das funcionalidades em andamento. Cada nova atividade relevante será desenvolvida em uma branch própria, criada a partir da `dev`, o que facilita o controle do trabalho realizado por cada integrante.

Os **commits** serão realizados de forma frequente e com mensagens objetivas, descrevendo claramente a alteração feita. A equipe adotará um padrão simples e direto, com exemplos como:

- `feat: cadastro de produtos`
- `fix: correção na saída de estoque`
- `docs: atualização da documentação de requisitos`
- `style: ajuste visual da tela de login`

Os **merges** serão realizados preferencialmente por meio de **pull requests**, permitindo revisão antes da integração na branch `dev` ou `main`. Esse processo ajuda a manter maior controle sobre as alterações e reduz a chance de introdução de erros no projeto principal.

Quanto ao uso de **tags**, a equipe pretende utilizá-las para marcar versões importantes do projeto, especialmente nas entregas parciais e finais da disciplina. Exemplos de tags planejadas:

- `v0.1`: estrutura inicial do projeto;
- `v0.2`: protótipo navegável;
- `v0.3`: funcionalidades principais implementadas;
- `v1.0`: versão final para entrega.

Em relação à gerência de **issues**, o projeto utilizará o próprio GitHub para registrar tarefas, correções e melhorias. As issues serão classificadas com etiquetas que facilitem a identificação do tipo de trabalho a ser executado. A equipe pretende adotar as seguintes labels:

- `documentation`: tarefas relacionadas à documentação;
- `bug`: correção de erro identificado no sistema;
- `enhancement`: melhoria em funcionalidade existente;
- `feature`: implementação de nova funcionalidade;
- `ui`: ajustes relacionados à interface e experiência do usuário;
- `testing`: tarefas relacionadas a testes e validação.

Essa organização permitirá que a equipe acompanhe melhor o que já foi feito, o que está em andamento e o que ainda precisa ser desenvolvido.

## Gerenciamento de Projeto

### Divisão de Papéis

A equipe utilizará uma organização baseada em princípios ágeis, com definição de papéis para facilitar o acompanhamento das atividades e a distribuição equilibrada das responsabilidades entre os integrantes.

A divisão de papéis do grupo será a seguinte:

- **Product Owner:** Marcus Vinicius;
- **Scrum Master:** Geovane Araújo;
- **Equipe de Desenvolvimento:** Marcus Vinicius, Geovane Araújo e Rafael Moreira.

O integrante **Marcus Vinicius** atuará como Product Owner, sendo responsável por acompanhar as necessidades do cliente, validar as prioridades do sistema e garantir que o produto desenvolvido esteja alinhado ao objetivo do projeto. O integrante **Geovane Araújo** atuará como Scrum Master, auxiliando na organização das tarefas, no acompanhamento do fluxo de trabalho e no alinhamento entre os membros da equipe. Já **Rafael Moreira** atuará de forma mais direta no desenvolvimento da aplicação, colaborando também nas etapas de testes, ajustes e construção técnica das funcionalidades.

Embora exista essa divisão principal de papéis, o desenvolvimento do projeto será colaborativo, de modo que todos os integrantes possam contribuir em documentação, implementação, validação e apresentação do trabalho.

### Processo

A equipe adotará o **Scrum** como base para o processo de desenvolvimento do projeto, adaptando sua aplicação ao contexto acadêmico e ao tamanho do grupo. O desenvolvimento será organizado de forma incremental, com entregas parciais e acompanhamento contínuo do andamento das atividades.

O fluxo de trabalho será estruturado em etapas curtas, permitindo que a equipe avance no projeto gradualmente, revisando e ajustando os resultados conforme necessário. O processo seguirá, de forma geral, as seguintes fases:

1. levantamento e consolidação dos requisitos com base nas necessidades do cliente;
2. elaboração e revisão da documentação do projeto;
3. definição da estrutura inicial da aplicação;
4. desenvolvimento das funcionalidades prioritárias;
5. realização de testes e correções;
6. organização da entrega final e preparação da apresentação.

Para apoiar esse processo, o grupo fará uso do **GitHub Projects**, utilizando um quadro de tarefas para acompanhar o status das atividades. O quadro poderá ser organizado em colunas como:

- **Backlog**
- **A Fazer**
- **Em Andamento**
- **Em Revisão**
- **Concluído**

Cada tarefa cadastrada no quadro será vinculada, sempre que possível, a uma issue ou a uma funcionalidade do projeto. Isso permitirá maior visibilidade do andamento do trabalho e facilitará o acompanhamento individual e coletivo das entregas.

Além disso, a equipe pretende realizar alinhamentos frequentes entre os integrantes para revisar pendências, redistribuir tarefas quando necessário e garantir que o cronograma do projeto seja cumprido.

### Ferramentas

As ferramentas empregadas no projeto foram escolhidas com base em sua aderência ao contexto acadêmico, facilidade de uso, integração com o processo de desenvolvimento e disponibilidade gratuita.

As principais ferramentas utilizadas serão:

- **Visual Studio Code** como editor de código;
- **Git** para controle de versão;
- **GitHub** para hospedagem do repositório, gerenciamento de issues e acompanhamento das tarefas;
- **React** para desenvolvimento da aplicação;
- **Figma** para prototipação das telas;
- **Draw.io** para construção de diagramas;
- **WhatsApp** para comunicação entre os integrantes.

O **Visual Studio Code** foi escolhido por oferecer um ambiente moderno, leve e amplamente utilizado no desenvolvimento com React, além de integração eficiente com Git. O **GitHub** será essencial tanto para o versionamento quanto para a gestão do projeto, centralizando código, documentação, issues e acompanhamento das tarefas. O **React** foi escolhido por ser a tecnologia definida para o desenvolvimento da aplicação e por permitir a construção da interface de forma componentizada e organizada. O **Figma** foi selecionado por facilitar a criação e validação visual das telas antes da implementação, enquanto o **Draw.io** oferece praticidade na elaboração de diagramas. Já o **WhatsApp** será utilizado como ferramenta de comunicação por ser acessível e ágil para o dia a dia da equipe.

Com esse conjunto de ferramentas e com a metodologia adotada, a equipe busca garantir organização, colaboração e clareza no desenvolvimento do projeto **Toninho Car Estoque** ao longo do semestre.
