import type { Meta, StoryObj } from '@storybook/angular';
import { SearchPageComponent } from './search-page.component';

const meta: Meta<SearchPageComponent> = {
  title: 'Design System/Pages/SearchPage',
  component: SearchPageComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# SearchPageComponent

Página de resultados de busca de voos com filtros e ordenação.

## Features
-  SearchResultsLayout com formulário sticky
-  Filters laterais (companhias, preço, stops)
-  Lista de voos ordenável (preço, duração, horário)
-  12 voos mock com dados variados
-  Filters funcionais em tempo real
-  Indicador de flight selected
-  Responsive layout com drawer de filtros em mobile

## Components Used
- SearchResultsLayoutTemplate
- FlightListOrganism
- Filters customizados (checkboxes, range slider)

## Functionality
- Filtrar por companhia aérea (múltipla seleção)
- Filtrar por faixa de preço (slider)
- Filtrar apenas voos diretos
- Sort by preço, duração ou horário
- Select voos para comparação
- Nova busca através do formulário sticky

## Dados Mock
- 12 voos variados (Azul, Gol, Latam)
- Prices de R$ 280 a R$ 540
- Voos diretos e com escalas
- Diferentes horários ao longo do dia
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<SearchPageComponent>;

export const Default: Story = {
  args: {},
};

export const WithoutFilters: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, showFilters: false },
    template: '<page-search [showFilters]="showFilters" />',
  }),
};

export const Loading: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, loading: true },
    template: '<page-search [loading]="loading" />',
  }),
};

export const FilteredByPrice: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, maxPrice: 400 },
    template: '<page-search [maxPrice]="maxPrice" />',
  }),
};

export const DirectFlightsOnly: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, directOnly: true },
    template: '<page-search [directOnly]="directOnly" />',
  }),
};
