/**
 * Mock Data - Dashboard Metrics
 * Summary metrics and performance indicators for overview dashboards.
 */

import { StatModel } from '../models';

export const MOCK_DASHBOARD_STATS: StatModel[] = [
  {
    icon: 'plane',
    value: '1,234',
    label: 'Searched Flights',
    trend: 'up',
    trendValue: '+12%',
  },
  {
    icon: 'price',
    value: '$380',
    label: 'Lowest Price Today',
    trend: 'down',
    trendValue: '-5%',
  },
  {
    icon: 'star',
    value: '89',
    label: 'Saved Flights',
  },
  {
    icon: 'user',
    value: '3.2K',
    label: 'Monthly Searches',
    trend: 'up',
    trendValue: '+18%',
  },
];
