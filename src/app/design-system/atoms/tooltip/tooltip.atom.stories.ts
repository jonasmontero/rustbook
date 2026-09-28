import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipAtom } from './tooltip.atom';

const meta: Meta<TooltipAtom> = {
  title: 'Design System/Atoms/Tooltip',
  component: TooltipAtom,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Texto do tooltip',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Posição do tooltip',
    },
    delay: {
      control: 'number',
      description: 'Delay para aparecer (ms)',
    },
  },
};

export default meta;
type Story = StoryObj<TooltipAtom>;

/**
 * ooltip no topo
 */
export const Top: Story = {
  args: {
    text: 'Informação adicional',
    position: 'top',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 80px; text-align: center;">
        <atom-tooltip [text]="text" position="top">
          <button style="padding: 8px 16px; cursor: pointer;">Hover me (Top)</button>
        </atom-tooltip>
      </div>
    `,
  }),
};

/**
 * ooltip embaixo
 */
export const Bottom: Story = {
  args: {
    text: 'Informação adicional',
    position: 'bottom',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 80px; text-align: center;">
        <atom-tooltip [text]="text" position="bottom">
          <button style="padding: 8px 16px; cursor: pointer;">Hover me (Bottom)</button>
        </atom-tooltip>
      </div>
    `,
  }),
};

/**
 * ooltip à esquerda
 */
export const Left: Story = {
  args: {
    text: 'Informação adicional',
    position: 'left',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 80px; text-align: center;">
        <atom-tooltip [text]="text" position="left">
          <button style="padding: 8px 16px; cursor: pointer;">Hover me (Left)</button>
        </atom-tooltip>
      </div>
    `,
  }),
};

/**
 * ooltip à direita
 */
export const Right: Story = {
  args: {
    text: 'Informação adicional',
    position: 'right',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 80px; text-align: center;">
        <atom-tooltip [text]="text" position="right">
          <button style="padding: 8px 16px; cursor: pointer;">Hover me (Right)</button>
        </atom-tooltip>
      </div>
    `,
  }),
};

/**
 * ooltip com texto longo
 */
export const LongText: Story = {
  args: {
    text: 'Esta é uma informação adicional mais longa que demonstra o comportamento do tooltip',
    position: 'top',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 80px; text-align: center;">
        <atom-tooltip [text]="text" position="top">
          <button style="padding: 8px 16px; cursor: pointer;">Hover me (Long Text)</button>
        </atom-tooltip>
      </div>
    `,
  }),
};

/**
 * ooltip sem delay
 */
export const NoDelay: Story = {
  args: {
    text: 'Aparece imediatamente',
    position: 'top',
    delay: 0,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 80px; text-align: center;">
        <atom-tooltip [text]="text" position="top" [delay]="0">
          <button style="padding: 8px 16px; cursor: pointer;">Hover me (No Delay)</button>
        </atom-tooltip>
      </div>
    `,
  }),
};

/**
 * odas as posições
 */
export const AllPositions: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 120px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 80px; text-align: center;">
        <atom-tooltip text="Tooltip no topo" position="top">
          <button style="padding: 8px 16px; cursor: pointer;">Top</button>
        </atom-tooltip>

        <atom-tooltip text="Tooltip embaixo" position="bottom">
          <button style="padding: 8px 16px; cursor: pointer;">Bottom</button>
        </atom-tooltip>

        <atom-tooltip text="Tooltip à esquerda" position="left">
          <button style="padding: 8px 16px; cursor: pointer;">Left</button>
        </atom-tooltip>

        <atom-tooltip text="Tooltip à direita" position="right">
          <button style="padding: 8px 16px; cursor: pointer;">Right</button>
        </atom-tooltip>
      </div>
    `,
  }),
};

/**
 * ooltips em ícones de benefícios de voo
 */
export const FlightBenefits: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 80px;">
        <h3 style="margin-bottom: 24px;">Benefícios do Voo</h3>
        <div style="display: flex; gap: 24px;">
          <atom-tooltip text="Bagagem de mão incluída" position="top">
            <div style="width: 40px; height: 40px; background: #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer;">
              
            </div>
          </atom-tooltip>

          <atom-tooltip text="Refeição a bordo" position="top">
            <div style="width: 40px; height: 40px; background: #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer;">
              
            </div>
          </atom-tooltip>

          <atom-tooltip text="Wi-Fi não incluído" position="top">
            <div style="width: 40px; height: 40px; background: #EF4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer;">
              
            </div>
          </atom-tooltip>

          <atom-tooltip text="Entretenimento disponível" position="top">
            <div style="width: 40px; height: 40px; background: #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer;">
              
            </div>
          </atom-tooltip>
        </div>
      </div>
    `,
  }),
};

/**
 * ooltips em cards de companhias
 */
export const AirlineCards: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 80px; display: flex; gap: 24px;">
        <atom-tooltip text="Azul Linhas Aéreas - Fundada em 2008" position="top">
          <div style="width: 120px; height: 80px; background: #0033A0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; cursor: pointer;">
            AZUL
          </div>
        </atom-tooltip>

        <atom-tooltip text="Gol Linhas Aéreas - Fundada em 2001" position="top">
          <div style="width: 120px; height: 80px; background: #FF6600; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; cursor: pointer;">
            GOL
          </div>
        </atom-tooltip>

        <atom-tooltip text="Latam Airlines - Fundada em 2012" position="top">
          <div style="width: 120px; height: 80px; background: #E31837; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; cursor: pointer;">
            LATAM
          </div>
        </atom-tooltip>
      </div>
    `,
  }),
};
