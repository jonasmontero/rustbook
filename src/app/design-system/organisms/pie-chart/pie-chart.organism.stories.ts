import type { Meta, StoryObj } from '@storybook/angular';
import { PieChartOrganism } from './pie-chart.organism';

const meta: Meta<PieChartOrganism> = {
  title: 'Design System/Organisms/PieChart',
  component: PieChartOrganism,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título do gráfico',
    },
    data: {
      control: 'object',
      description: 'Array de dados para o gráfico',
    },
    radius: {
      control: { type: 'range', min: 50, max: 150, step: 10 },
      description: 'Raio do gráfico em pixels',
    },
    showPercentages: {
      control: 'boolean',
      description: 'Mostrar percentuais na legenda',
    },
  },
};

export default meta;
type Story = StoryObj<PieChartOrganism>;

/**
 * Gráfico padrão com distribuição de companhias aéreas
 */
export const Default: Story = {
  args: {
    title: 'Distribuição de Voos por Airline',
    showPercentages: true,
    radius: 100,
    data: [
      { label: 'Azul', value: 45, color: '#0033A0' },
      { label: 'Gol', value: 35, color: '#FF6600' },
      { label: 'Latam', value: 20, color: '#E31837' },
    ],
  },
};

/**
 * Sem percentuais na legenda
 */
export const WithoutPercentages: Story = {
  args: {
    title: 'Distribuição de Reservas',
    showPercentages: false,
    data: [
      { label: 'Online', value: 150, color: '#10B981' },
      { label: 'App Mobile', value: 100, color: '#3B82F6' },
      { label: 'Agências', value: 50, color: '#F59E0B' },
    ],
  },
};

/**
 * Com mais categorias
 */
export const MultipleCategories: Story = {
  args: {
    title: 'Rotas Mais Populares',
    data: [
      { label: 'GRU → GIG', value: 30, color: '#3B82F6' },
      { label: 'GRU → SSA', value: 25, color: '#10B981' },
      { label: 'GRU → BSB', value: 20, color: '#F59E0B' },
      { label: 'GRU → FOR', value: 15, color: '#EF4444' },
      { label: 'Outros', value: 10, color: '#8B5CF6' },
    ],
  },
};

/**
 * Gráfico pequeno
 */
export const Small: Story = {
  args: {
    title: 'Distribuição Compacta',
    radius: 80,
    data: [
      { label: 'Classe Economy', value: 70, color: '#10B981' },
      { label: 'Classe Business', value: 25, color: '#3B82F6' },
      { label: 'First Class', value: 5, color: '#F59E0B' },
    ],
  },
};

/**
 * Estado vazio
 */
export const Empty: Story = {
  args: {
    title: 'Sem Dados',
    data: [],
  },
};

/**
 * Dois valores apenas (50/50)
 */
export const TwoValues: Story = {
  args: {
    title: 'Round trip',
    data: [
      { label: 'Departure', value: 50, color: '#3B82F6' },
      { label: 'Return', value: 50, color: '#10B981' },
    ],
  },
};
