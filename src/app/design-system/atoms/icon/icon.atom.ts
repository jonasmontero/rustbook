import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

undefined
@Component({
  selector: 'atom-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.width]="sizeInPx"
      [attr.height]="sizeInPx"
      [attr.viewBox]="'0 0 24 24'"
      [attr.fill]="color || 'currentColor'"
      class="atom-icon"
      [class]="'atom-icon--' + size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path [attr.d]="getIconPath()" />
    </svg>
  `,
  styleUrls: ['./icon.atom.scss'],
})
export class IconAtom {
  /** ome do ícone do registry */
  @Input() name: string = 'search';

  /** amanho do ícone */
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** or customizada (opcional, usa currentColor por padrão) */
  @Input() color?: string;

  /** egistry de SVG paths */
  private iconPaths: Record<string, string> = {
    plane:
      'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z',
    calendar:
      'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z',
    search:
      'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
    'arrow-right':
      'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
    'arrow-left':
      'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
    'chevron-down': 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z',
    check:
      'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    x: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    star: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    heart:
      'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
    warning:
      'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
    user: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
    filter:
      'M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z',
  };

  /** etorna o tamanho em pixels baseado na prop size */
  get sizeInPx(): number {
    const sizes = { sm: 16, md: 20, lg: 24, xl: 32 };
    return sizes[this.size];
  }

  /** etorna o SVG path do ícone selecionado */
  getIconPath(): string {
    return this.iconPaths[this.name] || this.iconPaths['search'];
  }
}
