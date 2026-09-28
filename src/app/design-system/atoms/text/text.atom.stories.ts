import type { Meta, StoryObj } from '@storybook/angular';
import { TextAtom } from './text.atom';

const meta: Meta<TextAtom> = {
  title: 'Design System/Atoms/Text',
  component: TextAtom,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'body', 'caption', 'label'],
      description: 'Variante tipográfica',
    },
    color: {
      control: 'color',
      description: 'Cor customizada do texto',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Peso da fonte',
    },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right'],
      description: 'Alinhamento do texto',
    },
  },
};

export default meta;
type Story = StoryObj<TextAtom>;

/**
 * Texto padrão (body)
 */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<atom-text variant="body">Este é um texto padrão no formato body.</atom-text>`,
  }),
};

/**
 * Título H1
 */
export const Heading1: Story = {
  render: (args) => ({
    props: args,
    template: `<atom-text variant="h1">Título Principal H1</atom-text>`,
  }),
};

/**
 * Título H2
 */
export const Heading2: Story = {
  render: (args) => ({
    props: args,
    template: `<atom-text variant="h2">Título Secundário H2</atom-text>`,
  }),
};

/**
 * Título H3
 */
export const Heading3: Story = {
  render: (args) => ({
    props: args,
    template: `<atom-text variant="h3">Título Terciário H3</atom-text>`,
  }),
};

/**
 * Texto caption (menor)
 */
export const Caption: Story = {
  render: (args) => ({
    props: args,
    template: `<atom-text variant="caption">Este é um texto caption - ideal para legendas e textos secundários.</atom-text>`,
  }),
};

/**
 * Label (rótulo)
 */
export const Label: Story = {
  render: (args) => ({
    props: args,
    template: `<atom-text variant="label">Label Text</atom-text>`,
  }),
};

/**
 * Texto com cor customizada
 */
export const WithCustomColor: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <atom-text variant="body" color="#0033A0">Texto Azul</atom-text>
        <atom-text variant="body" color="#FF6600">Texto Gol</atom-text>
        <atom-text variant="body" color="#E31837">Texto Latam</atom-text>
      </div>
    `,
  }),
};

/**
 * Diferentes pesos de fonte
 */
export const FontWeights: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <atom-text variant="body" weight="normal">Normal (400)</atom-text>
        <atom-text variant="body" weight="medium">Medium (500)</atom-text>
        <atom-text variant="body" weight="semibold">Semibold (600)</atom-text>
        <atom-text variant="body" weight="bold">Bold (700)</atom-text>
      </div>
    `,
  }),
};

/**
 * Diferentes alinhamentos
 */
export const Alignments: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; border: 1px solid #E5E7EB; padding: 16px;">
        <atom-text variant="body" align="left">Alinhado à esquerda</atom-text>
        <atom-text variant="body" align="center">Alinhado ao centro</atom-text>
        <atom-text variant="body" align="right">Alinhado à direita</atom-text>
      </div>
    `,
  }),
};

/**
 * Showcase de todas as variantes
 */
export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <atom-text variant="h1">Heading 1 - 32px</atom-text>
          <atom-text variant="caption" color="var(--text-muted)">Font size: 32px, Weight: 700</atom-text>
        </div>
        <div>
          <atom-text variant="h2">Heading 2 - 24px</atom-text>
          <atom-text variant="caption" color="var(--text-muted)">Font size: 24px, Weight: 600</atom-text>
        </div>
        <div>
          <atom-text variant="h3">Heading 3 - 18px</atom-text>
          <atom-text variant="caption" color="var(--text-muted)">Font size: 18px, Weight: 600</atom-text>
        </div>
        <div>
          <atom-text variant="body">Body Text - 16px</atom-text>
          <atom-text variant="caption" color="var(--text-muted)">Font size: 16px, Weight: 400</atom-text>
        </div>
        <div>
          <atom-text variant="caption">Caption Text - 14px</atom-text>
          <atom-text variant="caption" color="var(--text-muted)">Font size: 14px, Weight: 400</atom-text>
        </div>
        <div>
          <atom-text variant="label">Label Text - 14px</atom-text>
          <atom-text variant="caption" color="var(--text-muted)">Font size: 14px, Weight: 500</atom-text>
        </div>
      </div>
    `,
  }),
};
