import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FlightCardOrganism } from './flight-card.organism';
import { FlightModel } from '../../../core/models';

// Mock data
const mockFlightAzul: FlightModel = {
  id: '1',
  airline: 'azul',
  origin: 'GRU',
  destination: 'GIG',
  departureTime: '08:00',
  arrivalTime: '09:15',
  duration: '1h 15min',
  price: 450,
  benefits: {
    baggage: true,
    meal: true,
    wifi: false,
    entertainment: true,
    seatSelection: true,
  },
  stops: 0,
};

const mockFlightGol: FlightModel = {
  id: '2',
  airline: 'gol',
  origin: 'GRU',
  destination: 'GIG',
  departureTime: '10:30',
  arrivalTime: '11:45',
  duration: '1h 15min',
  price: 380,
  originalPrice: 520,
  benefits: {
    baggage: true,
    meal: false,
    wifi: true,
    entertainment: false,
    seatSelection: false,
  },
  stops: 0,
  seatsLeft: 3,
};

const mockFlightLatam: FlightModel = {
  id: '3',
  airline: 'latam',
  origin: 'GRU',
  destination: 'SSA',
  departureTime: '14:00',
  arrivalTime: '17:30',
  duration: '3h 30min',
  price: 680,
  benefits: {
    baggage: true,
    meal: true,
    wifi: true,
    entertainment: true,
    seatSelection: true,
  },
  stops: 1,
};

const meta: Meta<FlightCardOrganism> = {
  title: 'Design System/Organisms/FlightCard',
  component: FlightCardOrganism,
  tags: ['autodocs'],
  args: {
    select: fn(),
    details: fn(),
  },
};

export default meta;
type Story = StoryObj<FlightCardOrganism>;

export const Default: Story = {
  args: {
    flight: mockFlightAzul,
    selected: false,
    compact: false,
  },
};

export const Selected: Story = {
  args: {
    flight: mockFlightAzul,
    selected: true,
    compact: false,
  },
};

export const Compact: Story = {
  args: {
    flight: mockFlightAzul,
    selected: false,
    compact: true,
  },
};

export const WithDiscount: Story = {
  args: {
    flight: mockFlightGol,
    selected: false,
    compact: false,
  },
};

export const WithStops: Story = {
  args: {
    flight: mockFlightLatam,
    selected: false,
    compact: false,
  },
};

export const LowSeats: Story = {
  args: {
    flight: mockFlightGol,
    selected: false,
    compact: false,
  },
};

export const CompactSelected: Story = {
  args: {
    flight: mockFlightGol,
    selected: true,
    compact: true,
  },
};

export const ByAirlineAzul: Story = {
  args: {
    flight: mockFlightAzul,
  },
};

export const ByAirlineGol: Story = {
  args: {
    flight: mockFlightGol,
  },
};

export const ByAirlineLatam: Story = {
  args: {
    flight: mockFlightLatam,
  },
};
