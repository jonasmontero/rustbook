import type { Meta, StoryObj } from '@storybook/angular';
import { ComparisonPageComponent } from './comparison-page.component';

const meta: Meta<ComparisonPageComponent> = {
  title: 'Design System/Pages/ComparisonPage',
  component: ComparisonPageComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# ComparisonPageComponent

Página de comparação detalhada entre voos selecionados com análise lado a lado.

## Características
-  ComparisonLayoutTemplate com 3 abas
-  Aba "Preços" com gráfico de histórico de 30 dias
-  Aba "Benefícios" com grid comparativo
-  Aba "Histórico" com tabela detalhada
-  3 voos mock selecionados (Azul, Gol, Latam)
-  Insights automáticos de preços
-  Resumo comparativo com recomendações
-  Layout responsivo

## Componentes Usados
- ComparisonLayoutTemplate
- PriceChartOrganism
- BenefitsGridOrganism
- ComparisonTableOrganism

## Funcionalidades
- Comparar até 3 voos lado a lado
- Analisar histórico de preços (30 dias)
- Comparar benefícios de cada companhia
- Ver tabela detalhada de especificações
- Receber recomendações personalizadas
- Navegar entre abas de análise

## Dados Mock
- 3 voos pré-selecionados (um de cada companhia)
- 30 dias de histórico de preços
- 6 benefícios por companhia
- Insights gerados automaticamente
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ComparisonPageComponent>;

/**
 * stado padrão da página - aba de preços ativa
 */
export const Default: Story = {
  args: {},
};

/**
 * ba de preços ativa - mostra gráfico de histórico
 */
export const PricesTab: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, activeTab: 'prices' },
    template: '<page-comparison [activeTab]="activeTab" />',
  }),
};

/**
 * ba de benefícios ativa - mostra grid comparativo
 */
export const BenefitsTab: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, activeTab: 'benefits' },
    template: '<page-comparison [activeTab]="activeTab" />',
  }),
};

/**
 * ba de histórico ativa - mostra tabela detalhada
 */
export const HistoryTab: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, activeTab: 'history' },
    template: '<page-comparison [activeTab]="activeTab" />',
  }),
};

/**
 * stado de carregamento
 */
export const Loading: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, loading: true },
    template: '<page-comparison [loading]="loading" />',
  }),
};

/**
 * omparando apenas 2 voos
 */
export const TwoFlights: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Comparação com apenas 2 voos selecionados (Azul e Gol)',
      },
    },
  },
};
