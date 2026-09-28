import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { DatePickerMolecule } from './date-picker.molecule';

const meta: Meta<DatePickerMolecule> = {
  title: 'Design System/Molecules/DatePicker',
  component: DatePickerMolecule,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label do campo',
    },
    value: {
      control: 'text',
      description: 'Valor da data (YYYY-MM-DD)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder',
    },
    required: {
      control: 'boolean',
      description: 'Campo obrigatório',
    },
    disabled: {
      control: 'boolean',
      description: 'Campo desabilitado',
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
    dateChange: fn(),
  },
};

export default meta;
type Story = StoryObj<DatePickerMolecule>;

/**
 * ate picker padrão
 */
export const Default: Story = {
  args: {
    label: 'Selecione a data',
  },
};

/**
 * ata de ida
 */
export const DepartureDate: Story = {
  args: {
    label: 'Data de ida',
    required: true,
  },
};

/**
 * ata de volta
 */
export const ReturnDate: Story = {
  args: {
    label: 'Data de volta',
  },
};

/**
 * om valor preenchido
 */
export const WithValue: Story = {
  args: {
    label: 'Data selecionada',
    value: '2024-03-15',
  },
};

/**
 * ampo obrigatório
 */
export const Required: Story = {
  args: {
    label: 'Data obrigatória',
    required: true,
  },
};

/**
 * ampo desabilitado
 */
export const Disabled: Story = {
  args: {
    label: 'Data desabilitada',
    value: '2024-03-15',
    disabled: true,
  },
};

/**
 * om erro
 */
export const WithError: Story = {
  args: {
    label: 'Data inválida',
    value: '2024-01-01',
    error: true,
    errorMessage: 'A data deve ser posterior a hoje',
  },
};

/**
 * em label
 */
export const WithoutLabel: Story = {
  args: {
    placeholder: 'Selecione a data',
  },
};

/**
 * ormulário de busca de voos
 */
export const FlightSearchForm: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px; max-width: 600px;">
        <h3 style="margin-bottom: 24px;">Quando você quer viajar?</h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <molecule-date-picker
            label="Data de ida"
            [required]="true"
          />

          <molecule-date-picker
            label="Data de volta"
          />
        </div>

        <p style="margin-top: 16px; font-size: 14px; color: #64748B;">
           Dica: Escolha datas flexíveis para encontrar os melhores preços
        </p>
      </div>
    `,
  }),
};

/**
 * odos os estados
 */
export const AllStates: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px;">Padrão</h4>
          <molecule-date-picker
            label="Data"
          />
        </div>

        <div>
          <h4 style="margin-bottom: 8px;">Obrigatório</h4>
          <molecule-date-picker
            label="Data"
            [required]="true"
          />
        </div>

        <div>
          <h4 style="margin-bottom: 8px;">Com Valor</h4>
          <molecule-date-picker
            label="Data"
            value="2024-03-15"
          />
        </div>

        <div>
          <h4 style="margin-bottom: 8px;">Desabilitado</h4>
          <molecule-date-picker
            label="Data"
            value="2024-03-15"
            [disabled]="true"
          />
        </div>

        <div>
          <h4 style="margin-bottom: 8px;">Com Erro</h4>
          <molecule-date-picker
            label="Data"
            value="2024-01-01"
            [error]="true"
            errorMessage="Data inválida"
          />
        </div>
      </div>
    `,
  }),
};

/**
 * omparação de voos
 */
export const FlightComparison: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px; max-width: 800px;">
        <h3 style="margin-bottom: 24px;">Compare Preços por Data</h3>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px;">
            <molecule-date-picker
              label="Opção 1"
              value="2024-03-10"
            />
            <div style="margin-top: 12px; font-size: 24px; font-weight: 600; color: #10B981;">
              R$ 450,00
            </div>
          </div>

          <div style="border: 2px solid #2563EB; border-radius: 8px; padding: 16px;">
            <molecule-date-picker
              label="Melhor Preço"
              value="2024-03-15"
            />
            <div style="margin-top: 12px; font-size: 24px; font-weight: 600; color: #2563EB;">
              R$ 380,00
            </div>
            <div style="margin-top: 4px; font-size: 12px; color: #10B981;">
              ↓ Economia de R$ 70
            </div>
          </div>

          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px;">
            <molecule-date-picker
              label="Opção 3"
              value="2024-03-20"
            />
            <div style="margin-top: 12px; font-size: 24px; font-weight: 600; color: #10B981;">
              R$ 420,00
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * alendário de temporada
 */
export const SeasonCalendar: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px; max-width: 600px;">
        <h3 style="margin-bottom: 16px;">Melhores Épocas para Viajar</h3>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
          <div style="padding: 16px; background: #F0FDF4; border-radius: 8px;">
            <div style="font-weight: 600; margin-bottom: 8px; color: #10B981;">
               Baixa Temporada
            </div>
            <molecule-date-picker
              label="Mar - Jun"
              value="2024-04-15"
            />
            <div style="margin-top: 8px; font-size: 14px; color: #64748B;">
              Preços até 40% mais baratos
            </div>
          </div>

          <div style="padding: 16px; background: #FEF2F2; border-radius: 8px;">
            <div style="font-weight: 600; margin-bottom: 8px; color: #EF4444;">
               Alta Temporada
            </div>
            <molecule-date-picker
              label="Dez - Jan"
              value="2024-12-20"
            />
            <div style="margin-top: 8px; font-size: 14px; color: #64748B;">
              Reserve com antecedência
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};
