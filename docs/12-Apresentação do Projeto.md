# Apresentação

<span style="color:red">Pré-requisitos: Todos os demais artefatos</span>

Esta seção descreve a apresentação final do projeto **Toninho Car Estoque**, contemplando os itens trabalhados nos demais artefatos da documentação. O conjunto de slides (PowerPoint/PDF) e o vídeo de demonstração da solução ficam disponíveis na pasta <a href="../presentation/README.md">presentation</a> do repositório.

## Título do Projeto

**Toninho Car Estoque** — Aplicativo mobile de controle de estoque para a mecânica Toninho Car.

## Identidade Visual (Marca, Design)

A apresentação segue a mesma identidade visual da aplicação, definida no <a href="06-Template Padrão da Aplicação.md">Template Padrão da Aplicação</a>: azul primário `#2563EB` como cor da marca, apoiada pelas cores semânticas verde (`#10B981`), vermelho (`#EF4444`) e amarelo (`#F59E0B`), com fundo claro e tipografia limpa. As imagens utilizadas nos slides são capturas reais das telas do aplicativo e elementos visuais relacionados ao contexto automotivo (peças, oficina, veículos), mantendo a temática do problema.

## Conjunto de Slides (Estrutura)

A apresentação está organizada na seguinte estrutura, distribuindo o conteúdo de forma coerente dentro do tempo determinado:

| # | Slide | Conteúdo | Artefato de origem |
|---|---|---|---|
| 1 | Capa | Nome do projeto, marca, integrantes e orientador | README |
| 2 | Contexto e Problema | A dificuldade de controle de estoque na mecânica Toninho Car | Documentação de Contexto |
| 3 | Objetivos | Objetivo geral e objetivos específicos da solução | Documentação de Contexto |
| 4 | Público-Alvo e Personas | Perfis de Administrador e Funcionário (Antônio, Carol e Antoni) | Contexto / Especificação |
| 5 | Requisitos | Principais requisitos funcionais (RF-001 a RF-009) e não funcionais, com priorização MoSCoW | Especificação do Projeto |
| 6 | Metodologia | Scrum adaptado, papéis da equipe, GitHub (branches, issues, projects) | Metodologia |
| 7 | Projeto de Interface | Diagrama de fluxo e wireframes das principais telas | Projeto de Interface |
| 8 | Arquitetura da Solução | React Native + Expo no front-end e Supabase como backend (BaaS); modelo de dados | Arquitetura da Solução |
| 9 | Demonstração da Aplicação | Telas implementadas: login por perfil, produtos, movimentações, fichas e relatórios | Programação de Funcionalidades |
| 10 | Testes de Software | Resumo da execução: 14 cenários, 11 aprovados, 3 parciais; falhas e melhorias | Plano/Registro de Testes de Software |
| 11 | Testes de Usabilidade | Resultados com 4 participantes e principais melhorias identificadas | Plano/Registro de Testes de Usabilidade |
| 12 | Conclusão e Próximos Passos | Requisitos atendidos, lições aprendidas e evolução prevista (filtros no histórico, refinamento dos relatórios, autenticação Supabase completa) | Registros de Testes |

## Vídeo de Demonstração

O vídeo de demonstração apresenta o fluxo completo de uso da aplicação nos dois perfis:

1. login como **Administrador** → dashboard → cadastro de produto → alteração de preço → registro de entrada → relatório gerencial;
2. login como **Funcionário** → consulta de produto → registro de saída → criação de ficha do carro → consulta do detalhe da ficha com itens e valor total.

> **Pendência:** o arquivo de slides (PDF/PPTX) e o vídeo devem ser adicionados à pasta `presentation/` antes da entrega final.
