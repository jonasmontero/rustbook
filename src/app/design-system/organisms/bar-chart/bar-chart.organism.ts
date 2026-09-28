/**
 * arChartOrganism
 * ráfico de barras horizontais SVG
 */

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAtom } from '../../atoms';

export interface BarChartDataModel {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'organism-bar-chart',
  standalone: true,
  imports: [CommonModule, TextAtom],
  templateUrl: './bar-chart.organism.html',
  styleUrls: ['./bar-chart.organism.scss'],
})
export class BarChartOrganism implements OnInit {
  @Input() title: string = 'Top Rotas';
  @Input() data: BarChartDataModel[] = [];
  @Input() maxValue?: number;

  chartWidth = 800;
  chartHeight = 500;
  padding = { top: 20, right: 60, bottom: 40, left: 150 };

  dataWidth = 0;
  dataHeight = 0;
  calculatedMaxValue = 0;

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
      this.calculatedMaxValue = this.maxValue || Math.max(...this.data.map((d) => d.value));
      this.calculatedMaxValue = Math.ceil(this.calculatedMaxValue * 1.1);
    }
  }

  getViewBox(): string {
    return `0 0 ${this.chartWidth} ${this.chartHeight}`;
  }

  getBarY(index: number): number {
    const barHeight = this.dataHeight / this.data.length;
    const padding = barHeight * 0.2;
    return this.padding.top + index * barHeight + padding;
  }

  getBarHeight(): number {
    const barHeight = this.dataHeight / this.data.length;
    return barHeight * 0.6;
  }

  getBarWidth(value: number): number {
    if (this.calculatedMaxValue === 0) return 0;
    return (value / this.calculatedMaxValue) * this.dataWidth;
  }

  getBarColor(index: number, customColor?: string): string {
    if (customColor) return customColor;
    const colors = ['#10B981', '#14B8A6', '#06B6D4', '#3B82F6', '#6366F1'];
    return colors[index % colors.length];
  }

  formatValue(value: number): string {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    }
    return value.toString();
  }
}
