# Project: modular-payments-console

Base arquitetural de uma plataforma enterprise de microfrontends com `Nx`, `React`, `TypeScript`, `Rspack` e `Module Federation`.

## Objetivo arquitetural

Este repositório representa a base de uma arquitetura enterprise orientada a microfrontends, preparada para evolução incremental de domínios, times e capacidades compartilhadas.

O objetivo do projeto é demonstrar, de forma clara e operacional, como o `shell` hospeda e compõe múltiplos `remotes`, como as libs compartilhadas entram na arquitetura e como a estrutura se organiza para escalar com segurança.

## O que é o shell

O app `shell` é o host principal da solução.

Ele é responsável por:

- centralizar o roteamento externo
- carregar os remotes em runtime via Module Federation
- servir como ponto inicial para composição de layout, auth, estado global e integração futura

## O que são os remotes

Os apps `billing`, `wallet` e `analytics` são remotes.

Cada remote:

- expõe apenas `./Routes`
- possui uma página placeholder mínima
- pode ser servido isoladamente para desenvolvimento local
- é consumido pelo `shell` quando acessamos `/billing`, `/wallet` e `/analytics`

## Como a arquitetura funciona

O `shell` centraliza o entrypoint da aplicação e carrega os remotes em runtime via Module Federation.

Na prática:

- `shell` resolve navegação e composição externa
- `billing`, `wallet` e `analytics` publicam módulos federados simples
- `libs/` concentram contratos, configuração e peças reutilizáveis para evitar duplicação e acoplamento desnecessário

## Estrutura do projeto

```text
apps/
  shell/
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
```

## Como rodar

```sh
pnpm install
pnpm nx serve shell
```

Atalhos úteis:

```sh
pnpm dev
pnpm build
pnpm test
pnpm lint
pnpm graph
pnpm affected:build
```

Rotas para validar os remotes:

- `http://localhost:4200/`
- `http://localhost:4200/billing`
- `http://localhost:4200/wallet`
- `http://localhost:4200/analytics`

## Como adicionar um novo remote

Use o generator abaixo como ponto de partida:

```sh
pnpm nx g @nx/react:remote apps/reports \
  --host=shell \
  --bundler=rspack \
  --dynamic=false \
  --unitTestRunner=jest \
  --e2eTestRunner=none \
  --globalCss=true \
  --style=css \
  --devServerPort=4204
```

Depois disso:

1. troque o conteúdo gerado por um placeholder mínimo
2. exponha somente `./Routes`
3. atualize `libs/config` com metadados e rota do novo remote
4. só então evolua padrões internos desse domínio

## Como funcionam as libs compartilhadas

- `ui`: componente simples `Card` para placeholders e composição inicial
- `auth`: tipos e provider/hook stubados, sem autenticação real
- `contracts`: tipos base para rotas, remotes e contratos futuros
- `event-bus`: pub/sub mínimo e tipado para comunicação futura
- `api-client`: estrutura inicial de cliente HTTP baseada em `fetch`
- `config`: constantes e metadados compartilhados entre shell e remotes

Nesta fase, as libs existem para reduzir acoplamento futuro, não para impor padrões finais.
