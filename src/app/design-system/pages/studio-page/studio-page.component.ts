import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeStudioService } from '../../../core/services/theme-studio.service';
import { WasmColorustService } from '../../../core/services/wasm-colorust.service';
import {
  ButtonAtom,
  BadgeAtom,
  InputAtom,
  AvatarAtom,
  IconAtom,
  SpinnerAtom,
  TextAtom,
  DividerAtom,
  TooltipAtom,
} from '../../atoms';
import {
  SearchFieldMolecule,
  DatePickerMolecule,
  PriceTagMolecule,
  AlertMessageMolecule,
  StatCardMolecule,
  AirlineLogoMolecule,
} from '../../molecules';
import {
  PieChartOrganism,
  ColumnChartOrganism,
  BarChartOrganism,
} from '../../organisms';

export interface StoryNode {
  id: string;
  name: string;
  category: 'Atoms' | 'Molecules' | 'Organisms';
  component: string;
  stories: string[];
}

export interface ActionLog {
  id: string;
  name: string;
  payload: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  steps?: string[];
  timestamp: string;
}

@Component({
  selector: 'page-studio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonAtom,
    BadgeAtom,
    InputAtom,
    IconAtom,
    PriceTagMolecule,
    AlertMessageMolecule,
    StatCardMolecule,
    PieChartOrganism,
    ColumnChartOrganism,
    BarChartOrganism,
  ],
  templateUrl: './studio-page.component.html',
  styleUrls: ['./studio-page.component.scss'],
})
export class StudioPageComponent {
  studioService = inject(ThemeStudioService);
  wasmService = inject(WasmColorustService);

  // Search & Navigation
  searchQuery = signal<string>('');
  selectedComponentId = signal<string>('button');
  selectedStory = signal<string>('Primary');

  // Toolbar state
  selectedViewport = signal<'fluid' | 'desktop' | 'tablet' | 'mobile'>('fluid');
  zoomLevel = signal<number>(100);
  showGrid = signal<boolean>(false);
  showOutlines = signal<boolean>(false);
  isManagerCollapsed = signal<boolean>(false);
  activeAddonTab = signal<'controls' | 'actions' | 'a11y' | 'codegen' | 'chat'>('controls');

  // A11y & Contrast Interactive State
  contrastBg = signal<'#FFFFFF' | '#0F172A'>('#FFFFFF');
  copiedTonalStep = signal<number | null>(null);

  currentContrast = computed(() => {
    return this.wasmService.calcContrast(this.contrastBg(), this.studioService.tokens().primaryColor);
  });

  setContrastBg(bg: '#FFFFFF' | '#0F172A'): void {
    this.contrastBg.set(bg);
    this.logAction('contrastTargetChanged', `background: "${bg}"`);
  }

  inspectMetric(metric: string, val: number): void {
    this.logAction('auditInspect', `metric: "${metric}", value: ${val}`);
  }

  copyTonalStep(hex: string, step: number): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(hex);
    }
    this.copiedTonalStep.set(step);
    this.logAction('colorCopied', `step: ${step}, hex: "${hex}"`);
    setTimeout(() => {
      if (this.copiedTonalStep() === step) {
        this.copiedTonalStep.set(null);
      }
    }, 2000);
  }

  // Interactive Component Knobs (Live Props)
  buttonProps = {
    label: signal<string>('Confirm Booking'),
    variant: signal<'primary' | 'secondary' | 'danger' | 'ghost'>('primary'),
    size: signal<'sm' | 'md' | 'lg'>('md'),
    loading: signal<boolean>(false),
    disabled: signal<boolean>(false),
  };

  badgeProps = {
    text: signal<string>('Confirmed'),
    variant: signal<'default' | 'primary' | 'success' | 'warning' | 'danger' | 'azul' | 'gol' | 'latam'>('success'),
    size: signal<'sm' | 'md'>('md'),
  };

  inputProps = {
    placeholder: signal<string>('Enter passenger name...'),
    value: signal<string>('John Doe'),
    type: signal<'text' | 'number' | 'date' | 'email' | 'password'>('text'),
    error: signal<boolean>(false),
    errorMessage: signal<string>('Invalid format'),
    disabled: signal<boolean>(false),
  };

  priceTagProps = {
    price: signal<number>(349),
    currency: signal<string>('BRL'),
    trend: signal<'up' | 'down' | undefined>('down'),
    discount: signal<number>(20),
  };

  alertProps = {
    message: signal<string>('Flight connection updated successfully.'),
    type: signal<'success' | 'warning' | 'error' | 'info'>('success'),
    dismissible: signal<boolean>(true),
  };

  statCardProps = {
    value: signal<string>('12,450'),
    label: signal<string>('Active Bookings'),
    icon: signal<string>('plane'),
    iconColor: signal<string>('var(--color-primary)'),
  };

  // Actions Log
  actionsLog = signal<ActionLog[]>([
    {
      id: '1',
      name: 'storyRendered',
      payload: '{ story: "Primary", component: "ButtonAtom" }',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  // AI Chat Copilot Feed
  chatMessages = signal<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Hello! I am your native Rustbook AI Copilot. I can inspect tokens, run microsecond APCA contrast audits, mutate component props, and generate multi-platform code via the native MCP server.',
      timestamp: '17:35',
    },
  ]);
  chatInput = signal<string>('');
  isAiProcessing = signal<boolean>(false);

  // Mock data for organisms
  pieData = [
    { label: 'Direct Flights', value: 65, color: 'var(--color-primary)' },
    { label: '1 Stop', value: 25, color: 'var(--color-secondary)' },
    { label: '2+ Stops', value: 10, color: 'var(--color-accent)' },
  ];

  columnData = [
    { label: 'Mon', value: 120 },
    { label: 'Tue', value: 180 },
    { label: 'Wed', value: 240 },
    { label: 'Thu', value: 310 },
    { label: 'Fri', value: 450 },
    { label: 'Sat', value: 380 },
    { label: 'Sun', value: 290 },
  ];

  barData = [
    { label: 'SkyJet Airlines', value: 850 },
    { label: 'AeroGlobal', value: 620 },
    { label: 'CloudWings', value: 490 },
    { label: 'PacificBlue', value: 380 },
  ];

  // Component Tree Schema
  components: StoryNode[] = [
    {
      id: 'button',
      name: 'Button',
      category: 'Atoms',
      component: 'ButtonAtom',
      stories: ['Primary', 'Secondary', 'Danger', 'Ghost', 'Loading', 'Disabled'],
    },
    {
      id: 'badge',
      name: 'Badge',
      category: 'Atoms',
      component: 'BadgeAtom',
      stories: ['Success', 'Warning', 'Danger', 'Info', 'Default'],
    },
    {
      id: 'input',
      name: 'Input',
      category: 'Atoms',
      component: 'InputAtom',
      stories: ['Default', 'With Label', 'With Error', 'Disabled'],
    },
    {
      id: 'price-tag',
      name: 'PriceTag',
      category: 'Molecules',
      component: 'PriceTagMolecule',
      stories: ['Default', 'Discounted', 'Compact'],
    },
    {
      id: 'alert',
      name: 'AlertMessage',
      category: 'Molecules',
      component: 'AlertMessageMolecule',
      stories: ['Success', 'Warning', 'Error', 'Info'],
    },
    {
      id: 'stat-card',
      name: 'StatCard',
      category: 'Molecules',
      component: 'StatCardMolecule',
      stories: ['Up Trend', 'Down Trend', 'Neutral'],
    },
    {
      id: 'pie-chart',
      name: 'PieChart',
      category: 'Organisms',
      component: 'PieChartOrganism',
      stories: ['Flight Distribution'],
    },
    {
      id: 'column-chart',
      name: 'ColumnChart',
      category: 'Organisms',
      component: 'ColumnChartOrganism',
      stories: ['Weekly Traffic'],
    },
    {
      id: 'bar-chart',
      name: 'BarChart',
      category: 'Organisms',
      component: 'BarChartOrganism',
      stories: ['Airline Volume'],
    },
  ];

  filteredComponents = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.components;
    return this.components.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.stories.some((s) => s.toLowerCase().includes(q))
    );
  });

  // Select Component and Story
  selectStory(comp: StoryNode, story: string): void {
    this.selectedComponentId.set(comp.id);
    this.selectedStory.set(story);

    // Apply preset props depending on story
    if (comp.id === 'button') {
      if (story === 'Primary') {
        this.buttonProps.variant.set('primary');
        this.buttonProps.loading.set(false);
        this.buttonProps.disabled.set(false);
      } else if (story === 'Secondary') {
        this.buttonProps.variant.set('secondary');
        this.buttonProps.loading.set(false);
        this.buttonProps.disabled.set(false);
      } else if (story === 'Danger') {
        this.buttonProps.variant.set('danger');
        this.buttonProps.loading.set(false);
        this.buttonProps.disabled.set(false);
      } else if (story === 'Ghost') {
        this.buttonProps.variant.set('ghost');
        this.buttonProps.loading.set(false);
        this.buttonProps.disabled.set(false);
      } else if (story === 'Loading') {
        this.buttonProps.variant.set('primary');
        this.buttonProps.loading.set(true);
      } else if (story === 'Disabled') {
        this.buttonProps.variant.set('primary');
        this.buttonProps.disabled.set(true);
      }
    } else if (comp.id === 'badge') {
      if (story === 'Success') this.badgeProps.variant.set('success');
      else if (story === 'Warning') this.badgeProps.variant.set('warning');
      else if (story === 'Danger') this.badgeProps.variant.set('danger');
      else if (story === 'Primary' || story === 'Info') this.badgeProps.variant.set('primary');
      else this.badgeProps.variant.set('default');
    }

    this.logAction('storySelected', `{ component: "${comp.name}", story: "${story}" }`);
  }

  // Event Handlers for Story Canvas
  onButtonClicked(): void {
    this.logAction('clicked', `event: click, label: "${this.buttonProps.label()}"`);
  }

  onAlertDismissed(): void {
    this.logAction('dismissed', `type: "${this.alertProps.type()}"`);
  }

  onInputValueChange(val: string): void {
    this.inputProps.value.set(val);
    this.logAction('valueChange', `value: "${val}"`);
  }

  logAction(name: string, payload: string): void {
    this.actionsLog.update((logs) => [
      {
        id: Math.random().toString(36).substring(7),
        name,
        payload,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...logs.slice(0, 19),
    ]);
  }

  // Keyboard shortcut listener for '/'
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === '/' && (event.target as HTMLElement).tagName !== 'INPUT') {
      event.preventDefault();
      const input = document.getElementById('story-search-input');
      input?.focus();
    }
  }

  // AI Prompt submission
  sendAiMessage(): void {
    const text = this.chatInput().trim();
    if (!text || this.isAiProcessing()) return;

    this.chatMessages.update((msgs) => [
      ...msgs,
      {
        id: Math.random().toString(36).substring(7),
        sender: 'user',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    this.chatInput.set('');
    this.isAiProcessing.set(true);

    setTimeout(() => {
      this.handleAiResponse(text);
      this.isAiProcessing.set(false);
    }, 800);
  }

  private handleAiResponse(query: string): void {
    const q = query.toLowerCase();
    let replyText = '';
    const steps: string[] = [];

    if (q.includes('contrast') || q.includes('apca') || q.includes('wcag')) {
      const contrast = this.wasmService.calcContrast('#FFFFFF', this.studioService.tokens().primaryColor);
      steps.push('[Inspect] Searched active tokens and computed OKLCH space');
      steps.push('[MCP Tool] Ran audit_color_contrast (0.01ms)');
      replyText = `Audited foreground #FFFFFF against ${this.studioService.tokens().primaryColor}: WCAG Ratio is ${contrast.wcagRatio}:1 (${contrast.wcagPass ? 'PASS AA' : 'FAIL'}), APCA Lc is ${contrast.apcaLc} (${contrast.apcaPass ? 'PASS' : 'FAIL'}).`;
    } else if (q.includes('loading') || q.includes('spin')) {
      this.buttonProps.loading.set(true);
      steps.push('[Inspect] Inspected ButtonAtom schema');
      steps.push('[MCP Tool] Ran mutate_component_prop');
      steps.push('[Success] Updated buttonLoading to true in Canvas');
      replyText = `I have toggled the loading state on the ButtonAtom component.`;
    } else if (q.includes('danger') || q.includes('delete') || q.includes('red')) {
      this.buttonProps.variant.set('danger');
      steps.push('[MCP Tool] Ran set_variant("danger")');
      replyText = `Set ButtonAtom variant to danger.`;
    } else {
      steps.push('[Inspect] Queried Rustbook Native MCP Server');
      steps.push('[MCP Tool] Ran list_design_tokens');
      replyText = `I analyzed your request against the design token schema. All components are aligned with current OKLCH tokens.`;
    }

    this.chatMessages.update((msgs) => [
      ...msgs,
      {
        id: Math.random().toString(36).substring(7),
        sender: 'assistant',
        text: replyText,
        steps,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }
}
