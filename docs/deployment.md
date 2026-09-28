# Deployment and Environment Configuration

## Overview

SkyCompare supports static Single Page Application (SPA) builds and containerized hosting environments.

## Environments

Environment definitions are located in `src/environments/`:
* `environment.ts`: Development configuration with local mock data generators.
* `environment.staging.ts`: Staging configuration pointing to integration services.
* `environment.prod.ts`: Production configuration with production endpoints and optimizations.

## Build Commands

### Standard Application Build
To produce an optimized production build:

```bash
npm run build
```

Compiled assets are placed in `dist/design-system/`.

### Development Server
To launch the Angular development server on port 4200:

```bash
npm start
```

### Static Storybook Build
To generate the static design system portal:

```bash
npm run build-storybook
```

Output is saved to `storybook-static/`.

## Quality Verification

Before committing changes, execute the following commands to confirm stability:

```bash
npm run build
npm run build-storybook
```
