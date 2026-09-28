/**
 * ock Data - Statistics
 * ados mockados de estatísticas para o dashboard
 */

import { StatModel } from '../models';

/**
 * statísticas do dashboard
 */
export const MOCK_DASHBOARD_STATS: StatModel[] = [
  {
    icon: 'plane',
    value: '1,234',
    label: 'Voos Pesquisados',
    trend: 'up',
    trendValue: '+12%',
  },
  {
    icon: 'price',
    value: 'R$ 380',
    label: 'Menor Preço Hoje',
    trend: 'down',
    trendValue: '-5%',
  },
  {
    icon: 'star',
    value: '89',
    label: 'Voos Favoritos',
  },
  {
    icon: 'user',
    value: '3.2K',
    label: 'Buscas Este Mês',
    trend: 'up',
    trendValue: '+18%',
  },
];
