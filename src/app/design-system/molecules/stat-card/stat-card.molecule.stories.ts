import type { Meta, StoryObj } from '@storybook/angular';
import { StatCardMolecule } from './stat-card.molecule';

const meta: Meta<StatCardMolecule> = {
  title: 'Design System/Molecules/StatCard',
  component: StatCardMolecule,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<StatCardMolecule>;

export const Default: Story = {
  args: { icon: 'plane', value: '1,234', label: 'Voos encontrados' },
};
