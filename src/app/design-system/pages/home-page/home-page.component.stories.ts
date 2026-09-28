import type { Meta, StoryObj } from '@storybook/angular';
import { HomePageComponent } from './home-page.component';

const meta: Meta<HomePageComponent> = {
  title: 'Design System/Pages/HomePage',
  component: HomePageComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HomePageComponent

Página inicial do SkyCompare com dashboard completo.

## Features
-  Dashboard layout com sidebar e header
-  Cards de estatísticas (voos pesquisados, menor preço, favoritos)
-  Formulário de busca completo
-  Gráfico de histórico de preços (30 dias)
-  Calendário sazonal (12 meses)
-  Lista de melhores ofertas
-  Dados mock realistas
-  Layout totalmente responsivo

## Components Used
- DashboardLayoutTemplate
- StatsRowOrganism
- SearchFormOrganism
- PriceChartOrganism
- SeasonCalendarOrganism
- FlightListOrganism

## Dados Mock
Todos os dados são gerados automaticamente:
- 4 estatísticas com tendências
- 3 voos com preços e benefícios
- 30 dias de histórico de preços
- 12 meses de dados sazonais
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HomePageComponent>;

export const Default: Story = {
  args: {},
};

export const CollapsedSidebar: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, sidebarCollapsed: true },
    template: '<page-home [sidebarCollapsed]="sidebarCollapsed" />',
  }),
};

export const Loading: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, loading: true },
    template: '<page-home [loading]="loading" />',
  }),
};
