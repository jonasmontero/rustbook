import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardLayoutTemplate } from '../../templates';
import {
  ButtonAtom,
  InputAtom,
  BadgeAtom,
  AvatarAtom,
  DividerAtom,
  IconAtom,
  SpinnerAtom,
  TextAtom,
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
import { ThemeStudioService } from '../../../core/services/theme-studio.service';

@Component({
  selector: 'page-workbench',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DashboardLayoutTemplate,
    ButtonAtom,
    InputAtom,
    BadgeAtom,
    AvatarAtom,
    DividerAtom,
    IconAtom,
    SpinnerAtom,
    TextAtom,
    TooltipAtom,
    SearchFieldMolecule,
    DatePickerMolecule,
    PriceTagMolecule,
    AlertMessageMolecule,
    StatCardMolecule,
    AirlineLogoMolecule,
    PieChartOrganism,
    ColumnChartOrganism,
    BarChartOrganism,
  ],
  templateUrl: './workbench-page.component.html',
  styleUrls: ['./workbench-page.component.scss'],
})
export class WorkbenchPageComponent {
  studioService = inject(ThemeStudioService);

  testSearch = signal<string>('Live search query');
  testDate = signal<string>('2026-03-15');
  testInputValue = signal<string>('Editable input text');

  allIcons = [
    'dashboard',
    'search',
    'compare',
    'analytics',
    'plane',
    'history',
    'star',
    'user',
    'menu',
    'x',
    'calendar',
    'chevron-right',
    'chevron-left',
    'chevron-up',
    'chevron-down',
    'seat',
    'meal',
    'wifi',
    'entertainment',
    'baggage',
    'priority',
    'chart',
    'price',
    'tag',
    'settings',
    'help',
    'sun',
    'moon',
    'copy',
    'refresh',
    'sparkles',
  ];

  pieData = [
    { label: 'Direct Flights', value: 55, color: '#2563EB' },
    { label: '1 Stop', value: 35, color: '#0284C7' },
    { label: '2+ Stops', value: 10, color: '#94A3B8' },
  ];

  columnData = [
    { label: 'Mon', value: 420 },
    { label: 'Tue', value: 380 },
    { label: 'Wed', value: 350 },
    { label: 'Thu', value: 490 },
    { label: 'Fri', value: 620 },
    { label: 'Sat', value: 580 },
    { label: 'Sun', value: 510 },
  ];

  barData = [
    { label: 'Azul Brazilian Airlines', value: 1450 },
    { label: 'Gol Linhas Aéreas', value: 1220 },
    { label: 'LATAM Airlines', value: 980 },
  ];
}
