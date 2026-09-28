import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { DashboardLayoutTemplate } from './dashboard-layout.template';
import { StatModel } from '../../../core/models';

const mockStats: StatModel[] = [
  { icon: 'plane', value: '1,234', label: 'Voos Pesquisados', trend: 'up', trendValue: '+12%' },
  { icon: 'price', value: 'R$ 450', label: 'Lowest Price', trend: 'down', trendValue: '-5%' },
  { icon: 'star', value: '89', label: 'Favoritos' },
  { icon: 'user', value: '3.2K', label: 'Users Ativos', trend: 'up', trendValue: '+18%' },
];

const meta: Meta<DashboardLayoutTemplate> = {
  title: 'Design System/Templates/DashboardLayout',
  component: DashboardLayoutTemplate,
  tags: ['autodocs'],
  args: {
    sidebarToggle: fn(),
    menuClick: fn(),
    navigate: fn(),
    userClick: fn(),
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# DashboardLayoutTemplate

Template principal para páginas de dashboard com sidebar, header, stats e área de conteúdo.

## Features
-  Sidebar responsiva com collapse
-  Header sticky com busca e perfil
-  Stats row para métricas principais
-  Área de conteúdo com projeção via ng-content
-  Responsive layout (mobile, tablet, desktop)

## Uso
\`\`\`html
<template-dashboard-layout
  [sidebarCollapsed]="false"
  [stats]="dashboardStats"
  [userName]="'João Silva'"
  [activeRoute]="'/dashboard'"
  (sidebarToggle)="handleToggle()">

  <!-- Seu conteúdo aqui -->
  <div>
    <h1>Dashboard Content</h1>
  </div>
</template-dashboard-layout>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DashboardLayoutTemplate>;

export const Default: Story = {
  args: {
    sidebarCollapsed: false,
    stats: mockStats,
    userName: 'João Silva',
    activeRoute: '/dashboard',
  },
  render: (args) => ({
    props: args,
    template: `
      <template-dashboard-layout
        [sidebarCollapsed]="sidebarCollapsed"
        [stats]="stats"
        [userName]="userName"
        [activeRoute]="activeRoute"
        (sidebarToggle)="sidebarToggle()"
        (menuClick)="menuClick()"
        (navigate)="navigate($event)"
        (userClick)="userClick()">

        <div style="padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h1 style="margin: 0 0 1rem 0; color: #0F172A; font-size: 24px; font-weight: 600;">
            Bem-vindo ao Dashboard
          </h1>
          <p style="margin: 0; color: #475569; line-height: 1.6;">
            Este é o conteúdo principal projetado via ng-content.
            Você pode adicionar qualquer componente aqui: gráficos, tabelas, cards, etc.
          </p>
        </div>
      </template-dashboard-layout>
    `,
  }),
};

export const CollapsedSidebar: Story = {
  args: {
    sidebarCollapsed: true,
    stats: mockStats,
    userName: 'Maria Santos',
    activeRoute: '/search',
  },
  render: (args) => ({
    props: args,
    template: `
      <template-dashboard-layout
        [sidebarCollapsed]="sidebarCollapsed"
        [stats]="stats"
        [userName]="userName"
        [activeRoute]="activeRoute">

        <div style="padding: 2rem; background: white; border-radius: 12px;">
          <h2 style="margin: 0;">Sidebar Colapsada</h2>
          <p style="margin-top: 1rem; color: #64748B;">
            A sidebar está em modo compacto, mostrando apenas ícones.
          </p>
        </div>
      </template-dashboard-layout>
    `,
  }),
};

export const WithoutStats: Story = {
  args: {
    sidebarCollapsed: false,
    stats: [],
    userName: 'Carlos Oliveira',
    activeRoute: '/compare',
  },
  render: (args) => ({
    props: args,
    template: `
      <template-dashboard-layout
        [sidebarCollapsed]="sidebarCollapsed"
        [stats]="stats"
        [userName]="userName"
        [activeRoute]="activeRoute">

        <div style="padding: 2rem; background: white; border-radius: 12px;">
          <h2 style="margin: 0;">Layout Sem Stats</h2>
          <p style="margin-top: 1rem; color: #64748B;">
            Quando stats está vazio, a seção não é renderizada.
          </p>
        </div>
      </template-dashboard-layout>
    `,
  }),
};

export const WithComplexContent: Story = {
  args: {
    sidebarCollapsed: false,
    stats: mockStats,
    userName: 'Ana Paula',
    activeRoute: '/dashboard',
  },
  render: (args) => ({
    props: args,
    template: `
      <template-dashboard-layout
        [sidebarCollapsed]="sidebarCollapsed"
        [stats]="stats"
        [userName]="userName"
        [activeRoute]="activeRoute">

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
          <div style="padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="margin: 0 0 1rem 0; color: #0F172A;">Card 1</h3>
            <p style="margin: 0; color: #64748B;">Conteúdo do primeiro card</p>
          </div>

          <div style="padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="margin: 0 0 1rem 0; color: #0F172A;">Card 2</h3>
            <p style="margin: 0; color: #64748B;">Conteúdo do segundo card</p>
          </div>

          <div style="padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="margin: 0 0 1rem 0; color: #0F172A;">Card 3</h3>
            <p style="margin: 0; color: #64748B;">Conteúdo do terceiro card</p>
          </div>
        </div>
      </template-dashboard-layout>
    `,
  }),
};
