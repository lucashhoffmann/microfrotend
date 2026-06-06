# modular-payments-console

Estrutura enterprise de microfrontends com `Nx`, `React`, `TypeScript`, `Rspack`, `Module Federation`, `React Query`, `Zustand` e `shadcn/ui`.

O repositório demonstra como um `shell` hospeda múltiplos `remotes`, aplica layout e providers compartilhados, mantém fronteiras claras entre estado global e estado local e organiza a evolução de domínios independentes.

## Arquitetura

### Shell

O app `shell` é o host principal da plataforma.

Ele é responsável por:

- compor os remotes em runtime via Module Federation
- aplicar os providers compartilhados de tema, auth e server state
- separar o fluxo público (`/auth/*`) do fluxo privado (`/billing/*`, `/wallet/*`, `/analytics/*`)
- renderizar a navegação principal com sidebar e header compartilhados

### Remotes

Os remotes atuais são:

- `auth`: fluxo público de `login` e `register`
- `billing`: placeholder navegável do domínio de cobrança
- `wallet`: placeholder navegável do domínio de carteira
- `analytics`: placeholder navegável do domínio de analytics

Cada remote expõe apenas `./Routes` e pode rodar isoladamente durante o desenvolvimento.

## Organização

```text
apps/
  shell/
  auth/
  billing/
  wallet/
  analytics/

libs/
  ui/
  auth/
  contracts/
  event-bus/
  api-client/
  config/

tools/
  mock-api/
```

Todos os apps seguem a separação:

- `src/app`: providers, router, módulos e use-cases
- `src/resources`: páginas, layouts e componentes visuais
- `src/shared`: espaço reservado para utilitários específicos do app quando o domínio crescer

## Libs compartilhadas

- `ui`: base compartilhada de UI com `shadcn/ui`, tema, toggle, sidebar primitives e utilitários
- `auth`: store global de sessão com Zustand, schemas Zod e helpers de hidratação/logout
- `contracts`: tipos públicos para auth, navegação, dashboards e eventos futuros
- `event-bus`: pub/sub mínimo e tipado para comunicação cross-remote quando necessário
- `api-client`: cliente HTTP tipado com suporte a token mock
- `config`: rotas, metadados dos remotes, constantes globais e URL da mock API

## Estado compartilhado x estado local

### Compartilhado no shell

- sessão autenticada
- bootstrap de auth
- tema
- cache de queries
- estado estrutural da navegação do shell

### Interno de cada remote

- filtros locais
- navegação interna do domínio
- formulários específicos da tela
- seleção temporária e interação local

Essa separação evita transformar o shell em um store central de regras de negócio.

## Como rodar

Instalação:

```sh
pnpm install
```

Fluxo principal do frontend:

```sh
pnpm dev
```

Frontend + mock API:

```sh
pnpm dev --mock
```

Isso sobe:

- shell em `http://localhost:4200`

Com `--mock`, também sobe:

- mock API em `http://localhost:3333/api`

Também é possível iniciar só o host:

```sh
pnpm nx serve shell
```

Se quiser o fluxo autenticado local com dados mockados, rode o mock API em paralelo:

```sh
pnpm mock:api
```

## Credenciais demo

```text
email: demo@modular-payments.local
password: Password123!
```

## Rotas para validar

- `http://localhost:4200/auth/login`
- `http://localhost:4200/auth/register`
- `http://localhost:4200/billing/overview`
- `http://localhost:4200/wallet/overview`
- `http://localhost:4200/analytics/overview`

## Rodando remotes isoladamente

```sh
pnpm nx serve auth
pnpm nx serve billing
pnpm nx serve wallet
pnpm nx serve analytics
```

Cada app mantém seu modo standalone para desenvolvimento local do respectivo domínio.

## Scripts úteis

```sh
pnpm dev
pnpm dev --mock
pnpm mock:api
pnpm build
pnpm test
pnpm lint
pnpm graph
pnpm affected:build
```

## Mock API

O mock backend fica em `tools/mock-api/` e expõe:

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/me`
- `GET /api/billing/dashboard`
- `GET /api/wallet/dashboard`
- `GET /api/analytics/dashboard`

O objetivo é demonstrar o fluxo completo de autenticação e carregamento dos remotes sem depender de backend real.

## Como adicionar um novo remote

Use o generator do Nx apontando para o host `shell`:

```sh
pnpm nx g @nx/react:remote apps/reports \
  --host=shell \
  --bundler=rspack \
  --dynamic=false \
  --unitTestRunner=jest \
  --e2eTestRunner=none \
  --globalCss=true \
  --style=css
```

Depois disso:

1. exponha somente `./Routes`
2. organize o app em `app/resources/shared`
3. adicione o metadata do remote em `libs/config`
4. defina o que será compartilhado com o shell e o que permanece interno ao domínio

## Validação do workspace

Comandos úteis para validar a base:

```sh
pnpm nx run-many -t lint
CI=1 pnpm nx run-many -t test
CI=1 pnpm nx run-many -t build --projects=shell,auth,billing,wallet,analytics
pnpm nx graph
```
