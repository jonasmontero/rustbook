import type { Meta, StoryObj } from '@storybook/angular';
import { StatsRowOrganism } from './stats-row.organism';
import { StatModel } from '../../../core/models';

const mockStats: StatModel[] = [
  {
    icon: 'plane',
    value: '1,234',
    label: 'Voos Pesquisados',
    trend: 'up',
    trendValue: '+12%',
  },
  {
    icon: 'price',
    value: 'R$ 450',
    label: 'Menor Preço',
    trend: 'down',
    trendValue: '-5%',
  },
  {
    icon: 'star',
    value: '89',
    label: 'Favoritos',
  },
  {
    icon: 'user',
    value: '3.2K',
    label: 'Usuários Ativos',
    trend: 'up',
    trendValue: '+18%',
  },
];

const meta: Meta<StatsRowOrganism> = {
  title: 'Design System/Organisms/StatsRow',
  component: StatsRowOrganism,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<StatsRowOrganism>;

export const FourStats: Story = {
  args: {
    stats: mockStats,
  },
};

export const ThreeStats: Story = {
  args: {
    stats: mockStats.slice(0, 3),
  },
};

export const TwoStats: Story = {
  args: {
    stats: mockStats.slice(0, 2),
  },
};

export const WithTrends: Story = {
  args: {
    stats: [
      { icon: 'arrow-up', value: '2.5K', label: 'Crescimento', trend: 'up', trendValue: '+25%' },
      { icon: 'arrow-down', value: 'R$ 320', label: 'Economia', trend: 'down', trendValue: '-15%' },
    ],
  },
};
