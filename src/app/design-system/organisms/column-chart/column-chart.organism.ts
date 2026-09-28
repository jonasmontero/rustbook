/**
 * olumnChartOrganism
 * ráfico de colunas verticais SVG
 */

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAtom } from '../../atoms';

export interface ColumnChartDataModel {
  label: string;
  value: number;
}

@Component({
  selector: 'organism-column-chart',
  standalone: true,
  imports: [CommonModule, TextAtom],
  templateUrl: './column-chart.organism.html',
  styleUrls: ['./column-chart.organism.scss'],
})
export class ColumnChartOrganism implements OnInit {
  /** ítulo do gráfico */
  @Input() title: string = 'Gráfico de Colunas';

  /** ados do gráfico */
  @Input() data: ColumnChartDataModel[] = [];

  /** alor máximo (auto-calculado se não fornecido) */
  @Input() maxValue?: number;

  /** argura do gráfico */
  chartWidth = 800;

  /** ltura do gráfico */
  chartHeight = 400;

  /** adding */
  padding = { top: 20, right: 20, bottom: 60, left: 60 };

  /** argura calculada da área de dados */
  dataWidth = 0;

  /** ltura calculada da área de dados */
  dataHeight = 0;

  /** alor máximo calculado */
  calculatedMaxValue = 0;

  ngOnInit(): void {
    this.calculate();
  }

  ngOnChanges(): void {
    this.calculate();
  }

  /**
   * alcula dimensões e valores
   */
  private calculate(): void {
    this.dataWidth = this.chartWidth - this.padding.left - this.padding.right;
    this.dataHeight = this.chartHeight - this.padding.top - this.padding.bottom;

    if (this.data.length > 0) {
      this.calculatedMaxValue = this.maxValue || Math.max(...this.data.map((d) => d.value));
      // Adicionar 10% de padding no topo
      this.calculatedMaxValue = Math.ceil(this.calculatedMaxValue * 1.1);
    }
  }

  /**
   * etorna o viewBox do SVG
   */
  getViewBox(): string {
    return `0 0 ${this.chartWidth} ${this.chartHeight}`;
  }

  /**
   * alcula a posição X da coluna
   */
  getColumnX(index: number): number {
    const columnWidth = this.dataWidth / this.data.length;
    const padding = columnWidth * 0.2; // 20% de espaçamento
    return this.padding.left + index * columnWidth + padding;
  }

  /**
   * alcula a largura da coluna
   */
  getColumnWidth(): number {
    const columnWidth = this.dataWidth / this.data.length;
    return columnWidth * 0.6; // 60% da largura disponível
  }

  /**
   * alcula a altura da coluna
   */
  getColumnHeight(value: number): number {
    if (this.calculatedMaxValue === 0) return 0;
    return (value / this.calculatedMaxValue) * this.dataHeight;
  }

  /**
   * alcula a posição Y da coluna (topo)
   */
  getColumnY(value: number): number {
    const height = this.getColumnHeight(value);
    return this.padding.top + this.dataHeight - height;
  }

  /**
   * alcula a cor da coluna baseada no índice
   */
  getColumnColor(index: number): string {
    const colors = ['#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF'];
    return colors[index % colors.length];
  }

  /**
   * ormata valor
   */
  formatValue(value: number): string {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    }
    return value.toString();
  }
}
