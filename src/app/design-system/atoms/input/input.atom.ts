import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

undefined
@Component({
  selector: 'atom-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="atom-input-wrapper">
      <input
        [type]="type"
        [placeholder]="placeholder"
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)"
        [disabled]="disabled"
        [class]="getInputClasses()"
        [attr.aria-invalid]="error ? 'true' : null"
        [attr.aria-describedby]="error && errorMessage ? 'input-error' : null"
      />
      <p
        *ngIf="error && errorMessage"
        id="input-error"
        class="atom-input__error-message"
      >
        {{ errorMessage }}
      </p>
    </div>
  `,
  styleUrls: ['./input.atom.scss'],
})
export class InputAtom {
  /** ipo do input */
  @Input() type: 'text' | 'number' | 'date' | 'email' | 'password' = 'text';

  /** laceholder */
  @Input() placeholder: string = '';

  /** alor do input */
  @Input() value: string = '';

  /** stado desabilitado */
  @Input() disabled: boolean = false;

  /** stado de erro */
  @Input() error: boolean = false;

  /** ensagem de erro */
  @Input() errorMessage?: string;

  /** vento de mudança de valor */
  @Output() valueChange = new EventEmitter<string>();

  /** etorna classes CSS do input */
  getInputClasses(): string {
    const classes = ['atom-input'];

    if (this.error) {
      classes.push('atom-input--error');
    }

    if (this.disabled) {
      classes.push('atom-input--disabled');
    }

    return classes.join(' ');
  }

  /** mite evento de mudança */
  onValueChange(newValue: string): void {
    this.valueChange.emit(newValue);
  }
}
