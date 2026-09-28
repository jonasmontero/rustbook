/**
 * Mock Data - Price History
 * Utility functions for generating historical flight pricing series.
 */

import { PriceHistoryModel } from '../models';

/**
 * Generates 30-day historical pricing trends for dashboard charts.
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
 * Generates 30-day price comparison historical trends.
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
