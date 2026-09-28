/**
 * earchResultsLayoutTemplate
 * emplate de layout para página de resultados de busca com formulário sticky
 *
 * @description
 * emplate responsivo com HeaderOrganism e SearchFormOrganism (sticky) + área de filtros
 * e conteúdo projetado para resultados de busca.
 *
 * @example
 * ```html
 * <template-search-results-layout
 *   [showFilters]="true"
 *   [searchValues]="currentSearch"
 *   (searchSubmit)="handleSearch($event)">
 *
 *   <!-- Lista de resultados aqui -->
 *   <organism-flight-list [flights]="results" />
 * </template-search-results-layout>
 * ```
 */

import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormModel } from '../../../core/models';
import { HeaderOrganism, SearchFormOrganism, SidebarOrganism } from '../../organisms';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'template-search-results-layout',
  standalone: true,
  imports: [CommonModule, HeaderOrganism, SearchFormOrganism, SidebarOrganism],
  templateUrl: './search-results-layout.template.html',
  styleUrls: ['./search-results-layout.template.scss'],
})
export class SearchResultsLayoutTemplate implements OnInit {
  private navigationService = inject(NavigationService);

  /** Mostra/esconde seção de filtros laterais */
  @Input() showFilters: boolean = true;

  /** Valores iniciais do formulário de busca */
  @Input() searchValues?: SearchFormModel;

  /** Indica se está carregando resultados */
  @Input() loading: boolean = false;

  /** Nome do usuário para exibir no header */
  @Input() userName?: string = 'User';

  /** Avatar do usuário */
  @Input() userAvatar?: string;

  /** Estado colapsado da sidebar */
  @Input() sidebarCollapsed: boolean = false;

  /** Rota ativa */
  @Input() activeRoute: string = '/search';

  /** Evento emitido quando busca é submetida */
  @Output() searchSubmit = new EventEmitter<SearchFormModel>();

  /** Evento emitido quando usuário clica no perfil */
  @Output() userClick = new EventEmitter<void>();

  /** Evento emitido quando menu é clicado */
  @Output() menuClick = new EventEmitter<void>();

  /** Evento emitido quando sidebar é alternada */
  @Output() sidebarToggle = new EventEmitter<void>();

  /** Evento emitido para toggle de filtros */
  @Output() filtersToggle = new EventEmitter<void>();

  /** Evento de navegação */
  @Output() navigate = new EventEmitter<string>();

  ngOnInit(): void {
    const current = this.navigationService.getCurrentRoute();
    if (current && current !== '/') {
      this.activeRoute = current;
    }
    this.navigationService.currentRoute$.subscribe(route => {
      this.activeRoute = route;
    });
  }

  onSearchSubmit(formData: SearchFormModel): void {
    this.searchSubmit.emit(formData);
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

  onFiltersToggle(): void {
    this.filtersToggle.emit();
  }
}
