import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
export class SearchFormOrganism implements OnInit {
  @Input() initialValues?: SearchFormModel;
  @Input() loading: boolean = false;

  @Output() search = new EventEmitter<SearchFormModel>();

  origin: string = 'GRU';
  destination: string = 'GIG';
  departureDate: Date | null = new Date();
  returnDate: Date | null = new Date(Date.now() + 7 * 86400000);
  adults: number = 1;
  children: number = 0;
  infants: number = 0;
  tripType: 'roundtrip' | 'oneway' = 'roundtrip';

  validationErrors: string[] = [];

  ngOnInit(): void {
    if (this.initialValues) {
      this.origin = this.initialValues.origin || 'GRU';
      this.destination = this.initialValues.destination || 'GIG';
      this.departureDate = this.initialValues.departureDate || new Date();
      this.returnDate = this.initialValues.returnDate || new Date(Date.now() + 7 * 86400000);
      this.adults = this.initialValues.passengers?.adults ?? 1;
      this.children = this.initialValues.passengers?.children ?? 0;
      this.infants = this.initialValues.passengers?.infants ?? 0;
      this.tripType = this.initialValues.tripType || 'roundtrip';
    }
  }

  onOriginChange(value: string): void {
    this.origin = value;
  }

  onDestinationChange(value: string): void {
    this.destination = value;
  }

  onDepartureDateChange(dateString: string): void {
    this.departureDate = dateString ? this.parseDateFromPicker(dateString) : null;
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

    if (!this.origin || !this.origin.trim()) {
      this.validationErrors.push('Origin is required.');
    }

    if (!this.destination || !this.destination.trim()) {
      this.validationErrors.push('Destination is required.');
    }

    if (!this.departureDate) {
      this.validationErrors.push('Departure date is required.');
    }

    if (this.tripType === 'roundtrip' && !this.returnDate) {
      this.validationErrors.push('Return date is required for round trips.');
    }

    if (this.returnDate && this.departureDate && this.returnDate < this.departureDate) {
      this.validationErrors.push('Return date must be on or after departure date.');
    }

    if (this.adults < 1) {
      this.validationErrors.push('At least 1 adult passenger is required.');
    }

    if (this.infants > this.adults) {
      this.validationErrors.push('Maximum 1 infant per adult.');
    }

    return this.validationErrors.length === 0;
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const formData: SearchFormModel = {
      origin: this.origin.trim(),
      destination: this.destination.trim(),
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

  formatDateForPicker(date: Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  parseDateFromPicker(dateString: string): Date {
    return new Date(dateString + 'T00:00:00');
  }

  getMinReturnDateString(): string {
    return this.formatDateForPicker(this.departureDate);
  }
}
