import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { ButtonAtom } from './button.atom';

const meta: Meta<ButtonAtom> = {
  title: 'Design System/Atoms/Button',
  component: ButtonAtom,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto do botão',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Variante visual',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do botão',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de loading',
    },
    icon: {
      control: 'select',
      options: ['search', 'plane', 'calendar', 'arrow-right', 'check', 'x'],
      description: 'Ícone (opcional)',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Posição do ícone',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Botão ocupa 100% da largura',
    },
  },
  args: {
    clicked: fn(),
  },
};

export default meta;
type Story = StoryObj<ButtonAtom>;

/**
 * Botão primário padrão
 */
export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
  },
};

/**
 * Botão secundário
 */
export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
  },
};

/**
 * Botão outline (borda)
 */
export const Outline: Story = {
  args: {
    label: 'Outline Button',
    variant: 'outline',
  },
};

/**
 * Botão ghost (transparente)
 */
export const Ghost: Story = {
  args: {
    label: 'Ghost Button',
    variant: 'ghost',
  },
};

/**
 * Botão de ação destrutiva
 */
export const Danger: Story = {
  args: {
    label: 'Delete',
    variant: 'danger',
  },
};

/**
 * Botão com ícone à esquerda
 */
export const WithIconLeft: Story = {
  args: {
    label: 'Buscar Voos',
    variant: 'primary',
    icon: 'search',
    iconPosition: 'left',
  },
};

/**
 * Botão com ícone à direita
 */
export const WithIconRight: Story = {
  args: {
    label: 'Próximo',
    variant: 'primary',
    icon: 'arrow-right',
    iconPosition: 'right',
  },
};

/**
 * Botão em estado de loading
 */
export const Loading: Story = {
  args: {
    label: 'Carregando',
    variant: 'primary',
    loading: true,
  },
};

/**
 * Botão desabilitado
 */
export const Disabled: Story = {
  args: {
    label: 'Desabilitado',
    variant: 'primary',
    disabled: true,
  },
};

/**
 * Botão pequeno
 */
export const Small: Story = {
  args: {
    label: 'Small Button',
    variant: 'primary',
    size: 'sm',
  },
};

/**
 * Botão grande
 */
export const Large: Story = {
  args: {
    label: 'Large Button',
    variant: 'primary',
    size: 'lg',
  },
};

/**
 * Botão com largura total
 */
export const FullWidth: Story = {
  args: {
    label: 'Full Width Button',
    variant: 'primary',
    fullWidth: true,
  },
};

/**
 * Todas as variantes lado a lado
 */
export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; padding: 16px;">
        <atom-button label="Primary" variant="primary" />
        <atom-button label="Secondary" variant="secondary" />
        <atom-button label="Outline" variant="outline" />
        <atom-button label="Ghost" variant="ghost" />
        <atom-button label="Danger" variant="danger" />
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
        <atom-button label="Small" variant="primary" size="sm" />
        <atom-button label="Medium" variant="primary" size="md" />
        <atom-button label="Large" variant="primary" size="lg" />
      </div>
    `,
  }),
};

/**
 * Botões com ícones de ação
 */
export const WithIcons: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
        <atom-button label="Buscar Voos" variant="primary" icon="search" />
        <atom-button label="Reservar" variant="primary" icon="check" />
        <atom-button label="Cancelar" variant="outline" icon="x" />
        <atom-button label="Ver Detalhes" variant="ghost" icon="arrow-right" iconPosition="right" />
      </div>
    `,
  }),
};

/**
 * Estados de loading por variante
 */
export const LoadingStates: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px;">
        <atom-button label="Buscando..." variant="primary" [loading]="true" />
        <atom-button label="Salvando..." variant="secondary" [loading]="true" />
        <atom-button label="Processando..." variant="outline" [loading]="true" />
      </div>
    `,
  }),
};

/**
 * Botões para ações de companhias aéreas
 */
export const AirlineActions: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 24px;">
        <atom-button
          label="Buscar Voos Azul"
          variant="primary"
          icon="plane"
          style="background-color: #0033A0;"
        />
        <atom-button
          label="Buscar Voos Gol"
          variant="primary"
          icon="plane"
          style="background-color: #FF6600;"
        />
        <atom-button
          label="Buscar Voos Latam"
          variant="primary"
          icon="plane"
          style="background-color: #E31837;"
        />
      </div>
    `,
  }),
};
