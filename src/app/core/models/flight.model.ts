/**
 * light Model
 * nterface principal para dados de voos
 */
export interface FlightModel {
  id: string;
  airline: 'azul' | 'gol' | 'latam';
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  originalPrice?: number;
  benefits: {
    baggage: boolean;
    meal: boolean;
    wifi: boolean;
    entertainment: boolean;
    seatSelection: boolean;
  };
  stops: number;
  seatsLeft?: number;
}
