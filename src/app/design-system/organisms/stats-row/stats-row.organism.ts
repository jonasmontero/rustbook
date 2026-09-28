/**
 * tatsRowOrganism
 * inha de cartões de estatísticas
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatModel } from '../../../core/models';
import { StatCardMolecule } from '../../molecules';

@Component({
  selector: 'organism-stats-row',
  standalone: true,
  imports: [CommonModule, StatCardMolecule],
  templateUrl: './stats-row.organism.html',
  styleUrls: ['./stats-row.organism.scss'],
})
export class StatsRowOrganism {
  @Input() stats: StatModel[] = [];
}
