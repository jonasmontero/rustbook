import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { SearchFormOrganism } from './search-form.organism';
import { SearchFormModel } from '../../../core/models';

const meta: Meta<SearchFormOrganism> = {
  title: 'Design System/Organisms/SearchForm',
  component: SearchFormOrganism,
  tags: ['autodocs'],
  args: {
    search: fn(),
  },
};

export default meta;
type Story = StoryObj<SearchFormOrganism>;

export const Empty: Story = {
  args: {
    loading: false,
  },
};

export const Filled: Story = {
  args: {
    initialValues: {
      origin: 'GRU',
      destination: 'GIG',
      departureDate: new Date('2026-02-15'),
      returnDate: new Date('2026-02-22'),
      passengers: {
        adults: 2,
        children: 1,
        infants: 0,
      },
      tripType: 'roundtrip',
    },
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    initialValues: {
      origin: 'GRU',
      destination: 'SSA',
      departureDate: new Date('2026-03-10'),
      passengers: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      tripType: 'oneway',
    },
    loading: true,
  },
};

export const OneWay: Story = {
  args: {
    initialValues: {
      origin: 'GRU',
      destination: 'REC',
      departureDate: new Date('2026-04-01'),
      passengers: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      tripType: 'oneway',
    },
    loading: false,
  },
};

export const WithFamily: Story = {
  args: {
    initialValues: {
      origin: 'GRU',
      destination: 'FOR',
      departureDate: new Date('2026-07-15'),
      returnDate: new Date('2026-07-29'),
      passengers: {
        adults: 2,
        children: 2,
        infants: 1,
      },
      tripType: 'roundtrip',
    },
    loading: false,
  },
};
