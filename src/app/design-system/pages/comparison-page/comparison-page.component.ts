import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparisonLayoutTemplate, ComparisonTab } from '../../templates/comparison-layout';
import { PriceChartOrganism } from '../../organisms/price-chart';
import { ComparisonTableOrganism } from '../../organisms/comparison-table';
import { BenefitsGridOrganism, AirlineBenefits } from '../../organisms/benefits-grid';
import { FlightModel, PriceHistoryModel } from '../../../core/models';
import {
  MOCK_COMPARISON_FLIGHTS,
  generateComparisonPriceHistory,
  MOCK_AIRLINE_BENEFITS,
} from '../../../core/data';

/**
 * omparisonPageComponent
 *
 * ágina de comparação detalhada entre voos selecionados.
 * ermite análise lado a lado de preços, benefícios e histórico.
 */
@Component({
  selector: 'page-comparison',
  standalone: true,
  imports: [
    CommonModule,
    ComparisonLayoutTemplate,
    PriceChartOrganism,
    ComparisonTableOrganism,
    BenefitsGridOrganism,
  ],
  templateUrl: './comparison-page.component.html',
  styleUrls: ['./comparison-page.component.scss'],
})
export class ComparisonPageComponent implements OnInit {
  // Estado
  activeTab: ComparisonTab = 'prices';
  loading: boolean = false;

  // Dados
  selectedFlights: FlightModel[] = [];
  priceHistory: PriceHistoryModel[] = [];
  benefitsData: AirlineBenefits[] = [];

  ngOnInit(): void {
    this.loadSelectedFlights();
    this.loadPriceHistory();
    this.loadBenefitsData();
  }

  /**
   * arrega voos selecionados para comparação (mock - 3 voos)
   */
  private loadSelectedFlights(): void {
    this.selectedFlights = MOCK_COMPARISON_FLIGHTS;
  }

  /**
   * arrega histórico de preços dos últimos 30 dias
   */
  private loadPriceHistory(): void {
    this.priceHistory = generateComparisonPriceHistory();
  }

  /**
   * arrega dados de benefícios de cada companhia
   */
  private loadBenefitsData(): void {
    this.benefitsData = MOCK_AIRLINE_BENEFITS;
  }

  /**
   * andler para troca de aba
   */
  onTabChange(tab: ComparisonTab): void {
    this.activeTab = tab;
  }

  /**
   * imula nova busca
   */
  onNewSearch(): void {
    console.log('Nova busca solicitada');
    // Em implementação real, navegaria para página de busca
  }
}
