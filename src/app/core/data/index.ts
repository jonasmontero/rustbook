/**
 * ore Data Module
 * xporta todos os dados mockados centralizados
 */

// Flights
export {
  MOCK_RECENT_FLIGHTS,
  MOCK_SEARCH_FLIGHTS,
  MOCK_COMPARISON_FLIGHTS,
} from './mock-flights.data';

// Statistics
export { MOCK_DASHBOARD_STATS } from './mock-stats.data';

// Price History
export {
  generateDashboardPriceHistory,
  generateComparisonPriceHistory,
} from './mock-price-history.data';

// Seasonal Data
export { MOCK_SEASON_DATA } from './mock-season.data';

// Benefits
export { MOCK_AIRLINE_BENEFITS } from './mock-benefits.data';
