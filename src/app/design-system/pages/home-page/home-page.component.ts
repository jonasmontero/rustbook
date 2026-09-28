/**
 * omePageComponent
 * ágina inicial do dashboard SkyCompare
 *
 * @description
 * ágina principal que exibe estatísticas, gráfico de preços, calendário sazonal
 * e lista de voos recentes. Usa DashboardLayoutTemplate com dados mock.
 *
 * @example
 * ```html
 * <page-home />
 * ```
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatModel, FlightModel, PriceHistoryModel, SeasonDataModel } from '../../../core/models';
import {
  MOCK_DASHBOARD_STATS,
  MOCK_RECENT_FLIGHTS,
  generateDashboardPriceHistory,
  MOCK_SEASON_DATA,
} from '../../../core/data';
import { DashboardLayoutTemplate } from '../../templates';
import {
  SearchFormOrganism,
  FlightListOrganism,
  PriceChartOrganism,
  SeasonCalendarOrganism,
} from '../../organisms';

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [
    CommonModule,
    DashboardLayoutTemplate,
    SearchFormOrganism,
    FlightListOrganism,
    PriceChartOrganism,
    SeasonCalendarOrganism,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  sidebarCollapsed = false;
  userName = 'Usuário Demo';
  activeRoute = '/dashboard';
  loading = false;

  stats: StatModel[] = [];
  recentFlights: FlightModel[] = [];
  priceHistory: PriceHistoryModel[] = [];
  seasonData: SeasonDataModel[] = [];
  selectedPeriod: '7d' | '30d' | '90d' = '30d';

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentFlights();
    this.loadPriceHistory();
    this.loadSeasonData();
  }

  private loadStats(): void {
    this.stats = MOCK_DASHBOARD_STATS;
  }

  private loadRecentFlights(): void {
    this.recentFlights = MOCK_RECENT_FLIGHTS;
  }

  private loadPriceHistory(): void {
    this.priceHistory = generateDashboardPriceHistory();
  }

  private loadSeasonData(): void {
    this.seasonData = MOCK_SEASON_DATA;
  }

  onSidebarToggle(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onNavigate(route: string): void {
    this.activeRoute = route;
    console.log('Navegando para:', route);
  }

  onSearch(searchData: any): void {
    console.log('Busca realizada:', searchData);
    this.loading = true;
    // Simular busca
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  onFlightSelect(flightId: string): void {
    console.log('Voo selecionado:', flightId);
  }

  onPeriodChange(period: '7d' | '30d' | '90d'): void {
    this.selectedPeriod = period;
    console.log('Período alterado:', period);
  }

  onMonthClick(month: number): void {
    console.log('Mês clicado:', month);
  }
}
