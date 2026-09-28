/**
 * earch Form Model
 * nterface para dados do formulário de busca
 */
export interface SearchFormModel {
  origin: string;
  destination: string;
  departureDate: Date;
  returnDate?: Date;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  tripType: 'roundtrip' | 'oneway';
}
