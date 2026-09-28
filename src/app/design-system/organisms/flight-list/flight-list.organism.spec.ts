import { TestBed } from '@angular/core/testing';
import { FlightListOrganism } from './flight-list.organism';
import { FlightModel } from '../../../core/models';

describe('FlightListOrganism', () => {
  const mockFlight: FlightModel = {
    id: '1',
    airline: 'azul',
    origin: 'GRU',
    destination: 'GIG',
    departureTime: '08:00',
    arrivalTime: '09:15',
    duration: '1h 15min',
    price: 450,
    benefits: {
      baggage: true,
      meal: true,
      wifi: false,
      entertainment: true,
      seatSelection: true,
    },
    stops: 0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightListOrganism],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FlightListOrganism);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display correct results count', () => {
    const fixture = TestBed.createComponent(FlightListOrganism);
    const component = fixture.componentInstance;

    component.totalCount = 0;
    expect(component.getResultsText()).toBe('No flights found');

    component.totalCount = 1;
    expect(component.getResultsText()).toBe('1 flight found');

    component.totalCount = 5;
    expect(component.getResultsText()).toBe('5 flights found');
  });

  it('should emit sortChange event', () => {
    const fixture = TestBed.createComponent(FlightListOrganism);
    const component = fixture.componentInstance;

    let sortValue = '';
    component.sortChange.subscribe((value) => (sortValue = value));

    component.onSortChange('duration');
    expect(sortValue).toBe('duration');
  });

  it('should emit loadMore event', () => {
    const fixture = TestBed.createComponent(FlightListOrganism);
    const component = fixture.componentInstance;

    let loadMoreCalled = false;
    component.loadMore.subscribe(() => (loadMoreCalled = true));

    component.onLoadMore();
    expect(loadMoreCalled).toBe(true);
  });

  it('should emit flightSelect event', () => {
    const fixture = TestBed.createComponent(FlightListOrganism);
    const component = fixture.componentInstance;

    let selectedId = '';
    component.flightSelect.subscribe((id) => (selectedId = id));

    component.onFlightSelect('123');
    expect(selectedId).toBe('123');
  });

  it('should identify selected flight', () => {
    const fixture = TestBed.createComponent(FlightListOrganism);
    const component = fixture.componentInstance;

    component.selectedFlightId = '1';

    expect(component.isFlightSelected('1')).toBe(true);
    expect(component.isFlightSelected('2')).toBe(false);
  });

  it('should return correct sort button variant', () => {
    const fixture = TestBed.createComponent(FlightListOrganism);
    const component = fixture.componentInstance;

    component.sortBy = 'price';

    expect(component.getSortButtonVariant('price')).toBe('primary');
    expect(component.getSortButtonVariant('duration')).toBe('ghost');
  });
});
