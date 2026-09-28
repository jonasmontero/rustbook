/**
 * Statistics Data Model
 * Interface for summary statistical metrics and trends.
 */

export interface StatModel {
  icon: string;
  value: string | number;
  label: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}
