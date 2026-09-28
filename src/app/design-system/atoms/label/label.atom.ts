import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * abelAtom - Rótulo de campo
 *
 * omponente base para labels de formulário.
 * ostra asterisco quando required.
 *
 * @example
 * <atom-label text="Nome" htmlFor="name-input" />
 * <atom-label text="Email" [required]="true" htmlFor="email-input" />
 */
@Component({
  selector: 'atom-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label
      class="atom-label"
      [attr.for]="htmlFor"
    >
      {{ text }}
      <span *ngIf="required" class="atom-label__required" aria-label="required">*</span>
    </label>
  `,
  styleUrls: ['./label.atom.scss'],
})
export class LabelAtom {
  /** exto do label */
  @Input() text: string = '';

  /** ampo é obrigatório */
  @Input() required: boolean = false;

  /** D do input associado */
  @Input() htmlFor?: string;
}
