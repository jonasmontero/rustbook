import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAtom, IconAtom } from '../../atoms';

/**
 * lightTimeMolecule - Horário de Voo
 *
 * olécula que exibe horários de partida/chegada e duração do voo.
 *
 * @example
 * <molecule-flight-time
 *   departureTime="08:30"
 *   arrivalTime="10:45"
 *   duration="2h 15min"
 * />
 */
@Component({
  selector: 'molecule-flight-time',
  standalone: true,
  imports: [CommonModule, TextAtom, IconAtom],
  template: `
    <div class="molecule-flight-time">
      <div class="molecule-flight-time__time">
        <atom-text
          variant="h3"
          weight="semibold"
        >{{ departureTime }}</atom-text>
      </div>

      <div class="molecule-flight-time__duration">
        <atom-icon name="plane" size="sm" color="#64748B" />
        <atom-text
          variant="caption"
          color="#64748B"
        >{{ duration }}</atom-text>
      </div>

      <div class="molecule-flight-time__time">
        <atom-text
          variant="h3"
          weight="semibold"
        >{{ arrivalTime }}</atom-text>
      </div>
    </div>
  `,
  styleUrls: ['./flight-time.molecule.scss'],
})
export class FlightTimeMolecule {
  @Input() departureTime: string = '';
  @Input() arrivalTime: string = '';
  @Input() duration: string = '';
}
