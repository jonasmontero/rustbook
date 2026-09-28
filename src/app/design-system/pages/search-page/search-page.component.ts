/**
 * earchPageComponent
 * ágina de resultados de busca de voos
 *
 * @description
 * ágina que exibe resultados de busca com filtros laterais, formulário sticky
 * e lista de voos. Usa SearchResultsLayoutTemplate com dados mock.
 *
 * @example
 * ```html
 * <page-search />
 * ```
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormModel, FlightModel } from '../../../core/models';
import { MOCK_SEARCH_FLIGHTS } from '../../../core/data';
import { SearchResultsLayoutTemplate } from '../../templates';
import { FlightListOrganism } from '../../organisms';

type SortOption = 'price' | 'duration' | 'departure';

@Component({
  selector: 'page-search',
  standalone: true,
  imports: [CommonModule, SearchResultsLayoutTemplate, FlightListOrganism],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  showFilters = true;
  loading = false;
  userName = 'Demo User';

  searchValues: SearchFormModel = {
    origin: 'GRU',
    destination: 'GIG',
    departureDate: new Date('2026-02-15'),
    returnDate: new Date('2026-02-22'),
    passengers: { adults: 2, children: 0, infants: 0 },
    tripType: 'roundtrip',
  };

  allFlights: FlightModel[] = [];
  filteredFlights: FlightModel[] = [];
  sortBy: SortOption = 'price';
  selectedFlightId?: string;

  // Filters
  selectedAirlines: Set<string> = new Set(['azul', 'gol', 'latam']);
  maxPrice = 2000;
  directOnly = false;

  ngOnInit(): void {
    this.loadFlights();
  }

  private loadFlights(): void {
    this.allFlights = MOCK_SEARCH_FLIGHTS;
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredFlights = this.allFlights.filter((flight) => {
      // Filter by airline
      if (!this.selectedAirlines.has(flight.airline)) return false;

      // Filter by price
      if (flight.price > this.maxPrice) return false;

      // Filter by stops
      if (this.directOnly && flight.stops > 0) return false;

      return true;
    });

    this.sortFlights();
  }

  private sortFlights(): void {
    this.filteredFlights.sort((a, b) => {
      switch (this.sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'departure':
          return a.departureTime.localeCompare(b.departureTime);
        default:
          return 0;
      }
    });
  }

  onSearch(searchData: SearchFormModel): void {
    this.searchValues = searchData;
    this.loading = true;
    console.log('Nova busca:', searchData);

    // Simulate search
    setTimeout(() => {
      this.loadFlights();
      this.loading = false;
    }, 1000);
  }

  onSortChange(sort: SortOption): void {
    this.sortBy = sort;
    this.sortFlights();
  }

  onFlightSelect(flightId: string): void {
    this.selectedFlightId = flightId;
    console.log('Flight selected:', flightId);
  }

  onAirlineToggle(airline: string): void {
    if (this.selectedAirlines.has(airline)) {
      this.selectedAirlines.delete(airline);
    } else {
      this.selectedAirlines.add(airline);
    }
    this.applyFilters();
  }

  onPriceChange(price: number): void {
    this.maxPrice = price;
    this.applyFilters();
  }

  onDirectOnlyToggle(): void {
    this.directOnly = !this.directOnly;
    this.applyFilters();
  }

  isAirlineSelected(airline: string): boolean {
    return this.selectedAirlines.has(airline);
  }
}
