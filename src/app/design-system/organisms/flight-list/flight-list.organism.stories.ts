import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FlightListOrganism } from './flight-list.organism';
import { FlightModel } from '../../../core/models';

// Mock flights data
const createMockFlight = (id: string, airline: 'azul' | 'gol' | 'latam', price: number): FlightModel => ({
  id,
  airline,
  origin: 'GRU',
  destination: 'GIG',
  departureTime: '08:00',
  arrivalTime: '09:15',
  duration: '1h 15min',
  price,
  benefits: {
    baggage: true,
    meal: airline === 'azul',
    wifi: airline !== 'gol',
    entertainment: true,
    seatSelection: airline === 'latam',
  },
  stops: 0,
});

const mockFlights: FlightModel[] = [
  createMockFlight('1', 'azul', 450),
  createMockFlight('2', 'gol', 380),
  createMockFlight('3', 'latam', 520),
  createMockFlight('4', 'azul', 410),
  createMockFlight('5', 'gol', 395),
];

const manyFlights: FlightModel[] = Array.from({ length: 15 }, (_, i) => {
  const airlines: Array<'azul' | 'gol' | 'latam'> = ['azul', 'gol', 'latam'];
  const airline = airlines[i % 3];
  return createMockFlight(`${i + 1}`, airline, 300 + i * 20);
});

const meta: Meta<FlightListOrganism> = {
  title: 'Design System/Organisms/FlightList',
  component: FlightListOrganism,
  tags: ['autodocs'],
  args: {
    sortChange: fn(),
    loadMore: fn(),
    flightSelect: fn(),
  },
};

export default meta;
type Story = StoryObj<FlightListOrganism>;

export const WithResults: Story = {
  args: {
    flights: mockFlights,
    totalCount: mockFlights.length,
    loading: false,
    sortBy: 'price',
    hasMore: false,
  },
};

export const Loading: Story = {
  args: {
    flights: [],
    totalCount: 0,
    loading: true,
    sortBy: 'price',
    hasMore: false,
  },
};

export const Empty: Story = {
  args: {
    flights: [],
    totalCount: 0,
    loading: false,
    sortBy: 'price',
    hasMore: false,
  },
};

export const SortedByPrice: Story = {
  args: {
    flights: mockFlights,
    totalCount: mockFlights.length,
    loading: false,
    sortBy: 'price',
    hasMore: false,
  },
};

export const SortedByDuration: Story = {
  args: {
    flights: mockFlights,
    totalCount: mockFlights.length,
    loading: false,
    sortBy: 'duration',
    hasMore: false,
  },
};

export const Paginated: Story = {
  args: {
    flights: mockFlights,
    totalCount: 25,
    loading: false,
    sortBy: 'price',
    hasMore: true,
  },
};

export const LoadingMore: Story = {
  args: {
    flights: mockFlights,
    totalCount: 25,
    loading: true,
    sortBy: 'price',
    hasMore: true,
  },
};

export const ManyFlights: Story = {
  args: {
    flights: manyFlights,
    totalCount: manyFlights.length,
    loading: false,
    sortBy: 'price',
    hasMore: false,
  },
};

export const WithSelected: Story = {
  args: {
    flights: mockFlights,
    totalCount: mockFlights.length,
    loading: false,
    sortBy: 'price',
    hasMore: false,
    selectedFlightId: '2',
  },
};
