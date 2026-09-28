/**
 * lightListOrganism
 * ista de voos com filtros, ordenação e paginação
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightModel } from '../../../core/models';
import { TextAtom, ButtonAtom, SpinnerAtom } from '../../atoms';
import { AlertMessageMolecule } from '../../molecules';
import { FlightCardOrganism } from '../flight-card';

type SortOption = 'price' | 'duration' | 'departure';

@Component({
  selector: 'organism-flight-list',
  standalone: true,
  imports: [
    CommonModule,
    TextAtom,
    ButtonAtom,
    SpinnerAtom,
    AlertMessageMolecule,
    FlightCardOrganism,
  ],
  templateUrl: './flight-list.organism.html',
  styleUrls: ['./flight-list.organism.scss'],
})
export class FlightListOrganism {
  @Input() flights: FlightModel[] = [];
  @Input() totalCount: number = 0;
  @Input() loading: boolean = false;
  @Input() sortBy: SortOption = 'price';
  @Input() hasMore: boolean = false;
  @Input() selectedFlightId?: string;

  @Output() sortChange = new EventEmitter<SortOption>();
  @Output() loadMore = new EventEmitter<void>();
  @Output() flightSelect = new EventEmitter<string>();

  sortOptions: Array<{ value: SortOption; label: string }> = [
    { value: 'price', label: 'Lowest Price' },
    { value: 'duration', label: 'Shortest Duration' },
    { value: 'departure', label: 'Schedule' },
  ];

  onSortChange(sort: SortOption): void {
    this.sortChange.emit(sort);
  }

  onLoadMore(): void {
    this.loadMore.emit();
  }

  onFlightSelect(flightId: string): void {
    this.flightSelect.emit(flightId);
  }

  isFlightSelected(flightId: string): boolean {
    return this.selectedFlightId === flightId;
  }

  getResultsText(): string {
    if (this.totalCount === 0) return 'No flights found';
    if (this.totalCount === 1) return '1 flight found';
    return `${this.totalCount} flights found`;
  }

  getSortButtonVariant(option: SortOption): 'primary' | 'ghost' {
    return this.sortBy === option ? 'primary' : 'ghost';
  }
}
