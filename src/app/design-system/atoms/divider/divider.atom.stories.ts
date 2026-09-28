import type { Meta, StoryObj } from '@storybook/angular';
import { DividerAtom } from './divider.atom';

const meta: Meta<DividerAtom> = {
  title: 'Design System/Atoms/Divider',
  component: DividerAtom,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientação do divider',
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Espaçamento ao redor',
    },
    color: {
      control: 'color',
      description: 'Cor customizada (opcional)',
    },
  },
};

export default meta;
type Story = StoryObj<DividerAtom>;

/**
 * Divider horizontal padrão
 */
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    spacing: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <p>Conteúdo acima</p>
        <atom-divider orientation="horizontal" [spacing]="spacing" />
        <p>Conteúdo abaixo</p>
      </div>
    `,
  }),
};

/**
 * Divider vertical
 */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    spacing: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px; display: flex; align-items: center; height: 100px;">
        <span>Esquerda</span>
        <atom-divider orientation="vertical" [spacing]="spacing" />
        <span>Direita</span>
      </div>
    `,
  }),
};

/**
 * Sem espaçamento
 */
export const NoSpacing: Story = {
  args: {
    orientation: 'horizontal',
    spacing: 'none',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <p style="margin: 0;">Sem espaço acima</p>
        <atom-divider orientation="horizontal" spacing="none" />
        <p style="margin: 0;">Sem espaço abaixo</p>
      </div>
    `,
  }),
};

/**
 * Espaçamento pequeno
 */
export const SmallSpacing: Story = {
  args: {
    orientation: 'horizontal',
    spacing: 'sm',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <p>Pouco espaço acima</p>
        <atom-divider orientation="horizontal" spacing="sm" />
        <p>Pouco espaço abaixo</p>
      </div>
    `,
  }),
};

/**
 * Espaçamento médio
 */
export const MediumSpacing: Story = {
  args: {
    orientation: 'horizontal',
    spacing: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <p>Espaço médio acima</p>
        <atom-divider orientation="horizontal" spacing="md" />
        <p>Espaço médio abaixo</p>
      </div>
    `,
  }),
};

/**
 * Espaçamento grande
 */
export const LargeSpacing: Story = {
  args: {
    orientation: 'horizontal',
    spacing: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <p>Muito espaço acima</p>
        <atom-divider orientation="horizontal" spacing="lg" />
        <p>Muito espaço abaixo</p>
      </div>
    `,
  }),
};

/**
 * Espaçamento extra grande
 */
export const ExtraLargeSpacing: Story = {
  args: {
    orientation: 'horizontal',
    spacing: 'xl',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <p>Espaço extra grande acima</p>
        <atom-divider orientation="horizontal" spacing="xl" />
        <p>Espaço extra grande abaixo</p>
      </div>
    `,
  }),
};

/**
 * Todos os espaçamentos horizontais
 */
export const AllHorizontalSpacings: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <h3>Todos os Espaçamentos Horizontais</h3>

        <p>None</p>
        <atom-divider orientation="horizontal" spacing="none" />
        <p>↑ spacing: none ↑</p>

        <atom-divider orientation="horizontal" spacing="md" />

        <p>Small</p>
        <atom-divider orientation="horizontal" spacing="sm" />
        <p>↑ spacing: sm ↑</p>

        <atom-divider orientation="horizontal" spacing="md" />

        <p>Medium</p>
        <atom-divider orientation="horizontal" spacing="md" />
        <p>↑ spacing: md ↑</p>

        <atom-divider orientation="horizontal" spacing="md" />

        <p>Large</p>
        <atom-divider orientation="horizontal" spacing="lg" />
        <p>↑ spacing: lg ↑</p>

        <atom-divider orientation="horizontal" spacing="md" />

        <p>Extra Large</p>
        <atom-divider orientation="horizontal" spacing="xl" />
        <p>↑ spacing: xl ↑</p>
      </div>
    `,
  }),
};

/**
 * Dividers verticais com diferentes espaçamentos
 */
export const AllVerticalSpacings: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px; display: flex; align-items: center; height: 80px; gap: 16px;">
        <span>A</span>
        <atom-divider orientation="vertical" spacing="none" />
        <span>none</span>

        <atom-divider orientation="vertical" spacing="md" />

        <span>B</span>
        <atom-divider orientation="vertical" spacing="sm" />
        <span>sm</span>

        <atom-divider orientation="vertical" spacing="md" />

        <span>C</span>
        <atom-divider orientation="vertical" spacing="md" />
        <span>md</span>

        <atom-divider orientation="vertical" spacing="md" />

        <span>D</span>
        <atom-divider orientation="vertical" spacing="lg" />
        <span>lg</span>

        <atom-divider orientation="vertical" spacing="md" />

        <span>E</span>
        <atom-divider orientation="vertical" spacing="xl" />
        <span>xl</span>
      </div>
    `,
  }),
};

/**
 * Divider em card de voo
 */
export const InFlightCard: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; max-width: 500px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; background: #0033A0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 12px;">
              AZ
            </div>
            <div>
              <div style="font-weight: 600;">Azul Linhas Aéreas</div>
              <div style="font-size: 14px; color: #64748B;">Voo AD 4321</div>
            </div>
          </div>

          <atom-divider orientation="horizontal" spacing="lg" />

          <div style="display: flex; justify-content: space-between;">
            <div>
              <div style="font-size: 12px; color: #64748B;">Partida</div>
              <div style="font-weight: 600;">08:30</div>
              <div style="font-size: 14px;">GRU</div>
            </div>

            <div style="display: flex; align-items: center; gap: 8px; color: #64748B;">
              <span>2h 15min</span>
            </div>

            <div style="text-align: right;">
              <div style="font-size: 12px; color: #64748B;">Chegada</div>
              <div style="font-weight: 600;">10:45</div>
              <div style="font-size: 14px;">GIG</div>
            </div>
          </div>

          <atom-divider orientation="horizontal" spacing="lg" />

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 24px; font-weight: 600; color: #10B981;">R$ 450,00</span>
            <button style="padding: 8px 16px; background: #2563EB; color: white; border: none; border-radius: 6px; cursor: pointer;">
              Selecionar
            </button>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Dividers em menu vertical
 */
export const InVerticalMenu: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <div style="display: flex; height: 200px; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
          <div style="width: 200px; padding: 16px; background: #F8FAFC;">
            <div style="margin-bottom: 12px; font-weight: 600;">Menu</div>
            <div style="padding: 8px; cursor: pointer; border-radius: 4px; background: white;">Dashboard</div>
            <div style="padding: 8px; cursor: pointer; border-radius: 4px;">Buscar Voos</div>
            <div style="padding: 8px; cursor: pointer; border-radius: 4px;">Comparar</div>
          </div>

          <atom-divider orientation="vertical" spacing="none" />

          <div style="flex: 1; padding: 16px;">
            <h3 style="margin-top: 0;">Dashboard</h3>
            <p>Conteúdo principal aqui...</p>
          </div>
        </div>
      </div>
    `,
  }),
};
