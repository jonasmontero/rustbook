import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconAtom, TextAtom, ButtonAtom } from '../../atoms';

/**
 * lertMessageMolecule - Mensagem de Alerta
 */
@Component({
  selector: 'molecule-alert-message',
  standalone: true,
  imports: [CommonModule, IconAtom, TextAtom, ButtonAtom],
  template: `
    <div [class]="getAlertClasses()">
      <atom-icon [name]="getIcon()" size="md" [color]="getIconColor()" />
      <atom-text variant="body" class="molecule-alert-message__text">{{ message }}</atom-text>
      @if (dismissible) {
        <atom-button
          variant="ghost"
          size="sm"
          icon="x"
          label=""
          (clicked)="onDismiss()"
          class="molecule-alert-message__close"
        />
      }
    </div>
  `,
  styleUrls: ['./alert-message.molecule.scss'],
})
export class AlertMessageMolecule {
  @Input() type: 'info' | 'success' | 'warning' | 'error' = 'info';
  @Input() message: string = '';
  @Input() dismissible: boolean = false;
  @Output() dismiss = new EventEmitter<void>();

  getIcon(): string {
    const icons = { info: 'info', success: 'check', warning: 'warning', error: 'x' };
    return icons[this.type];
  }

  getIconColor(): string {
    const colors = { info: '#2563EB', success: '#10B981', warning: '#F59E0B', error: '#EF4444' };
    return colors[this.type];
  }

  getAlertClasses(): string {
    return ['molecule-alert-message', `molecule-alert-message--${this.type}`].join(' ');
  }

  onDismiss(): void {
    this.dismiss.emit();
  }
}
