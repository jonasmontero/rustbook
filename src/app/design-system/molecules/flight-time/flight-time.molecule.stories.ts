import type { Meta, StoryObj } from '@storybook/angular';
import { FlightTimeMolecule } from './flight-time.molecule';

const meta: Meta<FlightTimeMolecule> = {
  title: 'Design System/Molecules/FlightTime',
  component: FlightTimeMolecule,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<FlightTimeMolecule>;

export const Default: Story = {
  args: { departureTime: '08:30', arrivalTime: '10:45', duration: '2h 15min' },
};
