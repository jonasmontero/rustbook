import type { Meta, StoryObj } from '@storybook/angular';
import { BenefitsGridOrganism, AirlineBenefits } from './benefits-grid.organism';

const mockBenefits: AirlineBenefits[] = [
  {
    airline: 'azul',
    items: [
      { icon: 'baggage', text: 'Baggage 23kg', included: true },
      { icon: 'meal', text: 'Meal completa', included: true },
      { icon: 'wifi', text: 'Wi-Fi grátis', included: false },
      { icon: 'entertainment', text: 'Entretenimento', included: true },
      { icon: 'seat', text: 'Escolha de assento', included: true },
    ],
  },
  {
    airline: 'gol',
    items: [
      { icon: 'baggage', text: 'Baggage 20kg', included: true },
      { icon: 'meal', text: 'Snack', included: false },
      { icon: 'wifi', text: 'Wi-Fi premium', included: true },
      { icon: 'entertainment', text: 'Streaming', included: false },
      { icon: 'seat', text: 'Escolha básica', included: false },
    ],
  },
  {
    airline: 'latam',
    items: [
      { icon: 'baggage', text: 'Baggage 25kg', included: true },
      { icon: 'meal', text: 'Menu executivo', included: true },
      { icon: 'wifi', text: 'Wi-Fi ilimitado', included: true },
      { icon: 'entertainment', text: 'Sistema IFE', included: true },
      { icon: 'seat', text: 'Escolha premium', included: true },
    ],
  },
];

const meta: Meta<BenefitsGridOrganism> = {
  title: 'Design System/Organisms/BenefitsGrid',
  component: BenefitsGridOrganism,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<BenefitsGridOrganism>;

export const AllAirlines: Story = {
  args: { benefits: mockBenefits },
};

export const TwoAirlines: Story = {
  args: { benefits: mockBenefits.slice(0, 2) },
};

export const SingleAirline: Story = {
  args: { benefits: mockBenefits.slice(0, 1) },
};
