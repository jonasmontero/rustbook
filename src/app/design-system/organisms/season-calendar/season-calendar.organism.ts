/**
 * easonCalendarOrganism
 * alendário de temporadas (12 meses) com preços médios
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonDataModel } from '../../../core/models';
import { TextAtom, BadgeAtom } from '../../atoms';

@Component({
  selector: 'organism-season-calendar',
  standalone: true,
  imports: [CommonModule, TextAtom, BadgeAtom],
  templateUrl: './season-calendar.organism.html',
  styleUrls: ['./season-calendar.organism.scss'],
})
export class SeasonCalendarOrganism {
  @Input() seasonData: SeasonDataModel[] = [];
  @Input() year: number = new Date().getFullYear();

  @Output() monthClick = new EventEmitter<number>();

  monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  onMonthClick(month: number): void {
    this.monthClick.emit(month);
  }

  getMonthData(month: number): SeasonDataModel | undefined {
    return this.seasonData.find(d => d.month === month);
  }

  getSeasonClass(season?: 'low' | 'medium' | 'high'): string {
    if (!season) return 'organism-season-calendar__month';
    return `organism-season-calendar__month organism-season-calendar__month--${season}`;
  }

  getSeasonLabel(season?: 'low' | 'medium' | 'high'): string {
    if (!season) return 'N/D';
    const labels = { low: 'Baixa', medium: 'Média', high: 'Alta' };
    return labels[season];
  }

  getSeasonBadgeVariant(season?: 'low' | 'medium' | 'high'): 'success' | 'warning' | 'danger' | 'default' {
    if (!season) return 'default';
    const variants = { low: 'success', medium: 'warning', high: 'danger' } as const;
    return variants[season];
  }

  formatPrice(price?: number): string {
    if (!price) return 'N/D';
    return `R$ ${Math.round(price)}`;
  }
}
