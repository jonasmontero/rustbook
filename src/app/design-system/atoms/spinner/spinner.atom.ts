import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * pinnerAtom - Loading indicator
 *
 * omponente de loading animado com CSS puro.
 * sado por ButtonAtom, SearchField e páginas.
 *
 * @example
 * <atom-spinner size="md" />
 * <atom-spinner size="lg" color="#0033A0" />
 */
@Component({
  selector: 'atom-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="atom-spinner"
      [class]="'atom-spinner--' + size"
      [style.border-top-color]="color || 'currentColor'"
      role="status"
      aria-label="Loading"
    >
      <span class="atom-spinner__sr-only">Loading...</span>
    </div>
  `,
  styleUrls: ['./spinner.atom.scss'],
})
export class SpinnerAtom {
  /** amanho do spinner */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** or customizada (usa currentColor por padrão) */
  @Input() color?: string;
}
