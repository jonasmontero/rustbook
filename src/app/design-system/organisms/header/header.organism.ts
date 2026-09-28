/**
 * eaderOrganism
 * abeçalho principal da aplicação
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconAtom, TextAtom, AvatarAtom } from '../../atoms';
import { SearchFieldMolecule } from '../../molecules';

@Component({
  selector: 'organism-header',
  standalone: true,
  imports: [CommonModule, IconAtom, TextAtom, AvatarAtom, SearchFieldMolecule],
  templateUrl: './header.organism.html',
  styleUrls: ['./header.organism.scss'],
})
export class HeaderOrganism {
  @Input() showSearch: boolean = true;
  @Input() userAvatar?: string;
  @Input() userName?: string = 'Usuário';

  @Output() menuClick = new EventEmitter<void>();
  @Output() searchSubmit = new EventEmitter<string>();
  @Output() userClick = new EventEmitter<void>();

  searchValue: string = '';

  onMenuClick(): void {
    this.menuClick.emit();
  }

  onSearch(value: string): void {
    this.searchValue = value;
    this.searchSubmit.emit(value);
  }

  onUserClick(): void {
    this.userClick.emit();
  }
}
