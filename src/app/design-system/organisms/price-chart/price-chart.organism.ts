/**
 * riceChartOrganism
 * ráfico de histórico de preços com SVG customizado
 */

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceHistoryModel } from '../../../core/models';
import { TextAtom, ButtonAtom, BadgeAtom } from '../../atoms';

type PeriodType = '7d' | '30d' | '90d';

interface ChartPoint {
  x: number;
  y: number;
  date: Date;
  price: number;
}

@Component({
  selector: 'organism-price-chart',
  standalone: true,
  imports: [
    CommonModule,
    TextAtom,
    ButtonAtom,
    BadgeAtom,
  ],
  templateUrl: './price-chart.organism.html',
  styleUrls: ['./price-chart.organism.scss'],
})
export class PriceChartOrganism implements OnChanges {
  @Input() data: PriceHistoryModel[] = [];
  @Input() period: PeriodType = '7d';

  @Output() periodChange = new EventEmitter<PeriodType>();

  readonly chartWidth = 600;
  readonly chartHeight = 300;
  readonly padding = { top: 20, right: 20, bottom: 40, left: 50 };

  azulPath: string = '';
  golPath: string = '';
  latamPath: string = '';

  minPrice: number = 0;
  maxPrice: number = 1000;
  xLabels: Array<{ x: number; label: string }> = [];
  yLabels: Array<{ y: number; label: string }> = [];

  periodOptions: Array<{ value: PeriodType; label: string }> = [
    { value: '7d', label: '7 dias' },
    { value: '30d', label: '30 dias' },
    { value: '90d', label: '90 dias' },
  ];

  airlines = [
    { code: 'azul', name: 'Azul', color: '#0033A0' },
    { code: 'gol', name: 'Gol', color: '#FF6600' },
    { code: 'latam', name: 'Latam', color: '#E31837' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['period']) {
      this.updateChart();
    }
  }

  onPeriodChange(newPeriod: PeriodType): void {
    this.periodChange.emit(newPeriod);
  }

  getPeriodButtonVariant(option: PeriodType): 'primary' | 'ghost' {
    return this.period === option ? 'primary' : 'ghost';
  }

  getBestPeriod(): string {
    if (this.data.length === 0) return '';

    // Find period with lowest average price
    const avgAzul = this.data.reduce((sum, d) => sum + d.prices.azul, 0) / this.data.length;
    const avgGol = this.data.reduce((sum, d) => sum + d.prices.gol, 0) / this.data.length;
    const avgLatam = this.data.reduce((sum, d) => sum + d.prices.latam, 0) / this.data.length;

    const minAvg = Math.min(avgAzul, avgGol, avgLatam);
    return `Melhor média: R$ ${minAvg.toFixed(0)}`;
  }

  private updateChart(): void {
    if (this.data.length === 0) {
      this.azulPath = '';
      this.golPath = '';
      this.latamPath = '';
      return;
    }

    // Calculate price range
    const allPrices = this.data.flatMap(d => [d.prices.azul, d.prices.gol, d.prices.latam]);
    this.minPrice = Math.floor(Math.min(...allPrices) * 0.9);
    this.maxPrice = Math.ceil(Math.max(...allPrices) * 1.1);

    // Calculate chart dimensions
    const chartInnerWidth = this.chartWidth - this.padding.left - this.padding.right;
    const chartInnerHeight = this.chartHeight - this.padding.top - this.padding.bottom;

    // Create points for each airline
    const azulPoints: ChartPoint[] = [];
    const golPoints: ChartPoint[] = [];
    const latamPoints: ChartPoint[] = [];

    this.data.forEach((point, index) => {
      const x = this.padding.left + (index / (this.data.length - 1 || 1)) * chartInnerWidth;

      const azulY = this.padding.top + chartInnerHeight -
        ((point.prices.azul - this.minPrice) / (this.maxPrice - this.minPrice)) * chartInnerHeight;
      const golY = this.padding.top + chartInnerHeight -
        ((point.prices.gol - this.minPrice) / (this.maxPrice - this.minPrice)) * chartInnerHeight;
      const latamY = this.padding.top + chartInnerHeight -
        ((point.prices.latam - this.minPrice) / (this.maxPrice - this.minPrice)) * chartInnerHeight;

      azulPoints.push({ x, y: azulY, date: point.date, price: point.prices.azul });
      golPoints.push({ x, y: golY, date: point.date, price: point.prices.gol });
      latamPoints.push({ x, y: latamY, date: point.date, price: point.prices.latam });
    });

    // Generate SVG paths
    this.azulPath = this.pointsToPath(azulPoints);
    this.golPath = this.pointsToPath(golPoints);
    this.latamPath = this.pointsToPath(latamPoints);

    // Generate axis labels
    this.generateAxisLabels(chartInnerWidth, chartInnerHeight);
  }

  private pointsToPath(points: ChartPoint[]): string {
    if (points.length === 0) return '';

    const pathData = points.map((point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${command} ${point.x} ${point.y}`;
    });

    return pathData.join(' ');
  }

  private generateAxisLabels(width: number, height: number): void {
    // X-axis labels (dates)
    this.xLabels = [];
    const labelCount = Math.min(5, this.data.length);
    for (let i = 0; i < labelCount; i++) {
      const index = Math.floor((i / (labelCount - 1 || 1)) * (this.data.length - 1));
      const dataPoint = this.data[index];
      const x = this.padding.left + (i / (labelCount - 1 || 1)) * width;
      const label = this.formatDate(dataPoint.date);
      this.xLabels.push({ x, label });
    }

    // Y-axis labels (prices)
    this.yLabels = [];
    const priceStep = (this.maxPrice - this.minPrice) / 4;
    for (let i = 0; i <= 4; i++) {
      const price = this.minPrice + (i * priceStep);
      const y = this.padding.top + height - (i / 4) * height;
      this.yLabels.push({ y, label: `R$ ${Math.round(price)}` });
    }
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`;
  }

  getViewBox(): string {
    return `0 0 ${this.chartWidth} ${this.chartHeight}`;
  }
}
