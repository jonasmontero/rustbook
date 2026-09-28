import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * vatarAtom - Avatar/Logo
 *
 * omponente para exibir avatares ou logos de companhias aéreas.
 * uporta imagem ou fallback com iniciais.
 *
 * @example
 * <atom-avatar src="azul-logo.png" alt="Azul" />
 * <atom-avatar fallback="AZ" [size]="lg" />
 */
@Component({
  selector: 'atom-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getAvatarClasses()">
      @if (src && !imageError) {
        <img
          [src]="src"
          [alt]="alt"
          (error)="onImageError()"
          class="atom-avatar__image"
        />
      } @else {
        <span class="atom-avatar__fallback">{{ getFallbackText() }}</span>
      }
    </div>
  `,
  styleUrls: ['./avatar.atom.scss'],
})
export class AvatarAtom {
  /** RL da imagem */
  @Input() src?: string;

  /** exto alternativo */
  @Input() alt: string = '';

  /** amanho do avatar */
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** exto fallback (iniciais) */
  @Input() fallback?: string;

  /** or de fundo do fallback */
  @Input() bgColor?: string;

  /** lag para rastrear erro de imagem */
  imageError: boolean = false;

  /** etorna classes CSS do avatar */
  getAvatarClasses(): string {
    return ['atom-avatar', `atom-avatar--${this.size}`].join(' ');
  }

  /** etorna texto do fallback */
  getFallbackText(): string {
    if (this.fallback) {
      return this.fallback;
    }

    // Gerar iniciais do alt
    if (this.alt) {
      const words = this.alt.trim().split(' ');
      if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
      }
      return this.alt.substring(0, 2).toUpperCase();
    }

    return '?';
  }

  /** andler de erro de imagem */
  onImageError(): void {
    this.imageError = true;
  }
}
