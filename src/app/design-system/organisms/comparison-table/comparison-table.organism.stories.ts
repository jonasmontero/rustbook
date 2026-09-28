import type { Meta, StoryObj } from '@storybook/angular';
import { ComparisonTableOrganism } from './comparison-table.organism';
import { FlightModel } from '../../../core/models';

const mockFlights: FlightModel[] = [
  {
    id: '1',
    airline: 'azul',
    origin: 'GRU',
    destination: 'GIG',
    departureTime: '08:00',
    arrivalTime: '09:15',
    duration: '1h 15min',
    price: 450,
    benefits: { baggage: true, meal: true, wifi: false, entertainment: true, seatSelection: true },
    stops: 0,
  },
  {
    id: '2',
    airline: 'gol',
    origin: 'GRU',
    destination: 'GIG',
    departureTime: '10:30',
    arrivalTime: '11:45',
    duration: '1h 15min',
    price: 380,
    benefits: { baggage: true, meal: false, wifi: true, entertainment: false, seatSelection: false },
    stops: 0,
  },
  {
    id: '3',
    airline: 'latam',
    origin: 'GRU',
    destination: 'GIG',
    departureTime: '14:00',
    arrivalTime: '15:15',
    duration: '1h 15min',
    price: 520,
    benefits: { baggage: true, meal: true, wifi: true, entertainment: true, seatSelection: true },
    stops: 0,
  },
];

const meta: Meta<ComparisonTableOrganism> = {
  title: 'Design System/Organisms/ComparisonTable',
  component: ComparisonTableOrganism,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ComparisonTableOrganism>;

export const ThreeFlights: Story = {
  args: { flights: mockFlights },
};

export const TwoFlights: Story = {
  args: { flights: mockFlights.slice(0, 2) },
};

export const OneFlight: Story = {
  args: { flights: mockFlights.slice(0, 1) },
};

export const Empty: Story = {
  args: { flights: [] },
};
