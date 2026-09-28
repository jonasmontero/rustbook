import type { Meta, StoryObj } from '@storybook/angular';
import { AirlineLogoMolecule } from './airline-logo.molecule';

const meta: Meta<AirlineLogoMolecule> = {
  title: 'Design System/Molecules/AirlineLogo',
  component: AirlineLogoMolecule,
  tags: ['autodocs'],
  argTypes: {
    airline: {
      control: 'select',
      options: ['azul', 'gol', 'latam'],
      description: 'Airline aérea',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamanho do avatar',
    },
    showName: {
      control: 'boolean',
      description: 'Mostrar nome',
    },
    showBadge: {
      control: 'boolean',
      description: 'Mostrar badge',
    },
  },
};

export default meta;
type Story = StoryObj<AirlineLogoMolecule>;

/**
 * Logo Azul
 */
export const Azul: Story = {
  args: {
    airline: 'azul',
    showName: true,
  },
};

/**
 * Logo Gol
 */
export const Gol: Story = {
  args: {
    airline: 'gol',
    showName: true,
  },
};

/**
 * Logo Latam
 */
export const Latam: Story = {
  args: {
    airline: 'latam',
    showName: true,
  },
};

/**
 * Com badge
 */
export const WithBadge: Story = {
  args: {
    airline: 'azul',
    showName: true,
    showBadge: true,
  },
};

/**
 * Somente avatar
 */
export const AvatarOnly: Story = {
  args: {
    airline: 'gol',
    showName: false,
  },
};

/**
 * Tamanho pequeno
 */
export const Small: Story = {
  args: {
    airline: 'azul',
    size: 'sm',
    showName: true,
  },
};

/**
 * Tamanho grande
 */
export const Large: Story = {
  args: {
    airline: 'latam',
    size: 'lg',
    showName: true,
    showBadge: true,
  },
};

/**
 * Todas as companhias
 */
export const AllAirlines: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px;">
        <molecule-airline-logo
          airline="azul"
          [showName]="true"
        />

        <molecule-airline-logo
          airline="gol"
          [showName]="true"
        />

        <molecule-airline-logo
          airline="latam"
          [showName]="true"
        />
      </div>
    `,
  }),
};

/**
 * Com badges
 */
export const WithBadges: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px;">
        <molecule-airline-logo
          airline="azul"
          [showName]="true"
          [showBadge]="true"
        />

        <molecule-airline-logo
          airline="gol"
          [showName]="true"
          [showBadge]="true"
        />

        <molecule-airline-logo
          airline="latam"
          [showName]="true"
          [showBadge]="true"
        />
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
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px;">
        <molecule-airline-logo
          airline="azul"
          size="sm"
          [showName]="true"
          [showBadge]="true"
        />

        <molecule-airline-logo
          airline="azul"
          size="md"
          [showName]="true"
          [showBadge]="true"
        />

        <molecule-airline-logo
          airline="azul"
          size="lg"
          [showName]="true"
          [showBadge]="true"
        />

        <molecule-airline-logo
          airline="azul"
          size="xl"
          [showName]="true"
          [showBadge]="true"
        />
      </div>
    `,
  }),
};

/**
 * Em card de voo
 */
export const InFlightCard: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px; max-width: 600px;">
        <div style="border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px;">
          <molecule-airline-logo
            airline="azul"
            size="lg"
            [showName]="true"
            [showBadge]="true"
          />

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 12px; color: #64748B; margin-bottom: 4px;">Partida</div>
                <div style="font-size: 20px; font-weight: 600;">08:30</div>
                <div style="color: #64748B;">GRU - São Paulo</div>
              </div>

              <div style="text-align: center; color: #64748B;">
                <div style="font-size: 12px;">2h 15min</div>
                <div style="margin: 8px 0;">→</div>
                <div style="font-size: 12px;">Direct</div>
              </div>

              <div style="text-align: right;">
                <div style="font-size: 12px; color: #64748B; margin-bottom: 4px;">Chegada</div>
                <div style="font-size: 20px; font-weight: 600;">10:45</div>
                <div style="color: #64748B;">GIG - Rio de Janeiro</div>
              </div>
            </div>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 28px; font-weight: 600; color: #10B981;">
              R$ 450,00
            </div>
            <button style="padding: 12px 24px; background: #2563EB; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
              Select
            </button>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Comparação de companhias
 */
export const AirlineComparison: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <h3 style="margin-bottom: 24px;">Comparar Airlines</h3>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; text-align: center;">
            <molecule-airline-logo
              airline="azul"
              size="xl"
              [showName]="false"
            />
            <div style="margin-top: 16px; font-weight: 600;">Azul</div>
            <div style="margin-top: 8px; font-size: 24px; font-weight: 600; color: #10B981;">R$ 450</div>
            <div style="margin-top: 4px; font-size: 12px; color: #64748B;">Mais barato</div>
          </div>

          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; text-align: center;">
            <molecule-airline-logo
              airline="gol"
              size="xl"
              [showName]="false"
            />
            <div style="margin-top: 16px; font-weight: 600;">Gol</div>
            <div style="margin-top: 8px; font-size: 24px; font-weight: 600;">R$ 520</div>
          </div>

          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; text-align: center;">
            <molecule-airline-logo
              airline="latam"
              size="xl"
              [showName]="false"
            />
            <div style="margin-top: 16px; font-weight: 600;">Latam</div>
            <div style="margin-top: 8px; font-size: 24px; font-weight: 600;">R$ 480</div>
          </div>
        </div>
      </div>
    `,
  }),
};
