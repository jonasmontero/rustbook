/**
 * Mock Data - Airline Benefits
 * Standard mock data for airline amenities and inclusion matrix.
 */

import { AirlineBenefits } from '../../design-system/organisms/benefits-grid';

export const MOCK_AIRLINE_BENEFITS: AirlineBenefits[] = [
  {
    airline: 'azul',
    items: [
      { icon: 'baggage', text: '23kg Checked Bag', included: true },
      { icon: 'meal', text: 'In-flight Meal', included: false },
      { icon: 'wifi', text: 'Free Wi-Fi', included: true },
      { icon: 'entertainment', text: 'In-flight Entertainment', included: true },
      { icon: 'seat', text: 'Seat Selection', included: false },
      { icon: 'priority', text: 'Priority Boarding', included: false },
    ],
  },
  {
    airline: 'gol',
    items: [
      { icon: 'baggage', text: '23kg Checked Bag', included: true },
      { icon: 'meal', text: 'In-flight Meal', included: true },
      { icon: 'wifi', text: 'Free Wi-Fi', included: false },
      { icon: 'entertainment', text: 'In-flight Entertainment', included: true },
      { icon: 'seat', text: 'Seat Selection', included: true },
      { icon: 'priority', text: 'Priority Boarding', included: false },
    ],
  },
  {
    airline: 'latam',
    items: [
      { icon: 'baggage', text: '23kg Checked Bag', included: true },
      { icon: 'meal', text: 'In-flight Meal', included: true },
      { icon: 'wifi', text: 'Free Wi-Fi', included: true },
      { icon: 'entertainment', text: 'In-flight Entertainment', included: true },
      { icon: 'seat', text: 'Seat Selection', included: true },
      { icon: 'priority', text: 'Priority Boarding', included: true },
    ],
  },
];
