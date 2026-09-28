import type { Meta, StoryObj } from '@storybook/angular';
import { BarChartOrganism } from './bar-chart.organism';

const meta: Meta<BarChartOrganism> = {
  title: 'Design System/Organisms/BarChart',
  component: BarChartOrganism,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<BarChartOrganism>;

export const Default: Story = {
  args: {
    title: 'Top 10 Rotas Mais Vendidas',
    data: [
      { label: 'GRU → GIG', value: 1240 },
      { label: 'GRU → SSA', value: 980 },
      { label: 'GRU → BSB', value: 850 },
      { label: 'GRU → FOR', value: 720 },
      { label: 'GRU → REC', value: 650 },
      { label: 'GIG → SSA', value: 580 },
      { label: 'GIG → FOR', value: 520 },
      { label: 'BSB → FOR', value: 450 },
      { label: 'SSA → REC', value: 380 },
      { label: 'FOR → REC', value: 320 },
    ],
  },
};

export const Top5: Story = {
  args: {
    title: 'Top 5 Destinos',
    data: [
      { label: 'Rio de Janeiro', value: 2400 },
      { label: 'Salvador', value: 1800 },
      { label: 'Brasília', value: 1500 },
      { label: 'Fortaleza', value: 1200 },
      { label: 'Recife', value: 900 },
    ],
  },
};

export const Empty: Story = {
  args: {
    title: 'Sem Dados',
    data: [],
  },
};
