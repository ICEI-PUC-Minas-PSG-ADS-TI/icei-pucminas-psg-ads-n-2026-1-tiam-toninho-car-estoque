# Template Padrão da Aplicação

<span style="color:red">Pré-requisitos: <a href="02-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="04-Projeto de Interface.md"> Projeto de Interface</a>, <a href="03-Metodologia.md"> Metodologia</a>

Esta seção define o layout padrão adotado em todas as telas do aplicativo **Toninho Car Estoque**, incluindo identidade visual, paleta de cores, tipografia, iconografia e aspectos de responsividade. O objetivo é garantir consistência visual em toda a aplicação, facilitando o aprendizado do uso (RNF-002) e a legibilidade das informações em telas de celular (RNF-006).

## Identidade Visual

O Toninho Car Estoque utiliza uma identidade visual sóbria e funcional, adequada ao ambiente de uma oficina mecânica: fundo claro, cards com cantos arredondados e cores de destaque utilizadas com significado semântico (sucesso, alerta, erro), evitando poluição visual.

## Paleta de Cores

A paleta de cores é definida por constantes reutilizadas em todas as telas, garantindo uniformidade da interface:

| Cor | Código | Uso na aplicação |
|---|---|---|
| Azul primário | `#2563EB` | Cor principal da marca: botões de ação, abas ativas, links e destaques de navegação |
| Verde | `#10B981` | Indicadores positivos: entradas de estoque, confirmações e status "concluído" |
| Vermelho | `#EF4444` | Indicadores negativos: saídas/baixas de estoque, exclusões e alertas críticos |
| Amarelo | `#F59E0B` | Avisos: alerta de estoque baixo e situações que exigem atenção |
| Cinza escuro | `#1F2937` | Textos principais e títulos |
| Cinza claro | `#F3F4F6` | Fundo das telas e separadores |
| Branco | `#FFFFFF` | Fundo de cards e formulários |

## Tipografia

A aplicação utiliza a fonte padrão do sistema operacional do dispositivo (San Francisco no iOS e Roboto no Android), garantindo legibilidade nativa e desempenho. A hierarquia tipográfica adotada é:

| Elemento | Tamanho | Peso |
|---|---|---|
| Título de tela | 24px | Bold |
| Título de card / seção | 18px | Semibold |
| Texto padrão | 14–16px | Regular |
| Rótulos de campos e legendas | 12–14px | Medium |
| Valores numéricos de destaque (dashboard) | 20–28px | Bold |

## Layout Padrão das Telas

Todas as telas seguem a mesma estrutura básica:

1. **Cabeçalho** com o título da tela;
2. **Área de conteúdo** rolável, organizada em cards com cantos arredondados e sombra leve;
3. **Barra de navegação inferior** com abas fixas (5 abas para o perfil Administrador e 4 para o Funcionário), com ícone e rótulo em cada aba e destaque em azul primário para a aba ativa.

Os formulários seguem o padrão: rótulo acima do campo, campo com borda e fundo branco, mensagens de validação abaixo do campo e botão de ação principal em azul primário ocupando a largura da tela. Ações destrutivas (excluir produto, excluir ficha) utilizam vermelho e exigem confirmação.

## Iconografia

Os ícones utilizados são da biblioteca padrão do ecossistema Expo (`@expo/vector-icons` / Ionicons), aplicados de forma consistente:

| Ícone | Uso |
|---|---|
| Casa | Aba Dashboard |
| Caixa / cubo | Aba Produtos |
| Setas (troca) | Aba Movimentações |
| Carro / documento | Aba Fichas |
| Gráfico | Aba Relatórios (somente Administrador) |
| Lupa | Campos de busca |
| Sinal de + | Ações de cadastro (novo produto, nova ficha) |
| Lixeira | Ações de exclusão |
| Alerta (triângulo) | Indicador de estoque baixo |

## Responsividade

Por se tratar de uma aplicação **mobile-first** desenvolvida em React Native, o layout utiliza componentes flexíveis (`flexbox`) que se adaptam a diferentes tamanhos e densidades de tela de smartphones (RNF-001). As listas utilizam rolagem virtual, os cards ocupam a largura disponível com margens fixas e os botões possuem área mínima de toque de 44px para uso confortável, inclusive em ambiente de oficina.

## Implementação

O padrão visual é implementado por meio de `StyleSheet.create()` do React Native, mantendo a separação entre lógica e apresentação, e por componentes reutilizáveis (`DashboardView`, `MovimentacoesView`, `FichasLista`, `CriarFichaForm`, `FichaDetalhes`) que asseguram que o mesmo padrão de card, formulário e lista seja aplicado em todas as telas. Detalhes adicionais dos padrões de codificação estão descritos na seção 6 da <a href="07-Programação de Funcionalidades.md">Programação de Funcionalidades</a>.
