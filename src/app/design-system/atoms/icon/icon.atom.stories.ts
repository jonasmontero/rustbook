import type { Meta, StoryObj } from '@storybook/angular';
import { IconAtom } from './icon.atom';

const meta: Meta<IconAtom> = {
  title: 'Design System/Atoms/Icon',
  component: IconAtom,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'plane',
        'calendar',
        'search',
        'arrow-right',
        'arrow-left',
        'chevron-down',
        'check',
        'x',
        'star',
        'heart',
        'info',
        'warning',
        'user',
        'menu',
        'filter',
      ],
      description: 'Icon name do registry',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamanho do ícone (sm=16px, md=20px, lg=24px, xl=32px)',
    },
    color: {
      control: 'color',
      description: 'Cor customizada (usa currentColor se não especificado)',
    },
  },
  args: {
    name: 'search',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<IconAtom>;

/**
 * Ícone padrão com tamanho médio
 */
export const Default: Story = {
  args: {
    name: 'search',
    size: 'md',
  },
};

/**
 * Tamanho pequeno (16px)
 */
export const Small: Story = {
  args: {
    name: 'search',
    size: 'sm',
  },
};

/**
 * Tamanho grande (24px)
 */
export const Large: Story = {
  args: {
    name: 'search',
    size: 'lg',
  },
};

/**
 * Tamanho extra grande (32px)
 */
export const ExtraLarge: Story = {
  args: {
    name: 'search',
    size: 'xl',
  },
};

/**
 * Ícone com cor customizada
 */
export const WithCustomColor: Story = {
  args: {
    name: 'heart',
    size: 'lg',
    color: '#E31837',
  },
};

/**
 * Showcase de todos os ícones disponíveis
 */
export const AllIcons: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 24px; padding: 24px;">
        <div style="text-align: center;">
          <atom-icon name="plane" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">plane</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="calendar" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">calendar</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="search" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">search</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="arrow-right" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">arrow-right</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="arrow-left" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">arrow-left</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="chevron-down" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">chevron-down</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="check" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">check</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="x" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">x</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="star" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">star</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="heart" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">heart</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="info" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">info</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="warning" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">warning</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="user" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">user</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="menu" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">menu</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="filter" size="lg" />
          <p style="margin-top: 8px; font-size: 12px;">filter</p>
        </div>
      </div>
    `,
  }),
};

/**
 * Ícones coloridos por companhia aérea
 */
export const AirlineColors: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 32px; align-items: center; padding: 24px;">
        <div style="text-align: center;">
          <atom-icon name="plane" size="xl" color="#0033A0" />
          <p style="margin-top: 8px; font-size: 14px; color: #0033A0; font-weight: 600;">Azul</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="plane" size="xl" color="#FF6600" />
          <p style="margin-top: 8px; font-size: 14px; color: #FF6600; font-weight: 600;">Gol</p>
        </div>
        <div style="text-align: center;">
          <atom-icon name="plane" size="xl" color="#E31837" />
          <p style="margin-top: 8px; font-size: 14px; color: #E31837; font-weight: 600;">Latam</p>
        </div>
      </div>
    `,
  }),
};
