import type { Meta, StoryObj } from '@storybook/angular';
import { AnalyticsPageComponent } from './analytics-page.component';

const meta: Meta<AnalyticsPageComponent> = {
  title: 'Design System/Pages/AnalyticsPage',
  component: AnalyticsPageComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<AnalyticsPageComponent>;

/**
 * Página completa de analytics com 5 gráficos
 */
export const Default: Story = {
  args: {},
};

/**
 * Versão mobile (use viewport controls do Storybook)
 */
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Versão tablet
 */
export const Tablet: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

/**
 * Versão desktop large
 */
export const DesktopLarge: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
