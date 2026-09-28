# Storybook Integration Guide

## Overview

SkyCompare utilizes Storybook 10 alongside `@storybook/angular` for isolated component development, visual testing, and interactive documentation.

## Configuration Architecture

The Storybook configuration resides in `.storybook/`:
* `main.ts`: Defines story lookup paths (`src/**/*.stories.ts`), framework options, and addon registrations.
* `preview.ts`: Configures global decorators, viewports, theme parameters, and documentation controls.
* `tsconfig.json`: Extends the project root TypeScript configuration for story compilation.

## Story Structure

Stories adhere to the Component Story Format 3 (CSF3). Example story definition:

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonAtom } from './button.atom';

const meta: Meta<ButtonAtom> = {
  title: 'Atoms/Button',
  component: ButtonAtom,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost', 'outline'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<ButtonAtom>;

export const Primary: Story = {
  args: {
    label: 'Search Flights',
    variant: 'primary',
  },
};
```

## Running Storybook

To start the interactive Storybook development server on port 6006:

```bash
npm run storybook
```

To compile a static Storybook build for deployment:

```bash
npm run build-storybook
```

The output bundle is generated in `storybook-static/`.

## Key Integration Notes

1. Standalone Components: Angular standalone components are imported directly into the `component` field of the default export without requiring module wrappers.
2. Story Exclusions: Production application builds ignore `src/**/*.stories.ts` through `tsconfig.app.json` exclusion rules to keep bundle sizes optimized.
3. Test Imports: Storybook interaction tests and assertions import directly from `storybook/test`.
