import type { Meta, StoryObj } from '@storybook/angular';
import { PriceTagMolecule } from './price-tag.molecule';

const meta: Meta<PriceTagMolecule> = {
  title: 'Design System/Molecules/PriceTag',
  component: PriceTagMolecule,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<PriceTagMolecule>;

export const Default: Story = {
  args: { price: 450 },
};

export const WithDiscount: Story = {
  args: { price: 450, discount: 15 },
};

export const TrendDown: Story = {
  args: { price: 380, trend: 'down', highlighted: true },
};

export const TrendUp: Story = {
  args: { price: 520, trend: 'up' },
};

export const WithLabel: Story = {
  args: { price: 450, label: 'por pessoa' },
};

export const Complete: Story = {
  args: { price: 380, trend: 'down', discount: 20, label: 'Melhor preço', highlighted: true },
};
