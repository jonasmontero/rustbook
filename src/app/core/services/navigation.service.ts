/**
 * Navigation Service
 *
 * Centralized service for application navigation management.
 * Provides helper utilities and active route information.
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
   * Primary navigation menu items.
   */
  readonly menuItems: NavigationItem[] = [
    { id: '1', label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { id: '2', label: 'Search Flights', icon: 'search', route: '/search' },
    { id: '3', label: 'Compare', icon: 'compare', route: '/compare' },
    { id: '4', label: 'Analytics', icon: 'analytics', route: '/analytics' },
  ];

  /**
   * Observable tracking active navigation state.
   */
  currentRoute$: Observable<string> = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => (event as NavigationEnd).urlAfterRedirects)
  );

  /**
   * Navigates to target route path.
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  /**
   * Checks whether the specified route matches current URL.
   */
  isActive(route: string): boolean {
    return this.router.url === route || this.router.url.startsWith(route + '/');
  }

  /**
   * Returns current URL route path.
   */
  getCurrentRoute(): string {
    return this.router.url;
  }

  /**
   * Navigates back in browser history.
   */
  goBack(): void {
    window.history.back();
  }

  /**
   * Navigates forward in browser history.
   */
  goForward(): void {
    window.history.forward();
  }
}
