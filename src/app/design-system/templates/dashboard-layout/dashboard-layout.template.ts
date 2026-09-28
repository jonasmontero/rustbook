/**
 * ashboardLayoutTemplate
 * emplate de layout principal do dashboard com sidebar, header e stats
 *
 * @description
 * emplate responsivo que combina HeaderOrganism, SidebarOrganism e StatsRowOrganism
 * com áreas de conteúdo projetado via ng-content.
 *
 * @example
 * ```html
 * <template-dashboard-layout
 *   [sidebarCollapsed]="false"
 *   [stats]="dashboardStats"
 *   (sidebarToggle)="handleToggle()">
 *
 *   <!-- Conteúdo principal aqui -->
 *   <div class="main-content">
 *     <h1>Dashboard</h1>
 *   </div>
 * </template-dashboard-layout>
 * ```
 */

import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatModel } from '../../../core/models';
import { HeaderOrganism, SidebarOrganism, StatsRowOrganism } from '../../organisms';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'template-dashboard-layout',
  standalone: true,
  imports: [CommonModule, HeaderOrganism, SidebarOrganism, StatsRowOrganism],
  templateUrl: './dashboard-layout.template.html',
  styleUrls: ['./dashboard-layout.template.scss'],
})
export class DashboardLayoutTemplate implements OnInit {
  private navigationService = inject(NavigationService);

  /** ndica se a sidebar está colapsada */
  @Input() sidebarCollapsed: boolean = false;

  /** rray de estatísticas para exibir no topo */
  @Input() stats: StatModel[] = [];

  /** ome do usuário para exibir no header */
  @Input() userName?: string = 'User';

  /** vatar do usuário */
  @Input() userAvatar?: string;

  /** ota ativa para highlight na sidebar */
  @Input() activeRoute: string = '/dashboard';

  /** vento emitido quando sidebar é expandida/colapsada */
  @Output() sidebarToggle = new EventEmitter<void>();

  /** vento emitido quando menu é clicado */
  @Output() menuClick = new EventEmitter<void>();

  /** vento emitido para navegação (deprecated - mantido para compatibilidade) */
  @Output() navigate = new EventEmitter<string>();

  /** vento emitido quando usuário clica no avatar */
  @Output() userClick = new EventEmitter<void>();

  ngOnInit(): void {
    const current = this.navigationService.getCurrentRoute();
    if (current && current !== '/') {
      this.activeRoute = current;
    }
    this.navigationService.currentRoute$.subscribe(route => {
      this.activeRoute = route;
    });
  }

  onSidebarToggle(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.sidebarToggle.emit();
  }

  onMenuClick(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.menuClick.emit();
  }

  onNavigate(route: string): void {
    this.navigationService.navigateTo(route);
    this.navigate.emit(route);
  }

  onUserClick(): void {
    this.userClick.emit();
  }
}
