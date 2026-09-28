/**
 * omparisonLayoutTemplate
 * emplate de layout para página de comparação com navegação por tabs
 *
 * @description
 * emplate responsivo com HeaderOrganism e navegação por tabs para diferentes
 * visões de comparação (Prices, Benefits, History).
 *
 * @example
 * ```html
 * <template-comparison-layout
 *   [activeTab]="'prices'"
 *   (tabChange)="handleTabChange($event)">
 *
 *   <!-- Conteúdo da tab ativa -->
 *   <div prices>
 *     <organism-price-chart [data]="priceData" />
 *   </div>
 *
 *   <div benefits>
 *     <organism-benefits-grid [benefits]="benefitsData" />
 *   </div>
 *
 *   <div history>
 *     <organism-comparison-table [flights]="selectedFlights" />
 *   </div>
 * </template-comparison-layout>
 * ```
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderOrganism } from '../../organisms';

export type ComparisonTab = 'prices' | 'benefits' | 'history';

interface TabConfig {
  id: ComparisonTab;
  label: string;
  icon: string;
}

@Component({
  selector: 'template-comparison-layout',
  standalone: true,
  imports: [CommonModule, HeaderOrganism],
  templateUrl: './comparison-layout.template.html',
  styleUrls: ['./comparison-layout.template.scss'],
})
export class ComparisonLayoutTemplate {
  /** ab atualmente ativa */
  @Input() activeTab: ComparisonTab = 'prices';

  /** ome do usuário para exibir no header */
  @Input() userName?: string = 'User';

  /** vatar do usuário */
  @Input() userAvatar?: string;

  /** ítulo da página */
  @Input() title: string = 'Flight Comparison';

  /** ubtítulo opcional */
  @Input() subtitle?: string;

  /** vento emitido quando tab é alterada */
  @Output() tabChange = new EventEmitter<ComparisonTab>();

  /** vento emitido quando usuário clica no perfil */
  @Output() userClick = new EventEmitter<void>();

  /** vento emitido quando menu é clicado */
  @Output() menuClick = new EventEmitter<void>();

  tabs: TabConfig[] = [
    { id: 'prices', label: 'Prices', icon: 'price' },
    { id: 'benefits', label: 'Benefits', icon: 'star' },
    { id: 'history', label: 'History', icon: 'chart' },
  ];

  onTabClick(tabId: ComparisonTab): void {
    this.tabChange.emit(tabId);
  }

  onUserClick(): void {
    this.userClick.emit();
  }

  onMenuClick(): void {
    this.menuClick.emit();
  }

  isActiveTab(tabId: ComparisonTab): boolean {
    return this.activeTab === tabId;
  }

  getTabClass(tabId: ComparisonTab): string {
    const base = 'template-comparison-layout__tab';
    return this.isActiveTab(tabId) ? `${base} ${base}--active` : base;
  }
}
