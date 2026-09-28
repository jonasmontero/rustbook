import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { SearchResultsLayoutTemplate } from './search-results-layout.template';
import { SearchFormModel } from '../../../core/models';

const mockSearchValues: SearchFormModel = {
  origin: 'GRU',
  destination: 'GIG',
  departureDate: new Date('2026-02-15'),
  returnDate: new Date('2026-02-22'),
  passengers: { adults: 2, children: 0, infants: 0 },
  tripType: 'roundtrip',
};

const meta: Meta<SearchResultsLayoutTemplate> = {
  title: 'Design System/Templates/SearchResultsLayout',
  component: SearchResultsLayoutTemplate,
  tags: ['autodocs'],
  args: {
    searchSubmit: fn(),
    userClick: fn(),
    menuClick: fn(),
    filtersToggle: fn(),
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# SearchResultsLayoutTemplate

Template para páginas de resultados de busca com formulário sticky e filtros laterais.

## Features
-  Header with user profile
-  SearchForm sticky (permanece visível ao rolar)
-  Filters laterais colapsáveis (opcional)
-  Área principal para resultados (ng-content)
-  Responsive layout com filtros em drawer mobile

## Uso
\`\`\`html
<template-search-results-layout
  [showFilters]="true"
  [searchValues]="currentSearch"
  [loading]="isSearching"
  (searchSubmit)="handleNewSearch($event)">

  <!-- Filters (opcional) -->
  <div filters>
    <h4>Price</h4>
    <input type="range" min="0" max="2000" />
  </div>

  <!-- Results -->
  <organism-flight-list [flights]="searchResults" />
</template-search-results-layout>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<SearchResultsLayoutTemplate>;

export const Default: Story = {
  args: {
    showFilters: true,
    searchValues: mockSearchValues,
    loading: false,
    userName: 'João Silva',
  },
  render: (args) => ({
    props: args,
    template: `
      <template-search-results-layout
        [showFilters]="showFilters"
        [searchValues]="searchValues"
        [loading]="loading"
        [userName]="userName"
        (searchSubmit)="searchSubmit($event)"
        (userClick)="userClick()"
        (menuClick)="menuClick()"
        (filtersToggle)="filtersToggle()">

        <!-- Filters -->
        <div filters style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <h4 style="margin: 0 0 0.5rem 0; font-size: 14px; font-weight: 600;">Airlines</h4>
            <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <input type="checkbox" checked /> Azul
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <input type="checkbox" checked /> Gol
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked /> Latam
            </label>
          </div>

          <div>
            <h4 style="margin: 0 0 0.5rem 0; font-size: 14px; font-weight: 600;">Price Range</h4>
            <p style="margin: 0 0 0.5rem 0; font-size: 12px; color: #64748B;">R$ 200 - R$ 1500</p>
            <input type="range" min="200" max="2000" value="1500" style="width: 100%;" />
          </div>

          <div>
            <h4 style="margin: 0 0 0.5rem 0; font-size: 14px; font-weight: 600;">Stops</h4>
            <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <input type="checkbox" checked /> Direct
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" /> Com escalas
            </label>
          </div>
        </div>

        <!-- Results -->
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="margin: 0;">15 flights found</h3>
          </div>

          <div style="padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <p style="margin: 0; color: #64748B;">Voo 1 - Azul - GRU → GIG - R$ 450</p>
          </div>

          <div style="padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <p style="margin: 0; color: #64748B;">Voo 2 - Gol - GRU → GIG - R$ 380</p>
          </div>

          <div style="padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <p style="margin: 0; color: #64748B;">Voo 3 - Latam - GRU → GIG - R$ 520</p>
          </div>
        </div>
      </template-search-results-layout>
    `,
  }),
};

export const WithoutFilters: Story = {
  args: {
    showFilters: false,
    searchValues: mockSearchValues,
    loading: false,
    userName: 'Maria Santos',
  },
  render: (args) => ({
    props: args,
    template: `
      <template-search-results-layout
        [showFilters]="showFilters"
        [searchValues]="searchValues"
        [loading]="loading"
        [userName]="userName">

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="padding: 1.5rem; background: white; border-radius: 12px;">
            <h3 style="margin: 0;">Results sem filtros</h3>
            <p style="margin-top: 0.5rem; color: #64748B;">
              Quando showFilters é false, a área de filtros não é renderizada.
            </p>
          </div>
        </div>
      </template-search-results-layout>
    `,
  }),
};

export const Loading: Story = {
  args: {
    showFilters: true,
    searchValues: mockSearchValues,
    loading: true,
    userName: 'Carlos Oliveira',
  },
  render: (args) => ({
    props: args,
    template: `
      <template-search-results-layout
        [showFilters]="showFilters"
        [searchValues]="searchValues"
        [loading]="loading"
        [userName]="userName">

        <div filters>
          <p style="margin: 0; color: #64748B;">Filters</p>
        </div>

        <div style="padding: 2rem; background: white; border-radius: 12px; text-align: center;">
          <p style="margin: 0; color: #64748B;">Carregando resultados...</p>
        </div>
      </template-search-results-layout>
    `,
  }),
};

export const EmptyResults: Story = {
  args: {
    showFilters: true,
    searchValues: mockSearchValues,
    loading: false,
    userName: 'Ana Paula',
  },
  render: (args) => ({
    props: args,
    template: `
      <template-search-results-layout
        [showFilters]="showFilters"
        [searchValues]="searchValues"
        [loading]="loading"
        [userName]="userName">

        <div filters>
          <p style="margin: 0; color: #64748B;">Filters</p>
        </div>

        <div style="padding: 3rem; background: white; border-radius: 12px; text-align: center;">
          <h3 style="margin: 0 0 1rem 0; color: #0F172A;">No flights found</h3>
          <p style="margin: 0; color: #64748B;">
            Tente ajustar seus filtros ou modificar a busca.
          </p>
        </div>
      </template-search-results-layout>
    `,
  }),
};
