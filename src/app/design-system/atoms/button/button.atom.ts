import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconAtom } from '../icon/icon.atom';
import { SpinnerAtom } from '../spinner/spinner.atom';

undefined
@Component({
  selector: 'atom-button',
  standalone: true,
  imports: [CommonModule, IconAtom, SpinnerAtom],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="getButtonClasses()"
      (click)="onClick($event)"
    >
      <atom-spinner
        *ngIf="loading"
        size="sm"
        class="atom-button__spinner"
      />

      <atom-icon
        *ngIf="!loading && icon && iconPosition === 'left'"
        [name]="icon"
        size="sm"
        class="atom-button__icon atom-button__icon--left"
      />

      <span class="atom-button__label">{{ label }}</span>

      <atom-icon
        *ngIf="!loading && icon && iconPosition === 'right'"
        [name]="icon"
        size="sm"
        class="atom-button__icon atom-button__icon--right"
      />
    </button>
  `,
  styleUrls: ['./button.atom.scss'],
})
export class ButtonAtom {
  /** exto do botão */
  @Input() label: string = 'Button';

  /** ariante visual */
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' = 'primary';

  /** amanho do botão */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** stado desabilitado */
  @Input() disabled: boolean = false;

  /** stado de loading */
  @Input() loading: boolean = false;

  /** Ícone (opcional) */
  @Input() icon?: string;

  /** osição do ícone */
  @Input() iconPosition: 'left' | 'right' = 'left';

  /** otão ocupa 100% da largura */
  @Input() fullWidth: boolean = false;

  /** ipo do botão HTML */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** vento de click */
  @Output() clicked = new EventEmitter<void>();

  /** etorna classes CSS do botão */
  getButtonClasses(): string {
    const classes = [
      'atom-button',
      `atom-button--${this.variant}`,
      `atom-button--${this.size}`,
    ];

    if (this.fullWidth) {
      classes.push('atom-button--full-width');
    }

    if (this.loading) {
      classes.push('atom-button--loading');
    }

    return classes.join(' ');
  }

  /** andler de click */
  onClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
