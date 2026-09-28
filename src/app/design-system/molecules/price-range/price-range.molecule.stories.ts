import type { Meta, StoryObj } from '@storybook/angular';
import { PriceRangeMolecule } from './price-range.molecule';

const meta: Meta<PriceRangeMolecule> = {
  title: 'Design System/Molecules/PriceRange',
  component: PriceRangeMolecule,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<PriceRangeMolecule>;

export const Default: Story = {
  args: { minPrice: 380, maxPrice: 720 },
};

export const WithSavings: Story = {
  args: { minPrice: 380, maxPrice: 720, savingsPercent: 35 },
};

export const SmallRange: Story = {
  args: { minPrice: 450, maxPrice: 520, savingsPercent: 12 },
};

export const LargeRange: Story = {
  args: { minPrice: 280, maxPrice: 1200, savingsPercent: 45 },
};
