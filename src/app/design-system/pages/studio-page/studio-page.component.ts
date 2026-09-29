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

  // View Mode Switcher (Canonical Storybook Canvas vs Docs)
  viewMode = signal<'canvas' | 'docs'>('canvas');
  showDocsCode = signal<boolean>(false);
  copiedDocsCode = signal<boolean>(false);

  copyDocsCode(code: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    this.copiedDocsCode.set(true);
    this.logAction('codeCopied', `format: "angular_template"`);
    setTimeout(() => this.copiedDocsCode.set(false), 2000);
  }

  // Component Documentation & API Reference Metadata (Autodocs)
  componentDocsMap: Record<
    string,
    {
      name: string;
      tag: string;
      category: string;
      status: string;
      package: string;
      summary: string;
      dos: string[];
      donts: string[];
      props: Array<{ name: string; type: string; defaultValue: string; description: string }>;
    }
  > = {
    button: {
      name: 'ButtonAtom',
      tag: '<atom-button>',
      category: 'Atoms',
      status: 'Production Ready (Stable)',
      package: '@skycompare/design-system/atoms',
      summary:
        'Buttons are the primary interactive triggers across the SkyCompare ecosystem. They guide user journeys, submit booking forms, and initiate asynchronous flight searches with built-in accessibility focus management.',
      dos: [
        'Use the Primary variant for the single most important action on a screen (e.g. "Confirm Booking").',
        'Use Secondary and Ghost variants for auxiliary actions like "Cancel" or "View Details".',
        'Enable the loading state during flight search and payment processing to prevent duplicate submissions.',
      ],
      donts: [
        'Do not place more than one Primary button in the same visual section.',
        'Do not use Danger buttons for non-destructive actions.',
        'Avoid wrapping buttons inside anchor links without proper ARIA role attribution.',
      ],
      props: [
        { name: 'label', type: 'string', defaultValue: "'Button'", description: 'The text label rendered inside the button element.' },
        { name: 'variant', type: "'primary' | 'secondary' | 'danger' | 'ghost'", defaultValue: "'primary'", description: 'Visual hierarchy and semantic brand coloring.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Dimensions and internal padding scale.' },
        { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Renders an inline spinner and disables click interactions.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Visually dims the button and suppresses click events.' },
        { name: '(clicked)', type: 'EventEmitter<void>', defaultValue: '-', description: 'Event dispatched on mouse click or keyboard trigger (Enter/Space).' },
      ],
    },
    badge: {
      name: 'BadgeAtom',
      tag: '<atom-badge>',
      category: 'Atoms',
      status: 'Production Ready (Stable)',
      package: '@skycompare/design-system/atoms',
      summary:
        'Badges provide compact, high-contrast visual indicators for statuses, airline brand partners, flight tags, and numerical badges.',
      dos: [
        'Use Success badges for confirmed bookings and on-time flight statuses.',
        'Use Airline variants (Azul, Gol, Latam) to clearly communicate partner flight operators.',
      ],
      donts: [
        'Do not use badges as clickable buttons; use ButtonAtom or ChipAtom instead.',
        'Avoid overly long text inside badges (keep under 16 characters).',
      ],
      props: [
        { name: 'text', type: 'string', defaultValue: "''", description: 'Text label displayed inside the badge capsule.' },
        { name: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'danger' | 'azul' | 'gol' | 'latam'", defaultValue: "'default'", description: 'Semantic status or airline corporate identity color.' },
        { name: 'size', type: "'sm' | 'md'", defaultValue: "'md'", description: 'Capsule height and typography scale.' },
      ],
    },
    input: {
      name: 'InputAtom',
      tag: '<atom-input>',
      category: 'Atoms',
      status: 'Production Ready (Stable)',
      package: '@skycompare/design-system/atoms',
      summary:
        'Single-line text input fields engineered for passenger data entry, flight search queries, passport numbers, and discount codes with reactive validation states.',
      dos: [
        'Always provide descriptive placeholder text and clear error messages.',
        'Pair with reactive Angular forms via ngModel or FormControl.',
      ],
      donts: [
        'Do not rely solely on placeholder text for field context; pair with visible labels where appropriate.',
      ],
      props: [
        { name: 'placeholder', type: 'string', defaultValue: "''", description: 'Hint text visible when the input field is empty.' },
        { name: 'type', type: "'text' | 'number' | 'date' | 'email' | 'password'", defaultValue: "'text'", description: 'HTML input type defining keyboard layout and formatting.' },
        { name: 'error', type: 'boolean', defaultValue: 'false', description: 'Applies destructive outline and displays the error message icon.' },
        { name: 'errorMessage', type: 'string', defaultValue: "''", description: 'Validation feedback message displayed beneath the input.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Prevents typing and dims the input container.' },
        { name: '(ngModelChange)', type: 'EventEmitter<string>', defaultValue: '-', description: 'Dispatches new values on user typing.' },
      ],
    },
    'price-tag': {
      name: 'PriceTagMolecule',
      tag: '<molecule-price-tag>',
      category: 'Molecules',
      status: 'Production Ready (Stable)',
      package: '@skycompare/design-system/molecules',
      summary:
        'Specialized monetary display molecule combining localized currency formatting, price trend indicators (up/down), and discount percentage pills for flight fares.',
      dos: [
        'Use prominently in flight cards and fare comparison matrices.',
        'Highlight discount percentages when promotional fares are active.',
      ],
      donts: [
        'Do not hardcode currency symbols; use the ISO currency code prop.',
      ],
      props: [
        { name: 'price', type: 'number', defaultValue: '0', description: 'Numeric fare amount.' },
        { name: 'currency', type: 'string', defaultValue: "'BRL'", description: 'ISO 4217 currency code (BRL, USD, EUR).' },
        { name: 'trend', type: "'up' | 'down' | undefined", defaultValue: 'undefined', description: 'Visual arrow indicating recent fare price movements.' },
        { name: 'discountPercentage', type: 'number', defaultValue: '0', description: 'Promotional discount badge displayed beside the price.' },
      ],
    },
    alert: {
      name: 'AlertMessageMolecule',
      tag: '<molecule-alert-message>',
      category: 'Molecules',
      status: 'Production Ready (Stable)',
      package: '@skycompare/design-system/molecules',
      summary:
        'Feedback notification banners communicating flight delay notices, booking confirmations, baggage policy warnings, and system alerts.',
      dos: [
        'Place prominently near the relevant user action or at the top of the workflow container.',
        'Allow dismissible interaction for non-critical informational notices.',
      ],
      donts: [
        'Do not stack multiple alerts of the same type sequentially.',
      ],
      props: [
        { name: 'message', type: 'string', defaultValue: "''", description: 'The notification message body.' },
        { name: 'type', type: "'success' | 'warning' | 'error' | 'info'", defaultValue: "'info'", description: 'Contextual severity and icon branding.' },
        { name: 'dismissible', type: 'boolean', defaultValue: 'true', description: 'Displays a close button allowing users to dismiss the banner.' },
        { name: '(dismissed)', type: 'EventEmitter<void>', defaultValue: '-', description: 'Dispatched when the user clicks the close button.' },
      ],
    },
    'stat-card': {
      name: 'StatCardMolecule',
      tag: '<molecule-stat-card>',
      category: 'Molecules',
      status: 'Production Ready (Stable)',
      package: '@skycompare/design-system/molecules',
      summary:
        'KPI metric card for operational dashboards, showing total bookings, active flights, and revenue statistics with iconography and comparative indicators.',
      dos: [
        'Use in grid layouts (2, 3, or 4 columns) at the top of analytical dashboards.',
      ],
      donts: [
        'Avoid overloading cards with paragraphs of text; keep to single metrics and concise labels.',
      ],
      props: [
        { name: 'value', type: 'string', defaultValue: "''", description: 'The primary headline metric value (e.g. 12,450).' },
        { name: 'label', type: 'string', defaultValue: "''", description: 'Descriptive sub-label for the KPI.' },
        { name: 'icon', type: 'string', defaultValue: "'plane'", description: 'Icon identifier displayed in the top-right corner.' },
        { name: 'iconColor', type: 'string', defaultValue: "'var(--color-primary)'", description: 'CSS color applied to the icon background pill.' },
      ],
    },
    'pie-chart': {
      name: 'PieChartOrganism',
      tag: '<organism-pie-chart>',
      category: 'Organisms',
      status: 'Production Ready (Stable)',
      package: '@skycompare/design-system/organisms',
      summary:
        'SVG proportional distribution donut/pie chart visualization with dynamic legends and responsive hover slice inspection.',
      dos: [
        'Use for categorical distributions with 2 to 6 data slices (e.g. Direct vs 1-Stop flights).',
      ],
      donts: [
        'Avoid using with more than 7 slices; use ColumnChartOrganism or BarChartOrganism instead.',
      ],
      props: [
        { name: 'data', type: 'Array<{ label: string; value: number; color: string }>', defaultValue: '[]', description: 'Array of data slices with labels, numeric weights, and color tokens.' },
        { name: 'size', type: 'number', defaultValue: '240', description: 'Diameter of the SVG chart in pixels.' },
      ],
    },
    'column-chart': {
      name: 'ColumnChartOrganism',
      tag: '<organism-column-chart>',
      category: 'Organisms',
      status: 'Production Ready (Stable)',
      package: '@skycompare/design-system/organisms',
      summary:
        'Vertical column bar chart organism for temporal trends (e.g. daily booking volumes, weekly passenger traffic).',
      dos: [
        'Use for time-series comparisons like days of the week or monthly metrics.',
      ],
      donts: [
        'Do not use if category labels are excessively long (use BarChartOrganism for long labels).',
      ],
      props: [
        { name: 'data', type: 'Array<{ label: string; value: number }>', defaultValue: '[]', description: 'Array of bar objects containing labels and numeric values.' },
        { name: 'height', type: 'number', defaultValue: '220', description: 'Total vertical height of the chart container in pixels.' },
      ],
    },
    'bar-chart': {
      name: 'BarChartOrganism',
      tag: '<organism-bar-chart>',
      category: 'Organisms',
      status: 'Production Ready (Stable)',
      package: '@skycompare/design-system/organisms',
      summary:
        'Horizontal bar chart organism for ranking categories, airline comparison rankings, and flight volume breakdowns.',
      dos: [
        'Use when comparing named entities like airline carriers where horizontal space accommodates longer titles.',
      ],
      donts: [
        'Do not mix negative values without custom baseline configurations.',
      ],
      props: [
        { name: 'data', type: 'Array<{ label: string; value: number }>', defaultValue: '[]', description: 'Array of horizontal metric entries with labels and values.' },
        { name: 'height', type: 'number', defaultValue: '220', description: 'Container height in pixels.' },
      ],
    },
  };

  activeDocMetadata = computed(() => {
    return (
      this.componentDocsMap[this.selectedComponentId()] || {
        name: this.selectedComponentId(),
        tag: `<atom-${this.selectedComponentId()}>`,
        category: 'Components',
        status: 'Stable',
        package: '@skycompare/design-system',
        summary: 'Design System component.',
        dos: ['Follow accessibility and contrast guidelines.'],
        donts: ['Do not mutate internal state directly.'],
        props: [],
      }
    );
  });

  generateActiveStoryCode = computed(() => {
    const id = this.selectedComponentId();
    if (id === 'button') {
      return `<atom-button\n  [label]="'${this.buttonProps.label()}'"\n  [variant]="'${this.buttonProps.variant()}'"\n  [size]="'${this.buttonProps.size()}'"\n  [loading]="${this.buttonProps.loading()}"\n  [disabled]="${this.buttonProps.disabled()}"\n  (clicked)="onConfirm()"\n/>`;
    }
    if (id === 'badge') {
      return `<atom-badge\n  [text]="'${this.badgeProps.text()}'"\n  [variant]="'${this.badgeProps.variant()}'"\n  [size]="'${this.badgeProps.size()}'"\n/>`;
    }
    if (id === 'input') {
      return `<atom-input\n  [placeholder]="'${this.inputProps.placeholder()}'"\n  [type]="'${this.inputProps.type()}'"\n  [error]="${this.inputProps.error()}"\n  [errorMessage]="'${this.inputProps.errorMessage()}'"\n  [disabled]="${this.inputProps.disabled()}"\n  [(ngModel)]="passengerName"\n/>`;
    }
    if (id === 'price-tag') {
      return `<molecule-price-tag\n  [price]="${this.priceTagProps.price()}"\n  [currency]="'${this.priceTagProps.currency()}'"\n  [trend]="'${this.priceTagProps.trend()}'"\n  [discountPercentage]="${this.priceTagProps.discount()}"\n/>`;
    }
    if (id === 'alert') {
      return `<molecule-alert-message\n  [message]="'${this.alertProps.message()}'"\n  [type]="'${this.alertProps.type()}'"\n  [dismissible]="${this.alertProps.dismissible()}"\n  (dismissed)="onDismiss()"\n/>`;
    }
    if (id === 'stat-card') {
      return `<molecule-stat-card\n  [value]="'${this.statCardProps.value()}'"\n  [label]="'${this.statCardProps.label()}'"\n  [icon]="'${this.statCardProps.icon()}'"\n  [iconColor]="'${this.statCardProps.iconColor()}'"\n/>`;
    }
    return `<${this.activeDocMetadata().tag} />`;
  });

  // Toolbar state
  selectedViewport = signal<'fluid' | 'desktop' | 'tablet' | 'mobile'>('fluid');
  zoomLevel = signal<number>(100);
  showGrid = signal<boolean>(false);
  showOutlines = signal<boolean>(false);
  isManagerCollapsed = signal<boolean>(false);
  activeAddonTab = signal<'controls' | 'actions' | 'tokens' | 'a11y' | 'codegen' | 'chat'>('controls');

  // Brand Presets & Custom Color Pickers
  applyBrandPreset(presetId: string): void {
    this.studioService.applyPreset(presetId);
    this.logAction('brandPresetApplied', `presetId: "${presetId}"`);
  }

  onPrimaryColorInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.studioService.setPrimaryColor(val);
  }

  onPrimaryColorChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      this.studioService.setPrimaryColor(val);
      this.logAction('primaryColorChanged', `color: "${val}"`);
    }
  }

  onSecondaryColorInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.studioService.setSecondaryColor(val);
  }

  onSecondaryColorChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      this.studioService.setSecondaryColor(val);
      this.logAction('secondaryColorChanged', `color: "${val}"`);
    }
  }

  onAccentColorInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.studioService.setAccentColor(val);
  }

  onAccentColorChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      this.studioService.setAccentColor(val);
      this.logAction('accentColorChanged', `color: "${val}"`);
    }
  }

  onRadiusInput(event: Event): void {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    this.studioService.setBorderRadius(val);
    this.logAction('borderRadiusChanged', `radius: ${val}px`);
  }

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

  // AI Chat Feed
  chatMessages = signal<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Hello! I am Rustbook AI. I can inspect design tokens, run microsecond APCA contrast audits, mutate component props, switch brand palettes, and generate multi-platform code via the native MCP server.',
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
