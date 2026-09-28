import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconAtom, InputAtom, ButtonAtom, SpinnerAtom } from '../../atoms';

/**
 * earchFieldMolecule - Campo de Busca
 *
 * olécula que combina input com ícone de busca e botão de limpar.
 * sado para busca de aeroportos, destinos, etc.
 *
 * @example
 * <molecule-search-field
 *   placeholder="Search destino..."
 *   (search)="handleSearch($event)"
 * />
 */
@Component({
  selector: 'molecule-search-field',
  standalone: true,
  imports: [CommonModule, FormsModule, IconAtom, InputAtom, ButtonAtom, SpinnerAtom],
  template: `
    <div [class]="getSearchFieldClasses()">
      <atom-icon
        name="search"
        size="md"
        class="molecule-search-field__icon"
      />

      <atom-input
        [type]="'text'"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="loading"
        (valueChange)="onValueChange($event)"
        (keyup.enter)="onSearch()"
        class="molecule-search-field__input"
      />

      @if (value) {
        <atom-button
          variant="ghost"
          size="sm"
          icon="x"
          [disabled]="loading"
          (clicked)="onClear()"
          class="molecule-search-field__clear"
          label=""
        />
      }

      @if (loading) {
        <div class="molecule-search-field__loading">
          <atom-spinner size="sm" />
        </div>
      }
    </div>
  `,
  styleUrls: ['./search-field.molecule.scss'],
})
export class SearchFieldMolecule {
  /** laceholder do input */
  @Input() placeholder: string = 'Search...';

  /** alor do input */
  @Input() value: string = '';

  /** stado de loading */
  @Input() loading: boolean = false;

  /** amanho do campo */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** mite quando o usuário faz busca (Enter ou botão) */
  @Output() search = new EventEmitter<string>();

  /** mite quando o campo é limpo */
  @Output() clear = new EventEmitter<void>();

  /** mite quando o valor muda */
  @Output() valueChange = new EventEmitter<string>();

  /** etorna classes CSS do search field */
  getSearchFieldClasses(): string {
    return [
      'molecule-search-field',
      `molecule-search-field--${this.size}`,
      this.loading ? 'molecule-search-field--loading' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /** andler de mudança de valor */
  onValueChange(newValue: string): void {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }

  /** andler de busca */
  onSearch(): void {
    if (this.value.trim() && !this.loading) {
      this.search.emit(this.value.trim());
    }
  }

  /** andler de limpar */
  onClear(): void {
    this.value = '';
    this.valueChange.emit('');
    this.clear.emit();
  }
}
