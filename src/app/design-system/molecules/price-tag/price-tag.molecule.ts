import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAtom, BadgeAtom } from '../../atoms';

/**
 * riceTagMolecule - Etiqueta de Preço
 *
 * olécula que exibe preço com trend e badges opcionais.
 * sado em cards de voo para mostrar preço com indicadores.
 *
 * @example
 * <molecule-price-tag
 *   [price]="450"
 *   trend="down"
 *   discount="15"
 * />
 */
@Component({
  selector: 'molecule-price-tag',
  standalone: true,
  imports: [CommonModule, TextAtom, BadgeAtom],
  template: `
    <div class="molecule-price-tag">
      <div class="molecule-price-tag__main">
        <atom-text
          variant="h2"
          weight="semibold"
          [color]="getColor()"
          class="molecule-price-tag__price"
        >{{ formatPrice(price) }}</atom-text>

        @if (trend) {
          <span
            [style.color]="trend === 'up' ? '#EF4444' : '#10B981'"
            class="molecule-price-tag__trend"
          >
            {{ trend === 'up' ? '↑' : '↓' }}
          </span>
        }
      </div>

      @if (discount) {
        <atom-badge
          [text]="'− ' + discount + '%'"
          variant="success"
          size="sm"
          class="molecule-price-tag__discount"
        />
      }

      @if (label) {
        <atom-text
          variant="caption"
          color="#64748B"
          class="molecule-price-tag__label"
        >{{ label }}</atom-text>
      }
    </div>
  `,
  styleUrls: ['./price-tag.molecule.scss'],
})
export class PriceTagMolecule {
  /** reço */
  @Input() price: number = 0;

  /** oeda */
  @Input() currency: string = 'R$';

  /** endência (up/down) */
  @Input() trend?: 'up' | 'down';

  /** esconto em % */
  @Input() discount?: number;

  /** abel adicional */
  @Input() label?: string;

  /** estacar preço */
  @Input() highlighted: boolean = false;

  /** ormata preço */
  formatPrice(price: number): string {
    return `${this.currency} ${price.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  /** etorna cor baseada no estado */
  getColor(): string {
    if (this.highlighted) return '#10B981'; // Verde
    return '#0F172A'; // Preto
  }
}
