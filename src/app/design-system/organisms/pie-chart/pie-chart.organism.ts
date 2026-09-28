/**
 * ieChartOrganism
 * ráfico de pizza SVG customizado
 */

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAtom } from '../../atoms';

export interface PieChartDataModel {
  label: string;
  value: number;
  color: string;
}

interface PieSlice {
  path: string;
  color: string;
  percentage: number;
  startAngle: number;
  endAngle: number;
}

@Component({
  selector: 'organism-pie-chart',
  standalone: true,
  imports: [CommonModule, TextAtom],
  templateUrl: './pie-chart.organism.html',
  styleUrls: ['./pie-chart.organism.scss'],
})
export class PieChartOrganism implements OnInit {
  /** ítulo do gráfico */
  @Input() title: string = 'Distribuição';

  /** ados do gráfico */
  @Input() data: PieChartDataModel[] = [];

  /** aio do gráfico (em px) */
  @Input() radius: number = 100;

  /** ostrar percentuais na legenda */
  @Input() showPercentages: boolean = true;

  /** oordenadas do centro */
  centerX = 150;
  centerY = 150;

  /** lices calculadas */
  slices: PieSlice[] = [];

  /** otal dos valores */
  total = 0;

  ngOnInit(): void {
    this.calculateSlices();
  }

  ngOnChanges(): void {
    this.calculateSlices();
  }

  /**
   * alcula as fatias do gráfico
   */
  private calculateSlices(): void {
    this.total = this.data.reduce((sum, item) => sum + item.value, 0);

    if (this.total === 0) {
      this.slices = [];
      return;
    }

    let currentAngle = -90; // Começar no topo (12 horas)

    this.slices = this.data.map((item) => {
      const percentage = (item.value / this.total) * 100;
      const angleDegrees = (item.value / this.total) * 360;

      const startAngle = currentAngle;
      const endAngle = currentAngle + angleDegrees;

      const path = this.createArcPath(startAngle, endAngle);

      currentAngle = endAngle;

      return {
        path,
        color: item.color,
        percentage,
        startAngle,
        endAngle,
      };
    });
  }

  /**
   * ria o path SVG para um arco
   */
  private createArcPath(startAngleDeg: number, endAngleDeg: number): string {
    const startAngle = (startAngleDeg * Math.PI) / 180;
    const endAngle = (endAngleDeg * Math.PI) / 180;

    const startX = this.centerX + this.radius * Math.cos(startAngle);
    const startY = this.centerY + this.radius * Math.sin(startAngle);

    const endX = this.centerX + this.radius * Math.cos(endAngle);
    const endY = this.centerY + this.radius * Math.sin(endAngle);

    const largeArcFlag = endAngleDeg - startAngleDeg > 180 ? 1 : 0;

    return `M ${this.centerX},${this.centerY} L ${startX},${startY} A ${this.radius},${this.radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;
  }

  /**
   * ormata percentual
   */
  formatPercentage(value: number): string {
    return value.toFixed(1) + '%';
  }

  /**
   * etorna o viewBox do SVG
   */
  getViewBox(): string {
    return `0 0 300 300`;
  }
}
