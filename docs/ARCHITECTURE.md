# Architecture Overview

This monorepo contains a Next.js frontend and an Express/MongoDB backend.

## Structure (proposed target)

- docs/ — central documentation
- scripts/ — helper scripts
- backend/
  - src/
    - config/ — db, env loader
    - api/
      - routes/ — Express route definitions
      - controllers/ — request handlers
    - core/
      - services/ — business logic
      - repositories/ — DB access
      - models/ — Mongoose models
    - middleware/ — Express middlewares
    - utils/ — helpers (logger/response)
    - app.js — creates Express app
    - index.js — boots server
- frontend/
  - app/ — Next.js app router
  - components/ — UI components
  - api/ — HTTP client wrappers
  - lib/ — non-HTTP utilities
  - constants/ — URLs and constants
  - hooks/ — React hooks
  - public/ — static assets

## Conventions

- Naming:
  - routes: *.routes.js
  - controllers: *.controller.js
  - services: *.service.js
  - repositories: *.repository.js
- Import aliases:
  - Frontend: @api, @lib, @components, @hooks, @constants
  - Backend: @api, @core, @config, @middleware, @utils (future)
- Environment:
  - Central env loader (backend/src/config/env.js)
  - Frontend uses NEXT_PUBLIC_* variables

## Migration Strategy

- Non-breaking: centralize docs, add aliases, add API client and constants
- Incremental: introduce backend src/ split (app.js + index.js) and update imports

See also:
- docs/FRONTEND_API_CONFIG.md
- docs/BACKEND_DEPLOYMENT.md
- docs/BACKEND_IMPROVEMENTS.md
