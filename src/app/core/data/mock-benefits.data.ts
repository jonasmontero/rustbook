/**
 * ock Data - Airline Benefits
 * ados mockados de benefícios das companhias aéreas
 */

import { AirlineBenefits } from '../../design-system/organisms/benefits-grid';

/**
 * enefícios oferecidos por cada companhia aérea
 */
export const MOCK_AIRLINE_BENEFITS: AirlineBenefits[] = [
  {
    airline: 'azul',
    items: [
      { icon: 'baggage', text: 'Bagagem de 23kg', included: true },
      { icon: 'meal', text: 'Refeição a bordo', included: false },
      { icon: 'wifi', text: 'WiFi gratuito', included: true },
      { icon: 'entertainment', text: 'Entretenimento', included: true },
      { icon: 'seat', text: 'Escolha de assento', included: false },
      { icon: 'priority', text: 'Embarque prioritário', included: false },
    ],
  },
  {
    airline: 'gol',
    items: [
      { icon: 'baggage', text: 'Bagagem de 23kg', included: true },
      { icon: 'meal', text: 'Refeição a bordo', included: true },
      { icon: 'wifi', text: 'WiFi gratuito', included: false },
      { icon: 'entertainment', text: 'Entretenimento', included: true },
      { icon: 'seat', text: 'Escolha de assento', included: true },
      { icon: 'priority', text: 'Embarque prioritário', included: false },
    ],
  },
  {
    airline: 'latam',
    items: [
      { icon: 'baggage', text: 'Bagagem de 23kg', included: true },
      { icon: 'meal', text: 'Refeição a bordo', included: true },
      { icon: 'wifi', text: 'WiFi gratuito', included: true },
      { icon: 'entertainment', text: 'Entretenimento', included: true },
      { icon: 'seat', text: 'Escolha de assento', included: true },
      { icon: 'priority', text: 'Embarque prioritário', included: true },
    ],
  },
];
