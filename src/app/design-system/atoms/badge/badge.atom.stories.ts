import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeAtom } from './badge.atom';

const meta: Meta<BadgeAtom> = {
  title: 'Design System/Atoms/Badge',
  component: BadgeAtom,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Texto do badge',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'azul', 'gol', 'latam'],
      description: 'Variante de cor',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Tamanho do badge',
    },
  },
};

export default meta;
type Story = StoryObj<BadgeAtom>;

/**
 * Badge padrão
 */
export const Default: Story = {
  args: {
    text: 'Default',
    variant: 'default',
  },
};

/**
 * Badge primário
 */
export const Primary: Story = {
  args: {
    text: 'Primary',
    variant: 'primary',
  },
};

/**
 * Badge de sucesso
 */
export const Success: Story = {
  args: {
    text: 'Menor Preço',
    variant: 'success',
  },
};

/**
 * Badge de aviso
 */
export const Warning: Story = {
  args: {
    text: 'Últimas vagas',
    variant: 'warning',
  },
};

/**
 * Badge de perigo
 */
export const Danger: Story = {
  args: {
    text: 'Esgotado',
    variant: 'danger',
  },
};

/**
 * Badge Azul (companhia aérea)
 */
export const Azul: Story = {
  args: {
    text: 'Azul',
    variant: 'azul',
  },
};

/**
 * Badge Gol (companhia aérea)
 */
export const Gol: Story = {
  args: {
    text: 'Gol',
    variant: 'gol',
  },
};

/**
 * Badge Latam (companhia aérea)
 */
export const Latam: Story = {
  args: {
    text: 'Latam',
    variant: 'latam',
  },
};

/**
 * Badge pequeno
 */
export const Small: Story = {
  args: {
    text: 'Small',
    variant: 'primary',
    size: 'sm',
  },
};

/**
 * Badge médio
 */
export const Medium: Story = {
  args: {
    text: 'Medium',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Todas as variantes
 */
export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; padding: 16px;">
        <atom-badge text="Default" variant="default" />
        <atom-badge text="Primary" variant="primary" />
        <atom-badge text="Success" variant="success" />
        <atom-badge text="Warning" variant="warning" />
        <atom-badge text="Danger" variant="danger" />
        <atom-badge text="Azul" variant="azul" />
        <atom-badge text="Gol" variant="gol" />
        <atom-badge text="Latam" variant="latam" />
      </div>
    `,
  }),
};

/**
 * Todos os tamanhos
 */
export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; align-items: center; gap: 16px; padding: 16px;">
        <atom-badge text="Small Badge" variant="primary" size="sm" />
        <atom-badge text="Medium Badge" variant="primary" size="md" />
      </div>
    `,
  }),
};

/**
 * Badges de companhias aéreas
 */
export const Airlines: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 24px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>Voo operado por:</span>
          <atom-badge text="Azul" variant="azul" />
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>Voo operado por:</span>
          <atom-badge text="Gol" variant="gol" />
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>Voo operado por:</span>
          <atom-badge text="Latam" variant="latam" />
        </div>
      </div>
    `,
  }),
};

/**
 * Badges de status de preço
 */
export const PriceStatus: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 24px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 24px; font-weight: 600;">R$ 450,00</span>
          <atom-badge text="Menor Preço" variant="success" size="sm" />
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 24px; font-weight: 600;">R$ 580,00</span>
          <atom-badge text="Últimas vagas" variant="warning" size="sm" />
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 24px; font-weight: 600;">R$ 720,00</span>
          <atom-badge text="Esgotado" variant="danger" size="sm" />
        </div>
      </div>
    `,
  }),
};
