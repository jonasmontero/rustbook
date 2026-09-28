import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

undefined
@Component({
  selector: 'atom-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container [ngSwitch]="variant">
      <h1 *ngSwitchCase="'h1'" [class]="getClasses()">
        <ng-content></ng-content>
      </h1>
      <h2 *ngSwitchCase="'h2'" [class]="getClasses()">
        <ng-content></ng-content>
      </h2>
      <h3 *ngSwitchCase="'h3'" [class]="getClasses()">
        <ng-content></ng-content>
      </h3>
      <p *ngSwitchCase="'body'" [class]="getClasses()">
        <ng-content></ng-content>
      </p>
      <span *ngSwitchCase="'caption'" [class]="getClasses()">
        <ng-content></ng-content>
      </span>
      <label *ngSwitchCase="'label'" [class]="getClasses()">
        <ng-content></ng-content>
      </label>
      <p *ngSwitchDefault [class]="getClasses()">
        <ng-content></ng-content>
      </p>
    </ng-container>
  `,
  styleUrls: ['./text.atom.scss'],
})
export class TextAtom {
  /** ariante tipográfica */
  @Input() variant: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label' = 'body';

  /** or customizada (opcional) */
  @Input() color?: string;

  /** eso da fonte */
  @Input() weight?: 'normal' | 'medium' | 'semibold' | 'bold';

  /** linhamento do texto */
  @Input() align?: 'left' | 'center' | 'right';

  /** etorna as classes CSS combinadas */
  getClasses(): string {
    const classes = ['atom-text', `atom-text--${this.variant}`];

    if (this.weight) {
      classes.push(`atom-text--weight-${this.weight}`);
    }

    if (this.align) {
      classes.push(`atom-text--align-${this.align}`);
    }

    return classes.join(' ');
  }
}
