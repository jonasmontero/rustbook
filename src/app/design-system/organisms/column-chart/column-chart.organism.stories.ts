import type { Meta, StoryObj } from '@storybook/angular';
import { ColumnChartOrganism } from './column-chart.organism';

const meta: Meta<ColumnChartOrganism> = {
  title: 'Design System/Organisms/ColumnChart',
  component: ColumnChartOrganism,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ColumnChartOrganism>;

export const Default: Story = {
  args: {
    title: 'Voos por Mês',
    data: [
      { label: 'Jan', value: 320 },
      { label: 'Fev', value: 280 },
      { label: 'Mar', value: 410 },
      { label: 'Abr', value: 350 },
      { label: 'Mai', value: 480 },
      { label: 'Jun', value: 420 },
      { label: 'Jul', value: 550 },
      { label: 'Ago', value: 490 },
      { label: 'Set', value: 380 },
      { label: 'Out', value: 430 },
      { label: 'Nov', value: 520 },
      { label: 'Dez', value: 600 },
    ],
  },
};

export const Quarterly: Story = {
  args: {
    title: 'Receita Trimestral',
    data: [
      { label: 'Q1 2025', value: 1200 },
      { label: 'Q2 2025', value: 1450 },
      { label: 'Q3 2025', value: 1350 },
      { label: 'Q4 2025', value: 1800 },
    ],
  },
};

export const Empty: Story = {
  args: {
    title: 'Sem Dados',
    data: [],
  },
};
