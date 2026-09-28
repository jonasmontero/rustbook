import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarAtom, TextAtom, BadgeAtom } from '../../atoms';

/**
 * irlineLogoMolecule - Logo de Companhia Aérea
 *
 * olécula que exibe logo, nome e badge da companhia aérea.
 * sado em cards de voo, comparações, etc.
 *
 * @example
 * <molecule-airline-logo
 *   airline="azul"
 *   showName="true"
 *   showBadge="true"
 * />
 */
@Component({
  selector: 'molecule-airline-logo',
  standalone: true,
  imports: [CommonModule, AvatarAtom, TextAtom, BadgeAtom],
  template: `
    <div [class]="getAirlineLogoClasses()">
      <atom-avatar
        [fallback]="getAirlineData().initials"
        [alt]="getAirlineData().name"
        [size]="size"
        [style.background-color]="getAirlineData().color"
        [style.color]="'white'"
        class="molecule-airline-logo__avatar"
      />

      @if (showName) {
        <div class="molecule-airline-logo__info">
          <atom-text
            variant="label"
            weight="semibold"
            class="molecule-airline-logo__name"
          >{{ getAirlineData().name }}</atom-text>

          @if (showBadge) {
            <atom-badge
              [text]="getAirlineData().code"
              [variant]="airline"
              size="sm"
              class="molecule-airline-logo__badge"
            />
          }
        </div>
      }
    </div>
  `,
  styleUrls: ['./airline-logo.molecule.scss'],
})
export class AirlineLogoMolecule {
  /** ompanhia aérea */
  @Input() airline: 'azul' | 'gol' | 'latam' = 'azul';

  /** amanho do avatar */
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** ostrar nome */
  @Input() showName: boolean = true;

  /** ostrar badge */
  @Input() showBadge: boolean = false;

  /** ados das companhias */
  private airlines = {
    azul: {
      name: 'Azul Linhas Aéreas',
      code: 'AZ',
      initials: 'AZ',
      color: '#0033A0',
    },
    gol: {
      name: 'Gol Linhas Aéreas',
      code: 'GL',
      initials: 'GL',
      color: '#FF6600',
    },
    latam: {
      name: 'Latam Airlines',
      code: 'LA',
      initials: 'LA',
      color: '#E31837',
    },
  };

  /** etorna dados da companhia */
  getAirlineData() {
    return this.airlines[this.airline];
  }

  /** etorna classes CSS */
  getAirlineLogoClasses(): string {
    return [
      'molecule-airline-logo',
      `molecule-airline-logo--${this.airline}`,
      `molecule-airline-logo--${this.size}`,
    ].join(' ');
  }
}
