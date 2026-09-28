/**
 * Modelo de dados para estatísticas
 */

export interface StatModel {
  icon: string;
  value: string | number;
  label: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}
