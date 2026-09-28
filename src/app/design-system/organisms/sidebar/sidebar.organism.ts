/**
 * idebarOrganism
 * arra lateral de navegação
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAtom, IconAtom, DividerAtom } from '../../atoms';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'organism-sidebar',
  standalone: true,
  imports: [CommonModule, TextAtom, IconAtom, DividerAtom],
  templateUrl: './sidebar.organism.html',
  styleUrls: ['./sidebar.organism.scss'],
})
export class SidebarOrganism {
  @Input() collapsed: boolean = false;
  @Input() activeRoute: string = '';
  @Input() menuItems: MenuItem[] = [
    { id: '1', label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { id: '2', label: 'Search Flights', icon: 'search', route: '/search' },
    { id: '3', label: 'Comparar', icon: 'compare', route: '/compare' },
    { id: '4', label: 'History', icon: 'history', route: '/history' },
  ];

  @Output() navigate = new EventEmitter<string>();
  @Output() toggleCollapse = new EventEmitter<void>();

  onNavigate(route: string): void {
    this.navigate.emit(route);
  }

  onToggle(): void {
    this.toggleCollapse.emit();
  }

  isActive(route: string): boolean {
    return this.activeRoute === route;
  }

  getItemClass(route: string): string {
    const base = 'organism-sidebar__item';
    return this.isActive(route) ? `${base} ${base}--active` : base;
  }
}
