import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

undefined
@Component({
  selector: 'atom-divider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getDividerClasses()" role="separator"></div>
  `,
  styleUrls: ['./divider.atom.scss'],
})
export class DividerAtom {
  /** rientação do divider */
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** spaçamento ao redor do divider */
  @Input() spacing: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** or customizada (opcional) */
  @Input() color?: string;

  /** etorna classes CSS do divider */
  getDividerClasses(): string {
    return [
      'atom-divider',
      `atom-divider--${this.orientation}`,
      `atom-divider--spacing-${this.spacing}`,
    ].join(' ');
  }
}
