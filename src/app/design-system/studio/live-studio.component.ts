import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { ThemeStudioService, THEME_PRESETS, ThemePreset } from '../../core/services/theme-studio.service';
import { IconAtom, ButtonAtom } from '../atoms';

@Component({
  selector: 'app-live-studio',
  standalone: true,
  imports: [CommonModule, FormsModule, IconAtom, ButtonAtom],
  templateUrl: './live-studio.component.html',
  styleUrls: ['./live-studio.component.scss'],
})
export class LiveStudioComponent {
  studioService = inject(ThemeStudioService);
  private router = inject(Router);

  readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  readonly isStudioRoute = computed(() => {
    const url = this.currentUrl();
    return url ? url.includes('/studio') : false;
  });

  activeTab = signal<'theme' | 'colorust' | 'knobs' | 'export'>('theme');
  presets = THEME_PRESETS;
  copiedToast = signal<string | null>(null);

  // Component Knob test state
  buttonLabel = signal<string>('Book Flight');
  buttonVariant = signal<'primary' | 'secondary' | 'danger' | 'ghost'>('primary');
  buttonSize = signal<'sm' | 'md' | 'lg'>('md');
  buttonLoading = signal<boolean>(false);
  buttonDisabled = signal<boolean>(false);

  fontOptions = [
    { label: 'Inter (Modern Sans)', value: 'Inter, system-ui, -apple-system, sans-serif' },
    { label: 'System UI (Native OS)', value: 'system-ui, -apple-system, sans-serif' },
    { label: 'Outfit (Geometric Clean)', value: 'Outfit, system-ui, sans-serif' },
    { label: 'Roboto (Google Classic)', value: 'Roboto, system-ui, sans-serif' },
    { label: 'JetBrains Mono (Developer Mono)', value: 'JetBrains Mono, monospace' },
  ];

  onColorChange(type: 'primary' | 'secondary' | 'accent', value: string): void {
    if (type === 'primary') this.studioService.setPrimaryColor(value);
    if (type === 'secondary') this.studioService.setSecondaryColor(value);
    if (type === 'accent') this.studioService.setAccentColor(value);
  }

  onRadiusChange(radius: number): void {
    this.studioService.setBorderRadius(Number(radius));
  }

  onFontChange(font: string): void {
    this.studioService.setFontFamily(font);
  }

  onModeToggle(): void {
    const nextMode = this.studioService.tokens().mode === 'light' ? 'dark' : 'light';
    this.studioService.setThemeMode(nextMode);
  }

  onPresetClick(preset: ThemePreset): void {
    this.studioService.applyPreset(preset.id);
  }

  onReset(): void {
    this.studioService.resetToDefaults();
  }

  copyToClipboard(text: string, label: string): void {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.copiedToast.set(`${label} copied to clipboard!`);
        setTimeout(() => this.copiedToast.set(null), 2500);
      });
    }
  }

  getKnobButtonCode(): string {
    return `<atom-button
  label="${this.buttonLabel()}"
  variant="${this.buttonVariant()}"
  size="${this.buttonSize()}"
  [loading]="${this.buttonLoading()}"
  [disabled]="${this.buttonDisabled()}">
</atom-button>`;
  }
}
