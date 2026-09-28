/**
 * ock Data - Price History
 * unções para gerar histórico de preços mockado
 */

import { PriceHistoryModel } from '../models';

/**
 * era histórico de preços para o dashboard (30 dias)
 * reços base mais altos para simulação realista
 */
export function generateDashboardPriceHistory(): PriceHistoryModel[] {
  const today = new Date();
  const history: PriceHistoryModel[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    history.push({
      date,
      prices: {
        azul: 380 + Math.random() * 150 + Math.sin(i / 5) * 50,
        gol: 330 + Math.random() * 120 + Math.sin(i / 5) * 40,
        latam: 420 + Math.random() * 170 + Math.sin(i / 5) * 60,
      },
    });
  }

  return history;
}

/**
 * era histórico de preços para comparação (30 dias)
 * reços base mais baixos alinhados com voos de comparação
 */
export function generateComparisonPriceHistory(): PriceHistoryModel[] {
  const today = new Date();
  const history: PriceHistoryModel[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    history.push({
      date,
      prices: {
        azul: 320 + Math.random() * 100 + Math.sin(i / 5) * 30,
        gol: 380 + Math.random() * 80 + Math.sin(i / 5) * 25,
        latam: 450 + Math.random() * 100 + Math.sin(i / 5) * 35,
      },
    });
  }

  return history;
}
