import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { SeasonCalendarOrganism } from './season-calendar.organism';
import { SeasonDataModel } from '../../../core/models';

const mockSeasonData: SeasonDataModel[] = [
  { month: 1, season: 'high', avgPrice: 650 },
  { month: 2, season: 'high', avgPrice: 680 },
  { month: 3, season: 'low', avgPrice: 380 },
  { month: 4, season: 'low', avgPrice: 350 },
  { month: 5, season: 'low', avgPrice: 340 },
  { month: 6, season: 'medium', avgPrice: 450 },
  { month: 7, season: 'high', avgPrice: 720 },
  { month: 8, season: 'medium', avgPrice: 480 },
  { month: 9, season: 'low', avgPrice: 360 },
  { month: 10, season: 'low', avgPrice: 370 },
  { month: 11, season: 'medium', avgPrice: 500 },
  { month: 12, season: 'high', avgPrice: 750 },
];

const meta: Meta<SeasonCalendarOrganism> = {
  title: 'Design System/Organisms/SeasonCalendar',
  component: SeasonCalendarOrganism,
  tags: ['autodocs'],
  args: {
    monthClick: fn(),
  },
};

export default meta;
type Story = StoryObj<SeasonCalendarOrganism>;

export const FullYear: Story = {
  args: {
    seasonData: mockSeasonData,
    year: 2026,
  },
};

export const FirstHalf: Story = {
  args: {
    seasonData: mockSeasonData.slice(0, 6),
    year: 2026,
  },
};

export const Empty: Story = {
  args: {
    seasonData: [],
    year: 2026,
  },
};

export const OnlyLowSeason: Story = {
  args: {
    seasonData: mockSeasonData.map(d => ({ ...d, season: 'low' as const })),
    year: 2026,
  },
};

export const OnlyHighSeason: Story = {
  args: {
    seasonData: mockSeasonData.map(d => ({ ...d, season: 'high' as const })),
    year: 2026,
  },
};
