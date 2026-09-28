import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ooltipAtom - Dica/Tooltip
 *
 * omponente para exibir dicas contextuais ao passar o mouse.
 * uporta 4 posições: top, bottom, left, right.
 *
 * @example
 * <atom-tooltip text="Informação adicional" position="top">
 *   <button>Hover me</button>
 * </atom-tooltip>
 */
@Component({
  selector: 'atom-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="atom-tooltip" (mouseenter)="show()" (mouseleave)="hide()">
      <ng-content></ng-content>
      @if (isVisible) {
        <div
          [class]="getTooltipClasses()"
          role="tooltip"
          [attr.aria-label]="text"
        >
          {{ text }}
          <div class="atom-tooltip__arrow"></div>
        </div>
      }
    </div>
  `,
  styleUrls: ['./tooltip.atom.scss'],
})
export class TooltipAtom {
  /** exto do tooltip */
  @Input() text: string = '';

  /** osição do tooltip */
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  /** elay para aparecer (ms) */
  @Input() delay: number = 200;

  /** stado de visibilidade */
  isVisible: boolean = false;

  /** imeout para delay */
  private showTimeout?: ReturnType<typeof setTimeout>;

  /** etorna classes CSS do tooltip */
  getTooltipClasses(): string {
    return [
      'atom-tooltip__content',
      `atom-tooltip__content--${this.position}`,
    ].join(' ');
  }

  /** ostra tooltip com delay */
  show(): void {
    this.showTimeout = setTimeout(() => {
      this.isVisible = true;
    }, this.delay);
  }

  /** sconde tooltip */
  hide(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    this.isVisible = false;
  }

  /** leanup on destroy */
  ngOnDestroy(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
  }
}
