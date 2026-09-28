# SkyCompare Design System

SkyCompare is a flight comparison platform and enterprise design system built with Angular 21, TypeScript, and Storybook 10. The project follows Atomic Design principles to provide a reusable component library and responsive user interface.

## Tech Stack

* Angular 21.0.5
* Storybook 10.1.11
* TypeScript 5.9.2
* SCSS with custom design tokens
* Vitest and Compodoc

## Architecture

The project is organized according to Atomic Design methodology:

* `atoms`: Fundamental UI primitives (buttons, inputs, icons, badges, spinners).
* `molecules`: Combinations of atoms performing dedicated UI tasks (cards, date pickers, price tags).
* `organisms`: Complex functional modules (charts, tables, search forms, flight cards).
* `templates`: Page layout structures and responsive grid wrappers.
* `pages`: Routed views integrating layout templates with data services.

## Getting Started

### Prerequisites

* Node.js version 20 or higher
* npm version 10 or higher

### Installation

```bash
npm install
```

### Running the Application

To start the Angular application development server:

```bash
npm start
```

Navigate to `http://localhost:4200/` in a web browser.

### Running Storybook

To start the isolated Storybook environment:

```bash
npm run storybook
```

Navigate to `http://localhost:6006/` in a web browser.

### Building for Production

To compile the production application:

```bash
npm run build
```

To compile static Storybook documentation:

```bash
npm run build-storybook
```

## Documentation

Comprehensive documentation is available in the `docs/` directory:

* [Architecture Documentation](file:///Users/dev/Desktop/projects/storybook/docs/architecture.md)
* [Component Catalog](file:///Users/dev/Desktop/projects/storybook/docs/components.md)
* [Storybook Integration Guide](file:///Users/dev/Desktop/projects/storybook/docs/storybook-guide.md)
* [Deployment Guide](file:///Users/dev/Desktop/projects/storybook/docs/deployment.md)

## License

MIT
