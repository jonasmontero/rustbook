import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { HeaderOrganism } from './header.organism';

const meta: Meta<HeaderOrganism> = {
  title: 'Design System/Organisms/Header',
  component: HeaderOrganism,
  tags: ['autodocs'],
  args: {
    menuClick: fn(),
    searchSubmit: fn(),
    userClick: fn(),
  },
};

export default meta;
type Story = StoryObj<HeaderOrganism>;

export const WithSearch: Story = {
  args: {
    showSearch: true,
    userName: 'João Silva',
  },
};

export const WithoutSearch: Story = {
  args: {
    showSearch: false,
    userName: 'João Silva',
  },
};

export const WithAvatar: Story = {
  args: {
    showSearch: true,
    userName: 'Maria Santos',
    userAvatar: 'https://i.pravatar.cc/100?img=5',
  },
};

export const Mobile: Story = {
  args: {
    showSearch: true,
    userName: 'Carlos',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
