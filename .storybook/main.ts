import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../src/app/design-system/**/*.mdx',
    '../src/app/design-system/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
  ],
  framework: '@storybook/angular',
  docs: {
    autodocs: 'tag',
  },
};
export default config;