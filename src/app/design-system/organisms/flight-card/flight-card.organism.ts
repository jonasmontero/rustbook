/**
 * lightCardOrganism
 * ard completo de voo com todas informações e ações
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightModel } from '../../../core/models';
import { ButtonAtom, DividerAtom } from '../../atoms';
import {
  AirlineLogoMolecule,
  FlightTimeMolecule,
  BenefitItemMolecule,
  PriceTagMolecule,
} from '../../molecules';

@Component({
  selector: 'organism-flight-card',
  standalone: true,
  imports: [
    CommonModule,
    AirlineLogoMolecule,
    FlightTimeMolecule,
    DividerAtom,
    BenefitItemMolecule,
    PriceTagMolecule,
    ButtonAtom,
  ],
  templateUrl: './flight-card.organism.html',
  styleUrls: ['./flight-card.organism.scss'],
})
export class FlightCardOrganism {
  @Input() flight!: FlightModel;
  @Input() selected: boolean = false;
  @Input() compact: boolean = false;

  @Output() select = new EventEmitter<string>();
  @Output() details = new EventEmitter<string>();

  getCardClasses(): string {
    const classes = ['organism-flight-card'];
    if (this.selected) classes.push('organism-flight-card--selected');
    if (this.compact) classes.push('organism-flight-card--compact');
    if (this.flight.seatsLeft && this.flight.seatsLeft < 5) {
      classes.push('organism-flight-card--low-seats');
    }
    return classes.join(' ');
  }

  onSelect(): void {
    this.select.emit(this.flight.id);
  }

  onDetails(): void {
    this.details.emit(this.flight.id);
  }

  getBenefitsArray(): Array<{ icon: string; text: string; included: boolean }> {
    return [
      { icon: 'baggage', text: 'Baggage', included: this.flight.benefits.baggage },
      { icon: 'meal', text: 'Meal', included: this.flight.benefits.meal },
      { icon: 'wifi', text: 'Wi-Fi', included: this.flight.benefits.wifi },
      { icon: 'entertainment', text: 'Entretenimento', included: this.flight.benefits.entertainment },
      { icon: 'seat', text: 'Escolha de assento', included: this.flight.benefits.seatSelection },
    ];
  }

  getStopsText(): string {
    if (this.flight.stops === 0) return 'Direct flight';
    if (this.flight.stops === 1) return '1 escala';
    return `${this.flight.stops} escalas`;
  }

  hasDiscount(): boolean {
    return !!this.flight.originalPrice && this.flight.originalPrice > this.flight.price;
  }

  getDiscountPercent(): number {
    if (!this.flight.originalPrice) return 0;
    return Math.round(((this.flight.originalPrice - this.flight.price) / this.flight.originalPrice) * 100);
  }
}
