/**
 * Modelo de dados para histórico de preços
 */

export interface PriceHistoryModel {
  date: Date;
  prices: {
    azul: number;
    gol: number;
    latam: number;
  };
}

export interface SeasonDataModel {
  month: number;
  season: 'low' | 'medium' | 'high';
  avgPrice: number;
}
