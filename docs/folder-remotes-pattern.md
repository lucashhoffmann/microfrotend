src
├── app
│   ├── api
│   │   └── api.ts
│   ├── cache
│   │   ├── use-mutation-cache.ts
│   │   └── use-query-cache.ts
│   ├── config
│   │   └── env.config.ts
│   ├── middlewares
│   │   └── auth.middleware.tsx
│   ├── modules
│   │   ├── auth
│   │   │   ├── hooks
│   │   │   ├── keys
│   │   │   ├── service
│   │   │   ├── types
│   │   │   └── use-cases
│   │   └── global
│   │       ├── keys
│   │       ├── service
│   │       ├── types
│   │       └── use-cases
│   ├── providers
│   │   └── theme-provider.tsx
│   ├── router
│   │   └── router.tsx
│   └── store
│       ├── auth-store
│       │   ├── auth-store.types.ts
│       │   └── use-auth-store.ts
│       └── index.ts
├── resources
│   ├── components
│   │   ├── base
│   │   │   ├── app-sidebar
│   │   │   ├── chart-area-interactive
│   │   │   ├── data-table
│   │   │   ├── layout-default
│   │   │   ├── nav-main
│   │   │   ├── nav-user
│   │   │   ├── section-cards
│   │   │   ├── site-header
│   │   │   ├── theme-mode-toggle
│   │   │   └── index.ts
│   │   └── ui
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button-group.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── combobox.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── direction.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── empty.tsx
│   │       ├── field.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-group.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── item.tsx
│   │       ├── kbd.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── native-select.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── password-input.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── spinner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle-variants.ts
│   │       ├── toggle.tsx
│   │       └── tooltip.tsx
│   ├── pages
│   │   ├── auth
│   │   │   ├── auth.page.tsx
│   │   │   ├── use-auth.page.ts
│   │   │   ├── components
│   │   │   │   ├── auth-branding.component.tsx
│   │   │   │   └── authenticated-login-view
│   │   │   │       ├── authenticated-login-view.component.tsx
│   │   │   │       └── use-authenticated-login-view.component.ts
│   │   │   └── views
│   │   ├── home
│   │   │   └── home.page.tsx
│   │   ├── app.tsx
│   │   └── index.ts
│   └── main.tsx
└── shared
    ├── constants
    │   └── router.constants.ts
    ├── enums
    │   └── enum.ts
    ├── hooks
    │   └── use-mobile.ts
    ├── lib
    │   └── utils.ts
    ├── styles
    │   └── index.css
    ├── types
    │   ├── auth.types.ts
    │   ├── cache.types.ts
    │   ├── config.types.ts
    │   ├── global.types.ts
    │   └── response.types.ts
    └── utils
        └── axios-error-handler.util.ts

public
├── fintech-dashboard.png
└── vite.svg

scripts
└── generate-module.js

package.json
tsconfig.json
vite.config.ts
eslint.config.js
components.json

Regra para componentes locais dentro de pages:

- Sem logica propria: arquivo direto
  - `teste.component.tsx`
- Com logica propria: criar pasta do componente
  - `teste/`
    - `teste.component.tsx`
    - `use-teste.component.ts`
