/**
 * ock Data - Seasonal Data
 * ados mockados de temporadas e preços por mês
 */

import { SeasonDataModel } from '../models';

/**
 * ados de temporada e preço médio por mês
 */
export const MOCK_SEASON_DATA: SeasonDataModel[] = [
  { month: 1, season: 'high', avgPrice: 650 },
  { month: 2, season: 'high', avgPrice: 680 },
  { month: 3, season: 'low', avgPrice: 380 },
  { month: 4, season: 'low', avgPrice: 350 },
  { month: 5, season: 'low', avgPrice: 340 },
  { month: 6, season: 'medium', avgPrice: 450 },
  { month: 7, season: 'high', avgPrice: 720 },
  { month: 8, season: 'medium', avgPrice: 480 },
  { month: 9, season: 'low', avgPrice: 360 },
  { month: 10, season: 'low', avgPrice: 370 },
  { month: 11, season: 'medium', avgPrice: 500 },
  { month: 12, season: 'high', avgPrice: 750 },
];
