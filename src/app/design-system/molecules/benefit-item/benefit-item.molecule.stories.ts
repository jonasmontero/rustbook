import type { Meta, StoryObj } from '@storybook/angular';
import { BenefitItemMolecule } from './benefit-item.molecule';

const meta: Meta<BenefitItemMolecule> = {
  title: 'Design System/Molecules/BenefitItem',
  component: BenefitItemMolecule,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<BenefitItemMolecule>;

export const Included: Story = {
  args: { text: 'Bagagem de mão', included: true },
};

export const Excluded: Story = {
  args: { text: 'Wi-Fi', included: false },
};
