import type { Meta, StoryObj } from '@storybook/angular';
import { AreaChartOrganism } from './area-chart.organism';

const meta: Meta<AreaChartOrganism> = {
  title: 'Design System/Organisms/AreaChart',
  component: AreaChartOrganism,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AreaChartOrganism>;

export const Default: Story = {
  args: {
    title: 'Receita Acumulada Mensal',
    fillColor: '#2563EB',
    data: [
      { date: new Date(2025, 0, 1), value: 45000 },
      { date: new Date(2025, 1, 1), value: 98000 },
      { date: new Date(2025, 2, 1), value: 156000 },
      { date: new Date(2025, 3, 1), value: 210000 },
      { date: new Date(2025, 4, 1), value: 285000 },
      { date: new Date(2025, 5, 1), value: 352000 },
      { date: new Date(2025, 6, 1), value: 445000 },
      { date: new Date(2025, 7, 1), value: 520000 },
      { date: new Date(2025, 8, 1), value: 598000 },
      { date: new Date(2025, 9, 1), value: 685000 },
      { date: new Date(2025, 10, 1), value: 780000 },
      { date: new Date(2025, 11, 1), value: 900000 },
    ],
  },
};

export const GreenGrowth: Story = {
  args: {
    title: 'Crescimento de Usuários',
    fillColor: '#10B981',
    data: [
      { date: new Date(2025, 0, 1), value: 1200 },
      { date: new Date(2025, 1, 1), value: 1850 },
      { date: new Date(2025, 2, 1), value: 2400 },
      { date: new Date(2025, 3, 1), value: 3100 },
      { date: new Date(2025, 4, 1), value: 3900 },
      { date: new Date(2025, 5, 1), value: 4800 },
    ],
  },
};

export const Empty: Story = {
  args: {
    title: 'Sem Dados',
    data: [],
  },
};
