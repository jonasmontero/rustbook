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

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormModel } from '../../../core/models';
import { HeaderOrganism, SearchFormOrganism } from '../../organisms';

@Component({
  selector: 'template-search-results-layout',
  standalone: true,
  imports: [CommonModule, HeaderOrganism, SearchFormOrganism],
  templateUrl: './search-results-layout.template.html',
  styleUrls: ['./search-results-layout.template.scss'],
})
export class SearchResultsLayoutTemplate {
  /** ostra/esconde seção de filtros laterais */
  @Input() showFilters: boolean = true;

  /** alores iniciais do formulário de busca */
  @Input() searchValues?: SearchFormModel;

  /** ndica se está carregando resultados */
  @Input() loading: boolean = false;

  /** ome do usuário para exibir no header */
  @Input() userName?: string = 'User';

  /** vatar do usuário */
  @Input() userAvatar?: string;

  /** vento emitido quando busca é submetida */
  @Output() searchSubmit = new EventEmitter<SearchFormModel>();

  /** vento emitido quando usuário clica no perfil */
  @Output() userClick = new EventEmitter<void>();

  /** vento emitido quando menu é clicado */
  @Output() menuClick = new EventEmitter<void>();

  /** vento emitido para toggle de filtros */
  @Output() filtersToggle = new EventEmitter<void>();

  onSearchSubmit(formData: SearchFormModel): void {
    this.searchSubmit.emit(formData);
  }

  onUserClick(): void {
    this.userClick.emit();
  }

  onMenuClick(): void {
    this.menuClick.emit();
  }

  onFiltersToggle(): void {
    this.filtersToggle.emit();
  }
}
