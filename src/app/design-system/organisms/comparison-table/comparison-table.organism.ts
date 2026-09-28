/**
 * omparisonTableOrganism
 * abela comparativa de voos (máx 3)
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightModel } from '../../../core/models';
import { TextAtom, DividerAtom } from '../../atoms';
import { AirlineLogoMolecule, BenefitItemMolecule, PriceTagMolecule } from '../../molecules';

@Component({
  selector: 'organism-comparison-table',
  standalone: true,
  imports: [CommonModule, TextAtom, DividerAtom, AirlineLogoMolecule, BenefitItemMolecule, PriceTagMolecule],
  templateUrl: './comparison-table.organism.html',
  styleUrls: ['./comparison-table.organism.scss'],
})
export class ComparisonTableOrganism {
  @Input() flights: FlightModel[] = [];

  get displayFlights(): FlightModel[] {
    return this.flights.slice(0, 3);
  }

  getBenefitsList(): Array<{key: keyof FlightModel['benefits']; label: string}> {
    return [
      { key: 'baggage', label: 'Baggage' },
      { key: 'meal', label: 'Meal' },
      { key: 'wifi', label: 'Wi-Fi' },
      { key: 'entertainment', label: 'Entretenimento' },
      { key: 'seatSelection', label: 'Escolha de assento' },
    ];
  }
}
