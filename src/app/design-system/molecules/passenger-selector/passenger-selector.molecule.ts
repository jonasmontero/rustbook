import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelAtom, ButtonAtom, TextAtom } from '../../atoms';

/**
 * assengerSelectorMolecule - Seletor de Passengers
 *
 * olécula que permite incrementar/decrementar número de passageiros.
 * sado para selecionar adults, children e infants.
 *
 * @example
 * <molecule-passenger-selector
 *   label="Adults"
 *   [value]="2"
 *   (valueChange)="handleChange($event)"
 * />
 */
@Component({
  selector: 'molecule-passenger-selector',
  standalone: true,
  imports: [CommonModule, LabelAtom, ButtonAtom, TextAtom],
  template: `
    <div class="molecule-passenger-selector">
      @if (label) {
        <atom-label
          [text]="label"
          class="molecule-passenger-selector__label"
        />
      }

      <div class="molecule-passenger-selector__controls">
        <atom-button
          variant="outline"
          size="sm"
          label="−"
          [disabled]="value <= min"
          (clicked)="decrement()"
          class="molecule-passenger-selector__button"
          [attr.aria-label]="'Diminuir ' + label"
        />

        <atom-text
          variant="body"
          class="molecule-passenger-selector__value"
        >{{ value }}</atom-text>

        <atom-button
          variant="outline"
          size="sm"
          label="+"
          [disabled]="value >= max"
          (clicked)="increment()"
          class="molecule-passenger-selector__button"
          [attr.aria-label]="'Aumentar ' + label"
        />
      </div>

      @if (description) {
        <atom-text
          variant="caption"
          color="#64748B"
          class="molecule-passenger-selector__description"
        >{{ description }}</atom-text>
      }
    </div>
  `,
  styleUrls: ['./passenger-selector.molecule.scss'],
})
export class PassengerSelectorMolecule {
  /** abel do seletor */
  @Input() label: string = '';

  /** alor atual */
  @Input() value: number = 0;

  /** alor mínimo */
  @Input() min: number = 0;

  /** alor máximo */
  @Input() max: number = 9;

  /** escrição adicional */
  @Input() description?: string;

  /** mite quando o valor muda */
  @Output() valueChange = new EventEmitter<number>();

  /** ncrementa o valor */
  increment(): void {
    if (this.value < this.max) {
      this.value++;
      this.valueChange.emit(this.value);
    }
  }

  /** ecrementa o valor */
  decrement(): void {
    if (this.value > this.min) {
      this.value--;
      this.valueChange.emit(this.value);
    }
  }
}
