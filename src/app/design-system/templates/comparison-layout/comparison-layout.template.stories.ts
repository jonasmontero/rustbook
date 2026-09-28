import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { ComparisonLayoutTemplate, ComparisonTab } from './comparison-layout.template';

const meta: Meta<ComparisonLayoutTemplate> = {
  title: 'Design System/Templates/ComparisonLayout',
  component: ComparisonLayoutTemplate,
  tags: ['autodocs'],
  args: {
    tabChange: fn(),
    userClick: fn(),
    menuClick: fn(),
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# ComparisonLayoutTemplate

Template para páginas de comparação com navegação por tabs.

## Características
-  Header com perfil do usuário
-  Seção de título e subtítulo
-  Navegação por tabs sticky (Preços, Benefícios, Histórico)
-  Content slots nomeados para cada tab
-  Transições suaves entre tabs
-  Layout responsivo com tabs scrolláveis em mobile

## Uso
\`\`\`html
<template-comparison-layout
  [activeTab]="currentTab"
  [title]="'Comparação: GRU → GIG'"
  [subtitle]="'3 voos selecionados'"
  (tabChange)="handleTabChange($event)">

  <!-- Tab Preços -->
  <div prices>
    <organism-price-chart [data]="priceHistory" />
  </div>

  <!-- Tab Benefícios -->
  <div benefits>
    <organism-benefits-grid [benefits]="allBenefits" />
  </div>

  <!-- Tab Histórico -->
  <div history>
    <organism-comparison-table [flights]="selectedFlights" />
  </div>
</template-comparison-layout>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ComparisonLayoutTemplate>;

export const PricesTab: Story = {
  args: {
    activeTab: 'prices' as ComparisonTab,
    title: 'Comparação de Voos',
    subtitle: 'GRU → GIG • 3 voos selecionados',
    userName: 'João Silva',
  },
  render: (args) => ({
    props: args,
    template: `
      <template-comparison-layout
        [activeTab]="activeTab"
        [title]="title"
        [subtitle]="subtitle"
        [userName]="userName"
        (tabChange)="tabChange($event)"
        (userClick)="userClick()"
        (menuClick)="menuClick()">

        <div prices style="padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h2 style="margin: 0 0 1rem 0; color: #0F172A; font-size: 20px; font-weight: 600;">
             Comparação de Preços
          </h2>
          <p style="margin: 0; color: #64748B; line-height: 1.6;">
            Gráfico de histórico de preços dos últimos 90 dias para as 3 companhias selecionadas.
          </p>
          <div style="margin-top: 2rem; padding: 3rem; background: #F8FAFC; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #94A3B8;">Aqui seria exibido o PriceChartOrganism</p>
          </div>
        </div>

        <div benefits></div>
        <div history></div>
      </template-comparison-layout>
    `,
  }),
};

export const BenefitsTab: Story = {
  args: {
    activeTab: 'benefits' as ComparisonTab,
    title: 'Comparação de Voos',
    subtitle: 'GRU → GIG • 3 voos selecionados',
    userName: 'Maria Santos',
  },
  render: (args) => ({
    props: args,
    template: `
      <template-comparison-layout
        [activeTab]="activeTab"
        [title]="title"
        [subtitle]="subtitle"
        [userName]="userName"
        (tabChange)="tabChange($event)">

        <div prices></div>

        <div benefits style="padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h2 style="margin: 0 0 1rem 0; color: #0F172A; font-size: 20px; font-weight: 600;">
            ⭐ Comparação de Benefícios
          </h2>
          <p style="margin: 0 0 1.5rem 0; color: #64748B; line-height: 1.6;">
            Compare os benefícios inclusos em cada companhia aérea.
          </p>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
            <div style="padding: 1.5rem; background: #EFF6FF; border: 2px solid #2563EB; border-radius: 8px;">
              <h3 style="margin: 0 0 1rem 0; color: #1E40AF; font-size: 16px;">Azul</h3>
              <ul style="margin: 0; padding-left: 1.5rem; color: #475569;">
                <li>Bagagem 23kg </li>
                <li>Refeição </li>
                <li>Wi-Fi </li>
                <li>Entretenimento </li>
              </ul>
            </div>

            <div style="padding: 1.5rem; background: #FFF0E6; border: 2px solid #FF6600; border-radius: 8px;">
              <h3 style="margin: 0 0 1rem 0; color: #C2410C; font-size: 16px;">Gol</h3>
              <ul style="margin: 0; padding-left: 1.5rem; color: #475569;">
                <li>Bagagem 20kg </li>
                <li>Refeição </li>
                <li>Wi-Fi </li>
                <li>Entretenimento </li>
              </ul>
            </div>

            <div style="padding: 1.5rem; background: #FCE8EB; border: 2px solid #E31837; border-radius: 8px;">
              <h3 style="margin: 0 0 1rem 0; color: #BE123C; font-size: 16px;">Latam</h3>
              <ul style="margin: 0; padding-left: 1.5rem; color: #475569;">
                <li>Bagagem 25kg </li>
                <li>Refeição </li>
                <li>Wi-Fi </li>
                <li>Entretenimento </li>
              </ul>
            </div>
          </div>
        </div>

        <div history></div>
      </template-comparison-layout>
    `,
  }),
};

export const HistoryTab: Story = {
  args: {
    activeTab: 'history' as ComparisonTab,
    title: 'Comparação de Voos',
    subtitle: 'GRU → GIG • 3 voos selecionados',
    userName: 'Carlos Oliveira',
  },
  render: (args) => ({
    props: args,
    template: `
      <template-comparison-layout
        [activeTab]="activeTab"
        [title]="title"
        [subtitle]="subtitle"
        [userName]="userName"
        (tabChange)="tabChange($event)">

        <div prices></div>
        <div benefits></div>

        <div history style="padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h2 style="margin: 0 0 1rem 0; color: #0F172A; font-size: 20px; font-weight: 600;">
             Tabela Comparativa
          </h2>
          <p style="margin: 0 0 1.5rem 0; color: #64748B; line-height: 1.6;">
            Compare lado a lado as características de cada voo.
          </p>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #F8FAFC; border-bottom: 2px solid #E2E8F0;">
                  <th style="padding: 1rem; text-align: left; font-weight: 600; color: #475569;"></th>
                  <th style="padding: 1rem; text-align: center; font-weight: 600; color: #0033A0;">Azul</th>
                  <th style="padding: 1rem; text-align: center; font-weight: 600; color: #FF6600;">Gol</th>
                  <th style="padding: 1rem; text-align: center; font-weight: 600; color: #E31837;">Latam</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #E2E8F0;">
                  <td style="padding: 1rem; font-weight: 600; color: #475569;">Preço</td>
                  <td style="padding: 1rem; text-align: center;">R$ 450</td>
                  <td style="padding: 1rem; text-align: center;">R$ 380</td>
                  <td style="padding: 1rem; text-align: center;">R$ 520</td>
                </tr>
                <tr style="border-bottom: 1px solid #E2E8F0;">
                  <td style="padding: 1rem; font-weight: 600; color: #475569;">Horário</td>
                  <td style="padding: 1rem; text-align: center;">08:00 - 09:15</td>
                  <td style="padding: 1rem; text-align: center;">10:30 - 11:45</td>
                  <td style="padding: 1rem; text-align: center;">14:00 - 15:15</td>
                </tr>
                <tr>
                  <td style="padding: 1rem; font-weight: 600; color: #475569;">Duração</td>
                  <td style="padding: 1rem; text-align: center;">1h 15min</td>
                  <td style="padding: 1rem; text-align: center;">1h 15min</td>
                  <td style="padding: 1rem; text-align: center;">1h 15min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template-comparison-layout>
    `,
  }),
};

export const WithoutSubtitle: Story = {
  args: {
    activeTab: 'prices' as ComparisonTab,
    title: 'Comparação de Voos',
    subtitle: undefined,
    userName: 'Ana Paula',
  },
  render: (args) => ({
    props: args,
    template: `
      <template-comparison-layout
        [activeTab]="activeTab"
        [title]="title"
        [userName]="userName">

        <div prices style="padding: 2rem; background: white; border-radius: 12px;">
          <p style="margin: 0; color: #64748B;">Conteúdo da tab Preços</p>
        </div>

        <div benefits></div>
        <div history></div>
      </template-comparison-layout>
    `,
  }),
};
