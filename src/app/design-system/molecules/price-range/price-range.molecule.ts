import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAtom, BadgeAtom } from '../../atoms';

/**
 * riceRangeMolecule - Faixa de Preços
 *
 * olécula que exibe uma faixa de preços (min-max) com indicador de economia.
 * sado para mostrar variação de preços entre companhias.
 *
 * @example
 * <molecule-price-range
 *   [minPrice]="380"
 *   [maxPrice]="720"
 *   savingsPercent="35"
 * />
 */
@Component({
  selector: 'molecule-price-range',
  standalone: true,
  imports: [CommonModule, TextAtom, BadgeAtom],
  template: `
    <div class="molecule-price-range">
      <div class="molecule-price-range__prices">
        <atom-text
          variant="h3"
          weight="semibold"
          color="#10B981"
          class="molecule-price-range__min"
        >{{ formatPrice(minPrice) }}</atom-text>

        <atom-text
          variant="caption"
          color="#64748B"
          class="molecule-price-range__separator"
        >até</atom-text>

        <atom-text
          variant="h3"
          weight="semibold"
          class="molecule-price-range__max"
        >{{ formatPrice(maxPrice) }}</atom-text>
      </div>

      @if (savingsPercent) {
        <atom-badge
          [text]="'Economize até ' + savingsPercent + '%'"
          variant="success"
          size="sm"
          class="molecule-price-range__savings"
        />
      }
    </div>
  `,
  styleUrls: ['./price-range.molecule.scss'],
})
export class PriceRangeMolecule {
  /** reço mínimo */
  @Input() minPrice: number = 0;

  /** reço máximo */
  @Input() maxPrice: number = 0;

  /** oeda */
  @Input() currency: string = 'R$';

  /** ercentual de economia */
  @Input() savingsPercent?: number;

  /** ormata preço */
  formatPrice(price: number): string {
    return `${this.currency} ${price.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }
}
