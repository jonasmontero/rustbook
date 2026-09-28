import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { SidebarOrganism } from './sidebar.organism';

const meta: Meta<SidebarOrganism> = {
  title: 'Design System/Organisms/Sidebar',
  component: SidebarOrganism,
  tags: ['autodocs'],
  args: {
    navigate: fn(),
    toggleCollapse: fn(),
  },
};

export default meta;
type Story = StoryObj<SidebarOrganism>;

export const Expanded: Story = {
  args: {
    collapsed: false,
    activeRoute: "/dashboard",
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    activeRoute: '/search',
  },
};

export const WithActiveRoute: Story = {
  args: {
    collapsed: false,
    activeRoute: '/compare',
  },
};

export const CustomMenu: Story = {
  args: {
    collapsed: false,
    activeRoute: '/home',
    menuItems: [
      { id: '1', label: 'Home', icon: 'home', route: '/home' },
      { id: '2', label: 'Favoritos', icon: 'star', route: '/favorites' },
      { id: '3', label: 'Configurações', icon: 'settings', route: '/settings' },
    ],
  },
};
