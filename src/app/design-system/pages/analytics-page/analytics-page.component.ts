import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutTemplate } from '../../templates/dashboard-layout';
import { PriceChartOrganism } from '../../organisms/price-chart';
import { PieChartOrganism, PieChartDataModel } from '../../organisms/pie-chart';
import { ColumnChartOrganism, ColumnChartDataModel } from '../../organisms/column-chart';
import { BarChartOrganism, BarChartDataModel } from '../../organisms/bar-chart';
import { AreaChartOrganism, AreaChartDataModel } from '../../organisms/area-chart';
import { PriceHistoryModel } from '../../../core/models';

/**
 * nalyticsPageComponent
 *
 * ágina de analytics com 5 blocos de gráficos variados.
 * ostra análise completa de métricas de voos.
 */
@Component({
  selector: 'page-analytics',
  standalone: true,
  imports: [
    CommonModule,
    DashboardLayoutTemplate,
    PriceChartOrganism,
    PieChartOrganism,
    ColumnChartOrganism,
    BarChartOrganism,
    AreaChartOrganism,
  ],
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss'],
})
export class AnalyticsPageComponent implements OnInit {
  // Chart 1: Line Chart - History de Reservas (últimos 90 dias)
  reservationHistory: PriceHistoryModel[] = [];

  // Chart 2: Pie Chart - Distribuição de Voos por Airline
  distributionData: PieChartDataModel[] = [];

  // Chart 3: Column Chart - Voos por Month (12 meses)
  monthlyFlightsData: ColumnChartDataModel[] = [];

  // Chart 4: Bar Chart - Top 10 Rotas Mais Vendidas
  topRoutesData: BarChartDataModel[] = [];

  // Chart 5: Area Chart - Receita Acumulada
  cumulativeRevenueData: AreaChartDataModel[] = [];

  ngOnInit(): void {
    this.loadReservationHistory();
    this.loadDistributionData();
    this.loadMonthlyFlightsData();
    this.loadTopRoutesData();
    this.loadCumulativeRevenueData();
  }

  /**
   * hart 1: Carrega histórico de reservas (últimos 90 dias)
   */
  private loadReservationHistory(): void {
    const today = new Date();
    this.reservationHistory = [];

    for (let i = 89; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      this.reservationHistory.push({
        date: date,
        prices: {
          azul: 150 + Math.random() * 50 + Math.sin(i / 10) * 30,
          gol: 120 + Math.random() * 40 + Math.cos(i / 8) * 25,
          latam: 100 + Math.random() * 35 + Math.sin(i / 12) * 20,
        },
      });
    }
  }

  /**
   * hart 2: Carrega distribuição de voos por companhia
   */
  private loadDistributionData(): void {
    this.distributionData = [
      { label: 'Azul', value: 45, color: '#0033A0' },
      { label: 'Gol', value: 35, color: '#FF6600' },
      { label: 'Latam', value: 20, color: '#E31837' },
    ];
  }

  /**
   * hart 3: Carrega voos por mês (12 meses)
   */
  private loadMonthlyFlightsData(): void {
    this.monthlyFlightsData = [
      { label: 'Jan', value: 320 },
      { label: 'Fev', value: 280 },
      { label: 'Mar', value: 410 },
      { label: 'Abr', value: 350 },
      { label: 'Mai', value: 480 },
      { label: 'Jun', value: 420 },
      { label: 'Jul', value: 550 },
      { label: 'Ago', value: 490 },
      { label: 'Set', value: 380 },
      { label: 'Out', value: 430 },
      { label: 'Nov', value: 520 },
      { label: 'Dez', value: 600 },
    ];
  }

  /**
   * hart 4: Carrega top 10 rotas mais vendidas
   */
  private loadTopRoutesData(): void {
    this.topRoutesData = [
      { label: 'GRU → GIG', value: 1240 },
      { label: 'GRU → SSA', value: 980 },
      { label: 'GRU → BSB', value: 850 },
      { label: 'GRU → FOR', value: 720 },
      { label: 'GRU → REC', value: 650 },
      { label: 'GIG → SSA', value: 580 },
      { label: 'GIG → FOR', value: 520 },
      { label: 'BSB → FOR', value: 450 },
      { label: 'SSA → REC', value: 380 },
      { label: 'FOR → REC', value: 320 },
    ];
  }

  /**
   * hart 5: Carrega receita acumulada mensal
   */
  private loadCumulativeRevenueData(): void {
    this.cumulativeRevenueData = [
      { date: new Date(2025, 0, 1), value: 45000 },
      { date: new Date(2025, 1, 1), value: 98000 },
      { date: new Date(2025, 2, 1), value: 156000 },
      { date: new Date(2025, 3, 1), value: 210000 },
      { date: new Date(2025, 4, 1), value: 285000 },
      { date: new Date(2025, 5, 1), value: 352000 },
      { date: new Date(2025, 6, 1), value: 445000 },
      { date: new Date(2025, 7, 1), value: 520000 },
      { date: new Date(2025, 8, 1), value: 598000 },
      { date: new Date(2025, 9, 1), value: 685000 },
      { date: new Date(2025, 10, 1), value: 780000 },
      { date: new Date(2025, 11, 1), value: 900000 },
    ];
  }
}
