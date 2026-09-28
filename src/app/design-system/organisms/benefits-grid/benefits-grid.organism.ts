/**
 * enefitsGridOrganism
 * rid de benefícios por companhia aérea
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAtom } from '../../atoms';
import { BenefitItemMolecule, AirlineLogoMolecule } from '../../molecules';

export interface BenefitData {
  icon: string;
  text: string;
  included: boolean;
}

export interface AirlineBenefits {
  airline: 'azul' | 'gol' | 'latam';
  items: BenefitData[];
}

@Component({
  selector: 'organism-benefits-grid',
  standalone: true,
  imports: [CommonModule, TextAtom, BenefitItemMolecule, AirlineLogoMolecule],
  templateUrl: './benefits-grid.organism.html',
  styleUrls: ['./benefits-grid.organism.scss'],
})
export class BenefitsGridOrganism {
  @Input() benefits: AirlineBenefits[] = [];
}
