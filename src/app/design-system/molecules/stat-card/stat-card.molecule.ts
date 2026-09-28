import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconAtom, TextAtom } from '../../atoms';

/**
 * tatCardMolecule - Card de Estatística
 */
@Component({
  selector: 'molecule-stat-card',
  standalone: true,
  imports: [CommonModule, IconAtom, TextAtom],
  template: `
    <div class="molecule-stat-card">
      <atom-icon [name]="icon" size="lg" [color]="iconColor" />
      <div class="molecule-stat-card__content">
        <atom-text variant="h2" weight="semibold">{{ value }}</atom-text>
        <atom-text variant="caption" color="#64748B">{{ label }}</atom-text>
      </div>
    </div>
  `,
  styleUrls: ['./stat-card.molecule.scss'],
})
export class StatCardMolecule {
  @Input() icon: string = 'plane';
  @Input() iconColor: string = '#2563EB';
  @Input() value: string = '';
  @Input() label: string = '';
}
