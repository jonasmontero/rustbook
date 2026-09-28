import type { Meta, StoryObj } from '@storybook/angular';
import { SpinnerAtom } from './spinner.atom';

const meta: Meta<SpinnerAtom> = {
  title: 'Design System/Atoms/Spinner',
  component: SpinnerAtom,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Spinner size',
    },
    color: {
      control: 'color',
      description: 'Cor customizada',
    },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<SpinnerAtom>;

/**
 * Default spinner (medium)
 */
export const Default: Story = {
  args: {
    size: 'md',
  },
};

/**
 * Small spinner (16px)
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

/**
 * Large spinner (32px)
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

/**
 * Spinner com cor customizada
 */
export const WithCustomColor: Story = {
  args: {
    size: 'lg',
    color: '#2563EB',
  },
};

/**
 * Spinners coloridos por companhia aérea
 */
export const AirlineColors: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 32px; align-items: center; padding: 24px;">
        <div style="text-align: center;">
          <atom-spinner size="lg" color="#0033A0" />
          <p style="margin-top: 12px; font-size: 14px; color: #0033A0; font-weight: 600;">Azul</p>
        </div>
        <div style="text-align: center;">
          <atom-spinner size="lg" color="#FF6600" />
          <p style="margin-top: 12px; font-size: 14px; color: #FF6600; font-weight: 600;">Gol</p>
        </div>
        <div style="text-align: center;">
          <atom-spinner size="lg" color="#E31837" />
          <p style="margin-top: 12px; font-size: 14px; color: #E31837; font-weight: 600;">Latam</p>
        </div>
      </div>
    `,
  }),
};

/**
 * Comparação de todos os tamanhos
 */
export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 32px; align-items: center; padding: 24px;">
        <div style="text-align: center;">
          <atom-spinner size="sm" />
          <p style="margin-top: 12px; font-size: 12px; color: var(--text-secondary);">Small (16px)</p>
        </div>
        <div style="text-align: center;">
          <atom-spinner size="md" />
          <p style="margin-top: 12px; font-size: 12px; color: var(--text-secondary);">Medium (20px)</p>
        </div>
        <div style="text-align: center;">
          <atom-spinner size="lg" />
          <p style="margin-top: 12px; font-size: 12px; color: var(--text-secondary);">Large (32px)</p>
        </div>
      </div>
    `,
  }),
};

/**
 * Spinner em contextos diferentes
 */
export const InContext: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px;">
        <!-- Em botão -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <atom-spinner size="sm" />
          <span>Carregando...</span>
        </div>

        <!-- Centro da página -->
        <div style="display: flex; justify-content: center; align-items: center; height: 200px; background: var(--bg-secondary); border-radius: var(--radius-md);">
          <atom-spinner size="lg" />
        </div>

        <!-- Com texto ao lado -->
        <div style="display: flex; align-items: center; gap: 12px;">
          <atom-spinner size="md" color="#2563EB" />
          <div>
            <p style="font-weight: 600; margin: 0;">Buscando voos...</p>
            <p style="font-size: 14px; color: var(--text-secondary); margin: 0;">Isso pode levar alguns segundos</p>
          </div>
        </div>
      </div>
    `,
  }),
};
