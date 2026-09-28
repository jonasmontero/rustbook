import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { InputAtom } from './input.atom';

const meta: Meta<InputAtom> = {
  title: 'Design System/Atoms/Input',
  component: InputAtom,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'date', 'email', 'password'],
      description: 'Tipo do input',
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
    },
    value: {
      control: 'text',
      description: 'Valor do input',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
    error: {
      control: 'boolean',
      description: 'Estado de erro',
    },
    errorMessage: {
      control: 'text',
      description: 'Mensagem de erro',
    },
  },
  args: {
    valueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<InputAtom>;

/**
 * Input padrão (text)
 */
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Digite algo...',
  },
};

/**
 * Input com valor preenchido
 */
export const WithValue: Story = {
  args: {
    type: 'text',
    placeholder: 'Nome',
    value: 'João Silva',
  },
};

/**
 * Input de email
 */
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'seu@email.com',
  },
};

/**
 * Input de número
 */
export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Quantidade',
  },
};

/**
 * Input de data
 */
export const Date: Story = {
  args: {
    type: 'date',
  },
};

/**
 * Input de senha
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Digite sua senha',
  },
};

/**
 * Input com erro
 */
export const WithError: Story = {
  args: {
    type: 'email',
    placeholder: 'seu@email.com',
    value: 'email-invalido',
    error: true,
    errorMessage: 'Por favor, insira um email válido',
  },
};

/**
 * Input desabilitado
 */
export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Campo desabilitado',
    value: 'Valor não editável',
    disabled: true,
  },
};

/**
 * Diferentes tipos de input
 */
export const AllTypes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <atom-input type="text" placeholder="Text input" />
        <atom-input type="email" placeholder="Email input" />
        <atom-input type="password" placeholder="Password input" />
        <atom-input type="number" placeholder="Number input" />
        <atom-input type="date" />
      </div>
    `,
  }),
};

/**
 * Estados do input
 */
export const States: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <div>
          <p style="margin-bottom: 8px; font-size: 14px; font-weight: 500;">Normal</p>
          <atom-input type="text" placeholder="Digite algo..." />
        </div>

        <div>
          <p style="margin-bottom: 8px; font-size: 14px; font-weight: 500;">Com valor</p>
          <atom-input type="text" placeholder="Nome" value="João Silva" />
        </div>

        <div>
          <p style="margin-bottom: 8px; font-size: 14px; font-weight: 500;">Com erro</p>
          <atom-input
            type="email"
            placeholder="Email"
            value="email-invalido"
            [error]="true"
            errorMessage="Email inválido"
          />
        </div>

        <div>
          <p style="margin-bottom: 8px; font-size: 14px; font-weight: 500;">Desabilitado</p>
          <atom-input
            type="text"
            placeholder="Campo desabilitado"
            value="Não editável"
            [disabled]="true"
          />
        </div>
      </div>
    `,
  }),
};
