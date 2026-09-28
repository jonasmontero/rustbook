/**
 * earchFormOrganism
 * ormulário completo de busca de voos com validações
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFormModel } from '../../../core/models';
import { ButtonAtom } from '../../atoms';
import {
  SearchFieldMolecule,
  DatePickerMolecule,
  PassengerSelectorMolecule,
  AlertMessageMolecule,
} from '../../molecules';

@Component({
  selector: 'organism-search-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchFieldMolecule,
    DatePickerMolecule,
    PassengerSelectorMolecule,
    ButtonAtom,
    AlertMessageMolecule,
  ],
  templateUrl: './search-form.organism.html',
  styleUrls: ['./search-form.organism.scss'],
})
export class SearchFormOrganism {
  @Input() initialValues?: SearchFormModel;
  @Input() loading: boolean = false;

  @Output() search = new EventEmitter<SearchFormModel>();

  origin: string = '';
  destination: string = '';
  departureDate: Date | null = null;
  returnDate: Date | null = null;
  adults: number = 1;
  children: number = 0;
  infants: number = 0;
  tripType: 'roundtrip' | 'oneway' = 'roundtrip';

  validationErrors: string[] = [];

  ngOnInit(): void {
    if (this.initialValues) {
      this.origin = this.initialValues.origin;
      this.destination = this.initialValues.destination;
      this.departureDate = this.initialValues.departureDate;
      this.returnDate = this.initialValues.returnDate || null;
      this.adults = this.initialValues.passengers.adults;
      this.children = this.initialValues.passengers.children;
      this.infants = this.initialValues.passengers.infants;
      this.tripType = this.initialValues.tripType;
    }
  }

  onOriginSearch(value: string): void {
    this.origin = value;
  }

  onDestinationSearch(value: string): void {
    this.destination = value;
  }

  onDepartureDateChange(dateString: string): void {
    this.departureDate = dateString ? this.parseDateFromPicker(dateString) : null;
    // Reset return date if it's before new departure date
    if (this.returnDate && this.departureDate && this.departureDate > this.returnDate) {
      this.returnDate = null;
    }
  }

  onReturnDateChange(dateString: string): void {
    this.returnDate = dateString ? this.parseDateFromPicker(dateString) : null;
  }

  onAdultsChange(value: number): void {
    this.adults = value;
    this.validateInfants();
  }

  onChildrenChange(value: number): void {
    this.children = value;
  }

  onInfantsChange(value: number): void {
    this.infants = value;
    this.validateInfants();
  }

  onTripTypeChange(type: 'roundtrip' | 'oneway'): void {
    this.tripType = type;
    if (type === 'oneway') {
      this.returnDate = null;
    }
  }

  validateInfants(): void {
    if (this.infants > this.adults) {
      this.infants = this.adults;
    }
  }

  validate(): boolean {
    this.validationErrors = [];

    if (!this.origin) {
      this.validationErrors.push('Origem é obrigatória');
    }

    if (!this.destination) {
      this.validationErrors.push('Destino é obrigatório');
    }

    if (!this.departureDate) {
      this.validationErrors.push('Data de ida é obrigatória');
    }

    if (this.tripType === 'roundtrip' && !this.returnDate) {
      this.validationErrors.push('Data de volta é obrigatória para ida e volta');
    }

    if (this.returnDate && this.departureDate && this.returnDate < this.departureDate) {
      this.validationErrors.push('Data de volta deve ser posterior à data de ida');
    }

    if (this.adults < 1) {
      this.validationErrors.push('Pelo menos 1 adulto é obrigatório');
    }

    if (this.infants > this.adults) {
      this.validationErrors.push('Máximo de 1 bebê por adulto');
    }

    return this.validationErrors.length === 0;
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const formData: SearchFormModel = {
      origin: this.origin,
      destination: this.destination,
      departureDate: this.departureDate!,
      returnDate: this.returnDate || undefined,
      passengers: {
        adults: this.adults,
        children: this.children,
        infants: this.infants,
      },
      tripType: this.tripType,
    };

    this.search.emit(formData);
  }

  dismissError(): void {
    this.validationErrors = [];
  }

  getMinReturnDate(): Date | undefined {
    return this.departureDate || undefined;
  }

  /** onverte Date para string no formato YYYY-MM-DD para o date picker */
  formatDateForPicker(date: Date | null): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /** onverte string YYYY-MM-DD para Date */
  parseDateFromPicker(dateString: string): Date {
    return new Date(dateString + 'T00:00:00');
  }

  /** etorna data mínima de retorno formatada para o picker */
  getMinReturnDateString(): string {
    return this.formatDateForPicker(this.departureDate);
  }
}
