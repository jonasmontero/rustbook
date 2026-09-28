import type { Meta, StoryObj } from '@storybook/angular';
import { LabelAtom } from './label.atom';

const meta: Meta<LabelAtom> = {
  title: 'Design System/Atoms/Label',
  component: LabelAtom,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Texto do label',
    },
    required: {
      control: 'boolean',
      description: 'Campo obrigatório (mostra asterisco)',
    },
    htmlFor: {
      control: 'text',
      description: 'ID do input associado',
    },
  },
  args: {
    text: 'Label Text',
    required: false,
  },
};

export default meta;
type Story = StoryObj<LabelAtom>;

/**
 * Label padrão
 */
export const Default: Story = {
  args: {
    text: 'Nome',
  },
};

/**
 * Label obrigatório (com asterisco)
 */
export const Required: Story = {
  args: {
    text: 'Email',
    required: true,
  },
};

/**
 * Label associado a input
 */
export const WithInput: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div>
        <atom-label text="Nome completo" [required]="true" htmlFor="name-input" />
        <input
          id="name-input"
          type="text"
          placeholder="Digite seu nome"
          style="
            width: 100%;
            height: 40px;
            padding: 0 12px;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            font-size: 16px;
            margin-top: 4px;
          "
        />
      </div>
    `,
  }),
};

/**
 * Múltiplos labels para um formulário
 */
export const FormExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <atom-label text="Nome" [required]="true" htmlFor="name" />
          <input
            id="name"
            type="text"
            placeholder="Seu nome"
            style="
              width: 100%;
              height: 40px;
              padding: 0 12px;
              border: 1px solid #D1D5DB;
              border-radius: 8px;
              font-size: 16px;
              margin-top: 4px;
            "
          />
        </div>

        <div>
          <atom-label text="Email" [required]="true" htmlFor="email" />
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            style="
              width: 100%;
              height: 40px;
              padding: 0 12px;
              border: 1px solid #D1D5DB;
              border-radius: 8px;
              font-size: 16px;
              margin-top: 4px;
            "
          />
        </div>

        <div>
          <atom-label text="Telefone" [required]="false" htmlFor="phone" />
          <input
            id="phone"
            type="tel"
            placeholder="(11) 99999-9999"
            style="
              width: 100%;
              height: 40px;
              padding: 0 12px;
              border: 1px solid #D1D5DB;
              border-radius: 8px;
              font-size: 16px;
              margin-top: 4px;
            "
          />
        </div>
      </div>
    `,
  }),
};

/**
 * Comparação: com e sem required
 */
export const RequiredComparison: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 32px;">
        <div>
          <atom-label text="Campo opcional" [required]="false" />
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
            Sem asterisco
          </p>
        </div>
        <div>
          <atom-label text="Campo obrigatório" [required]="true" />
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
            Com asterisco vermelho
          </p>
        </div>
      </div>
    `,
  }),
};
