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

import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderOrganism, SidebarOrganism } from '../../organisms';
import { NavigationService } from '../../../core/services/navigation.service';

export type ComparisonTab = 'prices' | 'benefits' | 'history';

interface TabConfig {
  id: ComparisonTab;
  label: string;
  icon: string;
}

@Component({
  selector: 'template-comparison-layout',
  standalone: true,
  imports: [CommonModule, HeaderOrganism, SidebarOrganism],
  templateUrl: './comparison-layout.template.html',
  styleUrls: ['./comparison-layout.template.scss'],
})
export class ComparisonLayoutTemplate implements OnInit {
  private navigationService = inject(NavigationService);

  /** Tab atualmente ativa */
  @Input() activeTab: ComparisonTab = 'prices';

  /** Nome do usuário para exibir no header */
  @Input() userName?: string = 'User';

  /** Avatar do usuário */
  @Input() userAvatar?: string;

  /** Título da página */
  @Input() title: string = 'Flight Comparison';

  /** Subtítulo opcional */
  @Input() subtitle?: string;

  /** Estado colapsado da sidebar */
  @Input() sidebarCollapsed: boolean = false;

  /** Rota ativa */
  @Input() activeRoute: string = '/compare';

  /** Evento emitido quando tab é alterada */
  @Output() tabChange = new EventEmitter<ComparisonTab>();

  /** Evento emitido quando usuário clica no perfil */
  @Output() userClick = new EventEmitter<void>();

  /** Evento emitido quando menu é clicado */
  @Output() menuClick = new EventEmitter<void>();

  /** Evento emitido quando sidebar é alternada */
  @Output() sidebarToggle = new EventEmitter<void>();

  /** Evento de navegação */
  @Output() navigate = new EventEmitter<string>();

  tabs: TabConfig[] = [
    { id: 'prices', label: 'Prices', icon: 'price' },
    { id: 'benefits', label: 'Benefits', icon: 'star' },
    { id: 'history', label: 'History', icon: 'chart' },
  ];

  ngOnInit(): void {
    const current = this.navigationService.getCurrentRoute();
    if (current && current !== '/') {
      this.activeRoute = current;
    }
    this.navigationService.currentRoute$.subscribe(route => {
      this.activeRoute = route;
    });
  }

  onTabClick(tabId: ComparisonTab): void {
    this.tabChange.emit(tabId);
  }

  onUserClick(): void {
    this.userClick.emit();
  }

  onMenuClick(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.menuClick.emit();
  }

  onSidebarToggle(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.sidebarToggle.emit();
  }

  onNavigate(route: string): void {
    this.navigationService.navigateTo(route);
    this.navigate.emit(route);
  }

  isActiveTab(tabId: ComparisonTab): boolean {
    return this.activeTab === tabId;
  }

  getTabClass(tabId: ComparisonTab): string {
    const base = 'template-comparison-layout__tab';
    return this.isActiveTab(tabId) ? `${base} ${base}--active` : base;
  }
}
