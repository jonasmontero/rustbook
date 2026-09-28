import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

undefined
@Component({
  selector: 'atom-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="getBadgeClasses()">
      {{ text }}
    </span>
  `,
  styleUrls: ['./badge.atom.scss'],
})
export class BadgeAtom {
  /** exto do badge */
  @Input() text: string = '';

  /** ariante de cor */
  @Input() variant:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'azul'
    | 'gol'
    | 'latam' = 'default';

  /** amanho do badge */
  @Input() size: 'sm' | 'md' = 'md';

  /** etorna classes CSS do badge */
  getBadgeClasses(): string {
    return [
      'atom-badge',
      `atom-badge--${this.variant}`,
      `atom-badge--${this.size}`,
    ].join(' ');
  }
}
