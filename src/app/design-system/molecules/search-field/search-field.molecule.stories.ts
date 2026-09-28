import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { SearchFieldMolecule } from './search-field.molecule';

const meta: Meta<SearchFieldMolecule> = {
  title: 'Design System/Molecules/SearchField',
  component: SearchFieldMolecule,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder do input',
    },
    value: {
      control: 'text',
      description: 'Valor do input',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de loading',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do campo',
    },
  },
  args: {
    search: fn(),
    clear: fn(),
    valueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<SearchFieldMolecule>;

/**
 * Search field padrão
 */
export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

/**
 * Busca de aeroportos
 */
export const AirportSearch: Story = {
  args: {
    placeholder: 'Digite o aeroporto ou cidade...',
    size: 'md',
  },
};

/**
 * Busca de destinos
 */
export const DestinationSearch: Story = {
  args: {
    placeholder: 'Para onde você quer ir?',
    size: 'lg',
  },
};

/**
 * Com valor preenchido
 */
export const WithValue: Story = {
  args: {
    placeholder: 'Search destino...',
    value: 'São Paulo - GRU',
  },
};

/**
 * Em loading
 */
export const Loading: Story = {
  args: {
    placeholder: 'Buscando...',
    value: 'Rio de Janeiro',
    loading: true,
  },
};

/**
 * Pequeno
 */
export const Small: Story = {
  args: {
    placeholder: 'Search...',
    size: 'sm',
  },
};

/**
 * Grande
 */
export const Large: Story = {
  args: {
    placeholder: 'Search destino...',
    size: 'lg',
  },
};

/**
 * Todos os tamanhos
 */
export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 24px; max-width: 400px;">
        <molecule-search-field
          placeholder="Search (Small)"
          size="sm"
        />
        <molecule-search-field
          placeholder="Search (Medium)"
          size="md"
        />
        <molecule-search-field
          placeholder="Search (Large)"
          size="lg"
        />
      </div>
    `,
  }),
};

/**
 * Formulário de busca de voos
 */
export const FlightSearchForm: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px; max-width: 600px;">
        <h3 style="margin-bottom: 16px;">Search Flights</h3>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Origin</label>
            <molecule-search-field
              placeholder="Digite o aeroporto de origem..."
              value="São Paulo - GRU"
            />
          </div>

          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Destination</label>
            <molecule-search-field
              placeholder="Digite o aeroporto de destino..."
            />
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Estados interativos
 */
export const InteractiveStates: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px; max-width: 500px;">
        <div>
          <h4 style="margin-bottom: 8px;">Vazio</h4>
          <molecule-search-field
            placeholder="Search destino..."
          />
        </div>

        <div>
          <h4 style="margin-bottom: 8px;">Com Valor (mostra botão X)</h4>
          <molecule-search-field
            placeholder="Search destino..."
            value="Rio de Janeiro - GIG"
          />
        </div>

        <div>
          <h4 style="margin-bottom: 8px;">Loading</h4>
          <molecule-search-field
            placeholder="Buscando..."
            value="São Paulo"
            [loading]="true"
          />
        </div>
      </div>
    `,
  }),
};

/**
 * Busca de companhias aéreas
 */
export const AirlineSearch: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px; max-width: 400px;">
        <h3 style="margin-bottom: 16px;">Filtrar por Airline</h3>

        <molecule-search-field
          placeholder="Azul, Gol, Latam..."
          size="md"
        />

        <div style="margin-top: 16px; padding: 16px; background: #F8FAFC; border-radius: 8px;">
          <div style="font-size: 14px; color: #64748B; margin-bottom: 8px;">Sugestões:</div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <span style="padding: 4px 12px; background: white; border-radius: 4px; font-size: 14px; cursor: pointer;">Azul</span>
            <span style="padding: 4px 12px; background: white; border-radius: 4px; font-size: 14px; cursor: pointer;">Gol</span>
            <span style="padding: 4px 12px; background: white; border-radius: 4px; font-size: 14px; cursor: pointer;">Latam</span>
          </div>
        </div>
      </div>
    `,
  }),
};
