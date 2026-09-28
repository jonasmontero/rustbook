import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PriceChartOrganism } from './price-chart.organism';
import { PriceHistoryModel } from '../../../core/models';

// Generate mock data
const generate7DaysData = (): PriceHistoryModel[] => {
  const data: PriceHistoryModel[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date,
      prices: {
        azul: 400 + Math.random() * 100,
        gol: 350 + Math.random() * 100,
        latam: 450 + Math.random() * 100,
      },
    });
  }

  return data;
};

const generate30DaysData = (): PriceHistoryModel[] => {
  const data: PriceHistoryModel[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date,
      prices: {
        azul: 380 + Math.random() * 150 + Math.sin(i / 5) * 50,
        gol: 330 + Math.random() * 120 + Math.sin(i / 5) * 40,
        latam: 420 + Math.random() * 170 + Math.sin(i / 5) * 60,
      },
    });
  }

  return data;
};

const generate90DaysData = (): PriceHistoryModel[] => {
  const data: PriceHistoryModel[] = [];
  const today = new Date();

  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const seasonFactor = Math.sin((i / 90) * Math.PI) * 100;

    data.push({
      date,
      prices: {
        azul: 400 + Math.random() * 150 + seasonFactor,
        gol: 350 + Math.random() * 120 + seasonFactor,
        latam: 450 + Math.random() * 170 + seasonFactor,
      },
    });
  }

  return data;
};

const meta: Meta<PriceChartOrganism> = {
  title: 'Design System/Organisms/PriceChart',
  component: PriceChartOrganism,
  tags: ['autodocs'],
  args: {
    periodChange: fn(),
  },
};

export default meta;
type Story = StoryObj<PriceChartOrganism>;

export const LineChart7Days: Story = {
  args: {
    data: generate7DaysData(),
    period: '7d',
  },
};

export const LineChart30Days: Story = {
  args: {
    data: generate30DaysData(),
    period: '30d',
  },
};

export const LineChart90Days: Story = {
  args: {
    data: generate90DaysData(),
    period: '90d',
  },
};

export const WithSingleAirline: Story = {
  args: {
    data: generate7DaysData().map(d => ({
      ...d,
      prices: { azul: d.prices.azul, gol: 0, latam: 0 },
    })),
    period: '7d',
  },
};

export const Empty: Story = {
  args: {
    data: [],
    period: '7d',
  },
};

export const PriceIncreaseTrend: Story = {
  args: {
    data: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000),
      prices: {
        azul: 300 + i * 30,
        gol: 280 + i * 25,
        latam: 320 + i * 35,
      },
    })),
    period: '7d',
  },
};

export const PriceDecreaseTrend: Story = {
  args: {
    data: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000),
      prices: {
        azul: 500 - i * 30,
        gol: 480 - i * 25,
        latam: 520 - i * 35,
      },
    })),
    period: '7d',
  },
};
