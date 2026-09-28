import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabelAtom, InputAtom, IconAtom } from '../../atoms';

/**
 * atePickerMolecule - Seletor de Data
 *
 * olécula que combina label e input de data com ícone.
 * sado para seleção de datas de voo.
 *
 * @example
 * <molecule-date-picker
 *   label="Data de ida"
 *   (dateChange)="handleDateChange($event)"
 * />
 */
@Component({
  selector: 'molecule-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, LabelAtom, InputAtom, IconAtom],
  template: `
    <div class="molecule-date-picker">
      @if (label) {
        <atom-label
          [text]="label"
          [required]="required"
          [htmlFor]="inputId"
          class="molecule-date-picker__label"
        />
      }

      <div class="molecule-date-picker__input-wrapper">
        <atom-input
          [id]="inputId"
          type="date"
          [value]="value"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [error]="error"
          [errorMessage]="errorMessage"
          (valueChange)="onDateChange($event)"
          class="molecule-date-picker__input"
        />

        <atom-icon
          name="calendar"
          size="md"
          class="molecule-date-picker__icon"
        />
      </div>
    </div>
  `,
  styleUrls: ['./date-picker.molecule.scss'],
})
export class DatePickerMolecule {
  /** abel do campo */
  @Input() label: string = '';

  /** alor da data (formato: YYYY-MM-DD) */
  @Input() value: string = '';

  /** laceholder */
  @Input() placeholder: string = '';

  /** ata mínima permitida (formato: YYYY-MM-DD) */
  @Input() minDate?: string;

  /** ata máxima permitida (formato: YYYY-MM-DD) */
  @Input() maxDate?: string;

  /** ampo obrigatório */
  @Input() required: boolean = false;

  /** ampo desabilitado */
  @Input() disabled: boolean = false;

  /** rro */
  @Input() error: boolean = false;

  /** ensagem de erro */
  @Input() errorMessage: string = '';

  /** D do input (para acessibilidade) */
  @Input() inputId: string = `date-picker-${Math.random().toString(36).substr(2, 9)}`;

  /** mite quando a data muda */
  @Output() dateChange = new EventEmitter<string>();

  /** andler de mudança de data */
  onDateChange(newValue: string): void {
    this.value = newValue;
    this.dateChange.emit(newValue);
  }
}
