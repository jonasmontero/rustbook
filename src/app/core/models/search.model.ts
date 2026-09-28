/**
 * Search Form Model
 * Interface for flight query and filter parameters.
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
