/**
 * reaChartOrganism
 * ráfico de área preenchida SVG
 */

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAtom } from '../../atoms';

export interface AreaChartDataModel {
  date: Date;
  value: number;
}

@Component({
  selector: 'organism-area-chart',
  standalone: true,
  imports: [CommonModule, TextAtom],
  templateUrl: './area-chart.organism.html',
  styleUrls: ['./area-chart.organism.scss'],
})
export class AreaChartOrganism implements OnInit {
  @Input() title: string = 'Receita Acumulada';
  @Input() data: AreaChartDataModel[] = [];
  @Input() fillColor: string = '#2563EB';

  chartWidth = 800;
  chartHeight = 400;
  padding = { top: 20, right: 20, bottom: 60, left: 80 };

  dataWidth = 0;
  dataHeight = 0;
  maxValue = 0;
  linePath = '';
  areaPath = '';

  ngOnInit(): void {
    this.calculate();
  }

  ngOnChanges(): void {
    this.calculate();
  }

  private calculate(): void {
    this.dataWidth = this.chartWidth - this.padding.left - this.padding.right;
    this.dataHeight = this.chartHeight - this.padding.top - this.padding.bottom;

    if (this.data.length > 0) {
      this.maxValue = Math.max(...this.data.map((d) => d.value));
      this.maxValue = Math.ceil(this.maxValue * 1.1);
      this.calculatePaths();
    }
  }

  private calculatePaths(): void {
    const points = this.data.map((d, i) => ({
      x: this.padding.left + (i / (this.data.length - 1 || 1)) * this.dataWidth,
      y: this.padding.top + this.dataHeight - (d.value / this.maxValue) * this.dataHeight,
    }));

    this.linePath = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`)
      .join(' ');

    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];
    this.areaPath = [
      this.linePath,
      `L ${lastPoint.x},${this.padding.top + this.dataHeight}`,
      `L ${firstPoint.x},${this.padding.top + this.dataHeight}`,
      'Z',
    ].join(' ');
  }

  getViewBox(): string {
    return `0 0 ${this.chartWidth} ${this.chartHeight}`;
  }

  formatValue(value: number): string {
    if (value >= 1000000) {
      return '$' + (value / 1000000).toFixed(1) + 'M';
    }
    if (value >= 1000) {
      return '$' + (value / 1000).toFixed(0) + 'k';
    }
    return '$' + value.toString();
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'short' });
  }

  getXLabels(): { x: number; label: string }[] {
    const step = Math.ceil(this.data.length / 6);
    return this.data
      .filter((_, i) => i % step === 0)
      .map((d, i) => ({
        x: this.padding.left + (i * step / (this.data.length - 1)) * this.dataWidth,
        label: this.formatDate(d.date),
      }));
  }

  getYLabels(): { y: number; label: string }[] {
    return [0, 1, 2, 3, 4].map((i) => ({
      y: this.padding.top + (this.dataHeight * i) / 4,
      label: this.formatValue(this.maxValue * (1 - i / 4)),
    }));
  }
}
