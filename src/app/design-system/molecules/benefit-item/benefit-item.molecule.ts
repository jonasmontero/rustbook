import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconAtom, TextAtom, BadgeAtom } from '../../atoms';

/**
 * enefitItemMolecule - Item de Benefício
 */
@Component({
  selector: 'molecule-benefit-item',
  standalone: true,
  imports: [CommonModule, IconAtom, TextAtom, BadgeAtom],
  template: `
    <div [class]="getBenefitClasses()">
      <atom-icon
        [name]="included ? 'check' : 'x'"
        size="sm"
        [color]="included ? '#10B981' : '#EF4444'"
      />
      <atom-text variant="body" [color]="included ? '#0F172A' : '#94A3B8'">{{ text }}</atom-text>
      @if (badge) {
        <atom-badge [text]="badge" variant="primary" size="sm" />
      }
    </div>
  `,
  styleUrls: ['./benefit-item.molecule.scss'],
})
export class BenefitItemMolecule {
  @Input() text: string = '';
  @Input() included: boolean = true;
  @Input() badge?: string;

  getBenefitClasses(): string {
    return [
      'molecule-benefit-item',
      this.included ? 'molecule-benefit-item--included' : 'molecule-benefit-item--excluded',
    ].join(' ');
  }
}
