# Pattern Frontend

Este documento descreve a estrutura de pastas e os padroes de organizacao
usados hoje no `mensalizee-frontend`, seguindo a ideia do exemplo em
`vexpenses-frontend/docs`, mas adaptado ao formato real deste projeto.

## Estrutura geral

O projeto esta dividido em tres camadas principais dentro de `src`:

- `app`: regras de aplicacao, acesso a API, cache, store, modulos e roteamento
- `resources`: paginas, layouts e componentes visuais
- `shared`: utilitarios, constantes, estilos globais e tipagens reutilizaveis

Fora de `src`, tambem vale observar:

- `public`: assets estaticos servidos pelo Vite
- `scripts`: automacoes internas, como geracao de modulos
- `docs`: documentacao de organizacao do projeto

## Nomes de arquivos

Utilizaremos **kebab-case** nos nomes dos arquivos e seguiremos as seguintes **extensões**:

- Página -  **.page.ts**
- Testes - **.spec.tsx**
- Utilitários/Helpers - **.helper.ts**
- Constantes - **.constant.ts**
- Arquivos de rota - **.routes.ts**
- Validações de regras de negócio - **.validation.ts**
- Schema dos forms - **.schema.ts**
- Métodos para comunicação com api - **.service.ts**
- Index - **index.ts** → Utilizado para agrupar e exportar o todos os arquivos quando necessário (nunca usar * para exportar)
  
Deve seguir `kebab-case` nos nomes de arquivos
e pastas, com sufixos semanticamente fortes.

Padroes:

- Pagina: `*.page.tsx`
- View: `*.view.tsx`
- Componente local: `*.component.tsx`
- Hook: `use-*.ts`
- Use case: `*.use-case.ts`
- Service: `*.service.ts`
- Chaves de cache: `*.keys.ts`
- Tipos agrupados: `*.types.ts`
- Constantes: `*.constants.ts`
- Utilitario: `*.util.ts`
- Barrel export: `index.ts`

## Nomes de pastas

- Pastas raízes (src, components, resources, pages, styles, contexts, etc)  - Utilizar **letras minúsculas**
- Pastas agrupadoras (contém vários arquivos relacionando entre si, ex.: user-context, input-text, etc) - Utilizar **kebab-case**
    - components, contexts
- Pastas de funcionalidades (create-expense, update-expenses) - Utilizar **kebab-case**
- pastas tecnicas e de dominio em minusculo ou `kebab-case`
- agrupadores de componente tambem em `kebab-case`
- evitar misturar `PascalCase` com o restante da base

Exemplos:

- `auth`
- `auth-store`
- `theme-mode-toggle`
- `chart-area-interactive`


## Estilos de código

- Padrão standard - [**JavaScript Standard Style**](http://standardjs.com/)
    - Possui fácil configuração, comunidade, bastante utilizado
- Sem **ponto e vírgula**
- Sem **trailing comma** (virgula a mais) no final de objetos ou arrays
- Sem **parênteses** ao abrir uma **arrow function** caso tenha apenas 1 parâmetro
- Indentação com **2 espaços** e não tabs
- Largura máxima da linha: **80 caracteres**
- Final da linha: **LF**
- Fechamento de tag na linha debaixo
  
## Estrutura de pastas

Arvore resumida:

```text
src
├── app
│   ├── api
│   ├── cache
│   ├── config
│   ├── middlewares
│   ├── modules
│   │   ├── auth
│   │   └── global
│   ├── providers
│   ├── router
│   └── store
├── resources
│   ├── components
│   │   ├── base
│   │   └── ui
│   ├── pages
│   │   ├── auth
│   │   └── home
│   └── main.tsx
└── shared
    ├── constants
    ├── enums
    ├── hooks
    ├── lib
    ├── styles
    ├── types
    └── utils
```

A versao mais detalhada da arvore atual esta em
`docs/folder-pattern.txt`.

## Pattern por camada

### `src/app`

Camada responsavel por detalhes tecnicos e fluxo de aplicacao.

- `api/`: cliente HTTP e configuracoes de acesso externo
- `cache/`: wrappers de React Query para mutacoes e queries
- `config/`: leitura e normalizacao de ambiente
- `middlewares/`: protecao de rotas e regras transversais
- `providers/`: providers globais
- `router/`: definicao central de rotas
- `store/`: estado cliente com Zustand
- `modules/`: organizacao por dominio de negocio

Padrao atual para um modulo em `src/app/modules/<feature>`:

```text
<feature>/
├── hooks/
├── keys/
├── service/
├── types/
└── use-cases/
```

Convencoes observadas:

- `keys/`: chaves de cache e identificadores do dominio
- `service/`: comunicacao com API e regras de integracao
- `types/`: contratos e tipos do dominio
- `use-cases/`: hooks orientados a acao, como `use-login.use-case.ts`
- `hooks/`: hooks menores e mais especificos do modulo, como sessao

Para novos modulos, o projeto ja possui gerador:

```bash
pnpm g module <nome-do-modulo>
```

### `src/resources`

Camada visual da aplicacao.

- `components/ui/`: componentes base e primitives reutilizaveis
- `components/base/`: componentes compostos usados pela aplicacao
- `pages/`: paginas e fluxos visuais
- `main.tsx`: bootstrap da interface

Padrao observado em paginas:

```text
pages/
└── auth/
    ├── auth.page.tsx
    ├── use-auth.page.ts
    ├── components/
    │   ├── auth-branding.component.tsx
    │   └── authenticated-login-view/
    │       ├── authenticated-login-view.component.tsx
    │       └── use-authenticated-login-view.component.ts
    └── views/
        ├── login/
        │   ├── login.view.tsx
        │   ├── login-schema.ts
        │   └── use-login.ts
        └── register/
            └── register.view.tsx
```

Leitura pratica desse desenho:

- a pagina (`*.page.tsx`) monta o fluxo principal
- se a pagina tiver logica propria, ela pode ter um hook como
  `use-auth.page.ts`
- `views/` concentra variacoes ou etapas de tela
- `components/` guarda pecas visuais locais daquela pagina
- componentes altamente reutilizaveis sobem para `components/base` ou
  `components/ui`

Regra para componentes locais dentro de `pages`:

- se o componente nao tiver logica propria, ele pode existir como arquivo
  direto, por exemplo `teste.component.tsx`
- se o componente tiver logica propria, criar uma pasta para agrupar o
  componente e seu hook

Exemplo:

```text
components/
├── simples-status.component.tsx
└── teste/
    ├── teste.component.tsx
    └── use-teste.component.ts
```

### `src/shared`

Camada de reutilizacao global, sem acoplamento a uma pagina especifica.

- `constants/`: constantes globais, como rotas
- `enums/`: enumeracoes compartilhadas
- `hooks/`: hooks genericos
- `lib/`: helpers pequenos e utilitarios de base
- `styles/`: CSS global
- `types/`: tipagens compartilhadas
- `utils/`: utilitarios mais especificos, como tratamento de erro HTTP


Exemplos reais do projeto:

- `auth.page.tsx`
- `login.view.tsx`
- `theme-mode-toggle.component.tsx`
- `use-login.use-case.ts`
- `auth.service.ts`
- `router.constants.ts`
- `axios-error-handler.util.ts`


## Imports e dependencias entre camadas

O projeto usa alias absoluto:

```ts
@/*
```

Na pratica:

- `resources` pode consumir `app` e `shared`
- `app` pode consumir `shared`
- `shared` deve permanecer o mais neutro possivel
- componentes de `ui` nao devem carregar regra de negocio
- regras de negocio devem ficar em `app/modules`


## Recomendacoes para novas features

Ao criar novas partes do sistema, seguir esta linha:

1. Criar ou expandir o dominio em `src/app/modules/<feature>`
2. Expor a regra por `service`, `types`, `keys` e `use-cases`
3. Montar a interface em `src/resources/pages/<feature>`
4. Se tiver componente realicionado a página  `src/resources/pages/<feature>/components`
5. Subir componentes reutilizaveis para `resources/components/base`
6. Manter utilitarios realmente genericos em `src/shared`

### Declaração de funções

No fim não há tanta diferença entre declarar uma função utilizando o `function` ou `const`, porém em pesquisas feitas, geralmente o pessoal gosta de utilizar bastante `function` pelos seguintes motivos:

- Fácil leitura do código para identificar de que é uma função e não uma variável ao contrário de const
- Ao debugar ou estourar um erro, o nome da função aparece na stack trace
- Não é necessário declarar a função no topo do código antes de usá-la
- Entre outros motivos mais específicos

Então vamos utilizar a `function` para a declaração de funções. Utilizaremos `arrow function` normalmente em parâmetros de callback ou para definir uma função em um objeto.

Utilizar declaração com `const` dentro de callbacks ou arrow functions.

```jsx
Correto ✅

function handleButtonClick() { ... }

users.map(el => el.id = id)
users.map(el => {
	...
})

setTimeout(() => {
	...
}, 1000)

useEffect(() => {
	const load = () => { ... }
	load()
}, [])

Errado ❌

const handleButtonClick = () => { ... }

setTimeout(function() {
	...
}, 1000)

useEffect(() => {
	function load() { ... }
	load()
}, [])

```

### Comentários

Quando um código é complexo é bom comentar o que está sendo feito para facilitar a leitura e o entendimento.

Caso o código siga uma ordem e lendo ele faz sentido em inglês, não é necessário adicionar comentários. Com o Clean Code os nomes dos métodos e variáveis mais descritivos, facilita a leitura do código não sendo necessário o comentário.

Em funções é necessário colocar um resumo do que a função faz e algum exemplo de uso dela e retorno, assim facilita o entendimento e não precisamos ler o código inteiro para entender a função. Necessário também colocar nos comentários os parâmetros da função.

```jsx
/**
 * Realiza a soma de 2 números
 * 
 */
function sum(a: number, b: number): number {
  return a + b;
}
```

## Boas práticas

- Evitar repetições
- Principio de código limpo
- Analisar possibilidade do Redux
- Renderização Extra (React Dev  Tools)
- Altualização dos pacotes para versão LTS a cada semestre

## Resumo rapido

- `app` = comportamento e integracao
- `resources` = interface
- `shared` = reuso global
- nomes em `kebab-case` com sufixos claros
- novas regras de negocio entram em `modules`
- novas telas entram em `pages`
