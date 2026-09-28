import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconAtom, SpinnerAtom } from '../../atoms';

@Component({
  selector: 'molecule-search-field',
  standalone: true,
  imports: [CommonModule, FormsModule, IconAtom, SpinnerAtom],
  template: `
    <div [class]="getSearchFieldClasses()">
      <atom-icon
        name="search"
        size="md"
        class="molecule-search-field__icon"
      />

      <input
        type="text"
        [placeholder]="placeholder"
        [ngModel]="value"
        (ngModelChange)="onValueChange($event)"
        [disabled]="loading"
        (keyup.enter)="onSearch()"
        class="molecule-search-field__input"
      />

      @if (value) {
        <button
          type="button"
          class="molecule-search-field__clear-btn"
          (click)="onClear()"
          [disabled]="loading"
          title="Clear search"
        >
          <atom-icon name="x" size="sm" />
        </button>
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
  @Input() placeholder: string = 'Search...';
  @Input() value: string = '';
  @Input() loading: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();
  @Output() valueChange = new EventEmitter<string>();

  getSearchFieldClasses(): string {
    return [
      'molecule-search-field',
      `molecule-search-field--${this.size}`,
      this.loading ? 'molecule-search-field--loading' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onValueChange(newValue: string): void {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }

  onSearch(): void {
    if (this.loading || !this.value || !this.value.trim()) {
      return;
    }
    this.search.emit(this.value.trim());
  }

  onClear(): void {
    this.value = '';
    this.valueChange.emit('');
    this.clear.emit();
  }
}
