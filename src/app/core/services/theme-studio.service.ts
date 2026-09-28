/**
 * Theme Studio Service
 *
 * Real-time theme customizer and design token engine.
 * Applies CSS custom properties dynamically to document root,
 * manages presets, domain switching, and persists customizations in localStorage.
 */

import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type DomainType = 'travel' | 'finance' | 'ecommerce' | 'core';
export type ThemeMode = 'light' | 'dark';

export interface ThemeTokens {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: number; // in pixels for medium radius
  fontFamily: string;
  mode: ThemeMode;
  activeDomain: DomainType;
}

export interface ThemePreset {
  id: string;
  name: string;
  domain: DomainType;
  tokens: ThemeTokens;
}

export const DEFAULT_TOKENS: ThemeTokens = {
  primaryColor: '#2563EB',
  secondaryColor: '#64748B',
  accentColor: '#10B981',
  borderRadius: 8,
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  mode: 'light',
  activeDomain: 'travel',
};

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'travel-sky',
    name: 'SkyCompare (Travel)',
    domain: 'travel',
    tokens: {
      primaryColor: '#2563EB',
      secondaryColor: '#0284C7',
      accentColor: '#F59E0B',
      borderRadius: 8,
      fontFamily: 'Inter, system-ui, sans-serif',
      mode: 'light',
      activeDomain: 'travel',
    },
  },
  {
    id: 'finance-emerald',
    name: 'PayPulse (FinTech)',
    domain: 'finance',
    tokens: {
      primaryColor: '#059669',
      secondaryColor: '#10B981',
      accentColor: '#6366F1',
      borderRadius: 6,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      mode: 'light',
      activeDomain: 'finance',
    },
  },
  {
    id: 'ecommerce-violet',
    name: 'PriceRadar (E-Commerce)',
    domain: 'ecommerce',
    tokens: {
      primaryColor: '#7C3AED',
      secondaryColor: '#EC4899',
      accentColor: '#F97316',
      borderRadius: 12,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      mode: 'light',
      activeDomain: 'ecommerce',
    },
  },
  {
    id: 'dark-obsidian',
    name: 'Obsidian Night (Dark Mode)',
    domain: 'core',
    tokens: {
      primaryColor: '#38BDF8',
      secondaryColor: '#818CF8',
      accentColor: '#34D399',
      borderRadius: 8,
      fontFamily: 'Inter, system-ui, sans-serif',
      mode: 'dark',
      activeDomain: 'core',
    },
  },
  {
    id: 'minimalist-mono',
    name: 'Minimalist Clean',
    domain: 'core',
    tokens: {
      primaryColor: '#18181B',
      secondaryColor: '#71717A',
      accentColor: '#0284C7',
      borderRadius: 2,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      mode: 'light',
      activeDomain: 'core',
    },
  },
];

@Injectable({ providedIn: 'root' })
export class ThemeStudioService {
  private platformId = inject(PLATFORM_ID);
  private storageKey = 'skycompare_theme_tokens_v1';

  tokens = signal<ThemeTokens>(this.loadInitialTokens());
  isStudioOpen = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.applyTokensToDocument(this.tokens());
    }
  }

  toggleStudio(): void {
    this.isStudioOpen.update((val) => !val);
  }

  setPrimaryColor(color: string): void {
    this.updateTokens({ primaryColor: color });
  }

  setSecondaryColor(color: string): void {
    this.updateTokens({ secondaryColor: color });
  }

  setAccentColor(color: string): void {
    this.updateTokens({ accentColor: color });
  }

  setBorderRadius(radius: number): void {
    this.updateTokens({ borderRadius: radius });
  }

  setFontFamily(font: string): void {
    this.updateTokens({ fontFamily: font });
  }

  setThemeMode(mode: ThemeMode): void {
    this.updateTokens({ mode });
  }

  toggleThemeMode(): void {
    const nextMode = this.tokens().mode === 'light' ? 'dark' : 'light';
    this.setThemeMode(nextMode);
  }

  setActiveDomain(domain: DomainType): void {
    this.updateTokens({ activeDomain: domain });
  }

  applyPreset(presetId: string): void {
    const preset = THEME_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      this.tokens.set({ ...preset.tokens });
      this.persistAndApply(this.tokens());
    }
  }

  resetToDefaults(): void {
    this.tokens.set({ ...DEFAULT_TOKENS });
    this.persistAndApply(DEFAULT_TOKENS);
  }

  private updateTokens(partial: Partial<ThemeTokens>): void {
    const updated = { ...this.tokens(), ...partial };
    this.tokens.set(updated);
    this.persistAndApply(updated);
  }

  private persistAndApply(tokens: ThemeTokens): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(tokens));
      } catch (e) {
        console.warn('Unable to persist tokens to localStorage', e);
      }
      this.applyTokensToDocument(tokens);
    }
  }

  private loadInitialTokens(): ThemeTokens {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          return { ...DEFAULT_TOKENS, ...JSON.parse(stored) };
        }
      } catch (e) {
        console.warn('Unable to read tokens from localStorage', e);
      }
    }
    return { ...DEFAULT_TOKENS };
  }

  private applyTokensToDocument(tokens: ThemeTokens): void {
    const root = document.documentElement;

    root.style.setProperty('--color-primary', tokens.primaryColor);
    root.style.setProperty('--color-primary-hover', this.adjustBrightness(tokens.primaryColor, -15));
    root.style.setProperty('--color-primary-active', this.adjustBrightness(tokens.primaryColor, -25));

    root.style.setProperty('--color-secondary', tokens.secondaryColor);
    root.style.setProperty('--color-accent', tokens.accentColor);

    // Border radius scale
    const baseRadius = tokens.borderRadius;
    root.style.setProperty('--radius-sm', `${Math.max(2, Math.round(baseRadius * 0.5))}px`);
    root.style.setProperty('--radius-md', `${baseRadius}px`);
    root.style.setProperty('--radius-lg', `${Math.round(baseRadius * 1.5)}px`);
    root.style.setProperty('--radius-xl', `${Math.round(baseRadius * 2)}px`);
    root.style.setProperty('--radius-full', '9999px');

    // Font Family
    root.style.setProperty('--font-family', tokens.fontFamily);

    // Theme Mode (Light / Dark)
    if (tokens.mode === 'dark') {
      root.classList.add('dark-theme');
      root.style.setProperty('--bg-primary', '#0F172A');
      root.style.setProperty('--bg-secondary', '#1E293B');
      root.style.setProperty('--text-primary', '#F8FAFC');
      root.style.setProperty('--text-secondary', '#94A3B8');
      root.style.setProperty('--border-color', '#334155');
    } else {
      root.classList.remove('dark-theme');
      root.style.setProperty('--bg-primary', '#FFFFFF');
      root.style.setProperty('--bg-secondary', '#F8FAFC');
      root.style.setProperty('--text-primary', '#0F172A');
      root.style.setProperty('--text-secondary', '#64748B');
      root.style.setProperty('--border-color', '#E2E8F0');
    }
  }

  activeCvd = signal<string>('normal');

  setCvd(type: string): void {
    this.activeCvd.set(type);
    if (isPlatformBrowser(this.platformId)) {
      const root = document.documentElement;
      root.classList.remove('cvd-protanopia', 'cvd-deuteranopia', 'cvd-tritanopia', 'cvd-achromatopsia');
      if (type !== 'normal') {
        root.classList.add(`cvd-${type}`);
      }
    }
  }

  calcContrast(fgHex: string, bgHex: string): { wcagRatio: number; wcagPass: boolean; apcaLc: number; apcaPass: boolean } {
    const toLinear = (hex: string) => {
      const c = hex.replace('#', '');
      const r = parseInt(c.substring(0, 2), 16) / 255;
      const g = parseInt(c.substring(2, 4), 16) / 255;
      const b = parseInt(c.substring(4, 6), 16) / 255;
      const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
      return { r: lin(r), g: lin(g), b: lin(b) };
    };

    const fgLin = toLinear(fgHex);
    const bgLin = toLinear(bgHex);

    const lumFg = 0.2126 * fgLin.r + 0.7152 * fgLin.g + 0.0722 * fgLin.b;
    const lumBg = 0.2126 * bgLin.r + 0.7152 * bgLin.g + 0.0722 * bgLin.b;

    const lighter = Math.max(lumFg, lumBg);
    const darker = Math.min(lumFg, lumBg);
    const wcagRatio = Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100;

    // APCA calculation
    let apcaLc = 0;
    if (lumBg > lumFg) {
      apcaLc = Math.round((Math.pow(lumBg, 0.56) - Math.pow(lumFg, 0.57)) * 114);
    } else {
      apcaLc = Math.round((Math.pow(lumBg, 0.62) - Math.pow(lumFg, 0.65)) * -114);
    }

    return {
      wcagRatio,
      wcagPass: wcagRatio >= 4.5,
      apcaLc,
      apcaPass: Math.abs(apcaLc) >= 60,
    };
  }

  generateTonalScale(baseHex: string): Array<{ step: number; hex: string }> {
    const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    const percents = [85, 70, 50, 30, 15, 0, -15, -30, -50, -70, -85];

    return steps.map((step, idx) => ({
      step,
      hex: this.adjustBrightness(baseHex, percents[idx]),
    }));
  }

  exportCss(): string {
    const t = this.tokens();
    return `:root {
  /* Brand Tokens */
  --color-primary: ${t.primaryColor};
  --color-secondary: ${t.secondaryColor};
  --color-accent: ${t.accentColor};

  /* Radius Tokens */
  --radius-sm: ${Math.round(t.borderRadius * 0.5)}px;
  --radius-md: ${t.borderRadius}px;
  --radius-lg: ${Math.round(t.borderRadius * 1.5)}px;
  --radius-xl: ${Math.round(t.borderRadius * 2)}px;

  /* Typography Tokens */
  --font-family: ${t.fontFamily};
}`;
  }

  exportJson(): string {
    return JSON.stringify(this.tokens(), null, 2);
  }

  exportTailwind(): string {
    const t = this.tokens();
    return `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${t.primaryColor}',
        secondary: '${t.secondaryColor}',
        accent: '${t.accentColor}',
      },
      borderRadius: {
        sm: '${Math.round(t.borderRadius * 0.5)}px',
        md: '${t.borderRadius}px',
        lg: '${Math.round(t.borderRadius * 1.5)}px',
        xl: '${Math.round(t.borderRadius * 2)}px',
      }
    }
  }
};`;
  }

  exportSwift(): string {
    const t = this.tokens();
    return `// Generated by Rustbook Core Engine
import SwiftUI

extension Color {
    static let brandPrimary = Color(hex: "${t.primaryColor}")
    static let brandSecondary = Color(hex: "${t.secondaryColor}")
    static let brandAccent = Color(hex: "${t.accentColor}")
}`;
  }

  exportKotlin(): string {
    const t = this.tokens();
    return `// Generated by Rustbook Core Engine
package com.rustbook.designsystem.theme

import androidx.compose.ui.graphics.Color

val BrandPrimary = Color(0xFF${t.primaryColor.replace('#', '')})
val BrandSecondary = Color(0xFF${t.secondaryColor.replace('#', '')})
val BrandAccent = Color(0xFF${t.accentColor.replace('#', '')})`;
  }

  exportFlutter(): string {
    const t = this.tokens();
    return `// Generated by Rustbook Core Engine
import 'package:flutter/material.dart';

class RustbookTheme {
  static const Color primary = Color(0xFF${t.primaryColor.replace('#', '')});
  static const Color secondary = Color(0xFF${t.secondaryColor.replace('#', '')});
  static const Color accent = Color(0xFF${t.accentColor.replace('#', '')});
  static const double borderRadius = ${t.borderRadius};
}`;
  }

  private adjustBrightness(hex: string, percent: number): string {
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length !== 6) return hex;

    const num = parseInt(cleanHex, 16);
    let r = (num >> 16) + Math.round(255 * (percent / 100));
    let g = ((num >> 8) & 0x00ff) + Math.round(255 * (percent / 100));
    let b = (num & 0x0000ff) + Math.round(255 * (percent / 100));

    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }
}
