import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PassengerSelectorMolecule } from './passenger-selector.molecule';

const meta: Meta<PassengerSelectorMolecule> = {
  title: 'Design System/Molecules/PassengerSelector',
  component: PassengerSelectorMolecule,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label do seletor',
    },
    value: {
      control: 'number',
      description: 'Valor atual',
    },
    min: {
      control: 'number',
      description: 'Valor mínimo',
    },
    max: {
      control: 'number',
      description: 'Valor máximo',
    },
    description: {
      control: 'text',
      description: 'Descrição adicional',
    },
  },
  args: {
    valueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<PassengerSelectorMolecule>;

/**
 * eletor padrão
 */
export const Default: Story = {
  args: {
    label: 'Passengers',
    value: 1,
  },
};

/**
 * dultos
 */
export const Adults: Story = {
  args: {
    label: 'Adults',
    value: 2,
    min: 1,
    max: 9,
    description: '12 anos ou mais',
  },
};

/**
 * rianças
 */
export const Children: Story = {
  args: {
    label: 'Children',
    value: 0,
    min: 0,
    max: 9,
    description: '2 a 11 anos',
  },
};

/**
 * ebês
 */
export const Infants: Story = {
  args: {
    label: 'Infants',
    value: 0,
    min: 0,
    max: 4,
    description: '0 a 23 meses (no colo)',
  },
};

/**
 * alor mínimo atingido
 */
export const AtMinimum: Story = {
  args: {
    label: 'Adults',
    value: 1,
    min: 1,
    max: 9,
  },
};

/**
 * alor máximo atingido
 */
export const AtMaximum: Story = {
  args: {
    label: 'Passengers',
    value: 9,
    min: 1,
    max: 9,
  },
};

/**
 * em label
 */
export const WithoutLabel: Story = {
  args: {
    value: 2,
  },
};

/**
 * ormulário completo de passageiros
 */
export const PassengerForm: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px; max-width: 400px;">
        <h3 style="margin-bottom: 24px;">Quantos passageiros?</h3>

        <div style="display: flex; flex-direction: column; gap: 24px;">
          <molecule-passenger-selector
            label="Adults"
            [value]="2"
            [min]="1"
            [max]="9"
            description="12 anos ou mais"
          />

          <molecule-passenger-selector
            label="Children"
            [value]="1"
            [min]="0"
            [max]="9"
            description="2 a 11 anos"
          />

          <molecule-passenger-selector
            label="Infants"
            [value]="0"
            [min]="0"
            [max]="4"
            description="0 a 23 meses (no colo)"
          />
        </div>

        <div style="margin-top: 24px; padding: 16px; background: #F8FAFC; border-radius: 8px;">
          <div style="font-weight: 600; margin-bottom: 4px;">Total: 3 passageiros</div>
          <div style="font-size: 14px; color: #64748B;">
            2 adults, 1 criança
          </div>
        </div>
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
          <h4 style="margin-bottom: 12px;">Valor = 0 (mínimo)</h4>
          <molecule-passenger-selector
            label="Children"
            [value]="0"
            [min]="0"
            [max]="9"
          />
        </div>

        <div>
          <h4 style="margin-bottom: 12px;">Valor = 1 (mínimo para adults)</h4>
          <molecule-passenger-selector
            label="Adults"
            [value]="1"
            [min]="1"
            [max]="9"
          />
        </div>

        <div>
          <h4 style="margin-bottom: 12px;">Valor intermediário</h4>
          <molecule-passenger-selector
            label="Passengers"
            [value]="5"
            [min]="1"
            [max]="9"
          />
        </div>

        <div>
          <h4 style="margin-bottom: 12px;">Valor = 9 (máximo)</h4>
          <molecule-passenger-selector
            label="Passengers"
            [value]="9"
            [min]="1"
            [max]="9"
          />
        </div>

        <div>
          <h4 style="margin-bottom: 12px;">Com descrição</h4>
          <molecule-passenger-selector
            label="Adults"
            [value]="2"
            [min]="1"
            [max]="9"
            description="12 anos ou mais"
          />
        </div>
      </div>
    `,
  }),
};

/**
 * omparação de classes de voo
 */
export const FlightClasses: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px; max-width: 800px;">
        <h3 style="margin-bottom: 24px;">Selecione a Classe</h3>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px;">
            <div style="font-weight: 600; margin-bottom: 16px;">Economy</div>
            <molecule-passenger-selector
              label="Passengers"
              [value]="2"
              [min]="1"
              [max]="9"
            />
            <div style="margin-top: 16px; font-size: 18px; font-weight: 600; color: #10B981;">
              R$ 450 /pessoa
            </div>
          </div>

          <div style="border: 2px solid #2563EB; border-radius: 8px; padding: 16px; background: #F0F9FF;">
            <div style="font-weight: 600; margin-bottom: 16px; color: #2563EB;">
              Business ⭐
            </div>
            <molecule-passenger-selector
              label="Passengers"
              [value]="1"
              [min]="1"
              [max]="9"
            />
            <div style="margin-top: 16px; font-size: 18px; font-weight: 600; color: #2563EB;">
              R$ 1.200 /pessoa
            </div>
          </div>

          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px;">
            <div style="font-weight: 600; margin-bottom: 16px;">First Class</div>
            <molecule-passenger-selector
              label="Passengers"
              [value]="1"
              [min]="1"
              [max]="4"
            />
            <div style="margin-top: 16px; font-size: 18px; font-weight: 600; color: #F59E0B;">
              R$ 2.500 /pessoa
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * om validação de regras
 */
export const WithValidation: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px; max-width: 500px;">
        <h3 style="margin-bottom: 16px;">Passengers</h3>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <molecule-passenger-selector
            label="Adults"
            [value]="1"
            [min]="1"
            [max]="9"
            description="Pelo menos 1 adulto é obrigatório"
          />

          <molecule-passenger-selector
            label="Infants"
            [value]="2"
            [min]="0"
            [max]="4"
            description="Máximo 1 bebê por adulto"
          />
        </div>

        <div style="margin-top: 16px; padding: 12px; background: #FEF2F2; border-left: 3px solid #EF4444; border-radius: 4px;">
          <div style="font-size: 14px; color: #991B1B;">
            ️ Atenção: Você selecionou 2 infants mas apenas 1 adulto. Ajuste a quantidade.
          </div>
        </div>
      </div>
    `,
  }),
};
