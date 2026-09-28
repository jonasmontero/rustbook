/**
 * avigation Service
 *
 * erviço centralizado para gerenciamento de navegação.
 * ornece métodos helpers e informações sobre rotas ativas.
 */

import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private router = inject(Router);

  /**
   * enu items para navegação da aplicação
   */
  readonly menuItems: NavigationItem[] = [
    { id: '1', label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { id: '2', label: 'Buscar Voos', icon: 'search', route: '/search' },
    { id: '3', label: 'Comparar', icon: 'compare', route: '/compare' },
    { id: '4', label: 'Analytics', icon: 'analytics', route: '/analytics' },
  ];

  /**
   * bservable da rota atual
   * mite toda vez que a navegação é concluída
   */
  currentRoute$: Observable<string> = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => (event as NavigationEnd).urlAfterRedirects)
  );

  /**
   * avega para uma rota específica
   * @param route Rota de destino (ex: '/dashboard')
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  /**
   * erifica se uma rota está ativa
   * @param route Rota para verificar
   * @returns true se a rota está ativa
   */
  isActive(route: string): boolean {
    return this.router.url === route || this.router.url.startsWith(route + '/');
  }

  /**
   * etorna a rota atual
   * @returns URL da rota atual
   */
  getCurrentRoute(): string {
    return this.router.url;
  }

  /**
   * olta para a página anterior no histórico
   */
  goBack(): void {
    window.history.back();
  }

  /**
   * vança para a próxima página no histórico
   */
  goForward(): void {
    window.history.forward();
  }
}
