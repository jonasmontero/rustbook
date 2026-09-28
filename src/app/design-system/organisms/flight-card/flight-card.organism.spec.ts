import { TestBed } from '@angular/core/testing';
import { FlightCardOrganism } from './flight-card.organism';
import { FlightModel } from '../../../core/models';

describe('FlightCardOrganism', () => {
  const mockFlight: FlightModel = {
    id: '1',
    airline: 'azul',
    origin: 'GRU',
    destination: 'GIG',
    departureTime: '08:00',
    arrivalTime: '09:15',
    duration: '1h 15min',
    price: 450,
    originalPrice: 500,
    benefits: {
      baggage: true,
      meal: true,
      wifi: false,
      entertainment: true,
      seatSelection: true,
    },
    stops: 0,
    seatsLeft: 3,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightCardOrganism],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FlightCardOrganism);
    fixture.componentInstance.flight = mockFlight;
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit select event with flight id', () => {
    const fixture = TestBed.createComponent(FlightCardOrganism);
    const component = fixture.componentInstance;
    component.flight = mockFlight;

    let selectedId = '';
    component.select.subscribe((id) => (selectedId = id));

    component.onSelect();
    expect(selectedId).toBe('1');
  });

  it('should emit details event with flight id', () => {
    const fixture = TestBed.createComponent(FlightCardOrganism);
    const component = fixture.componentInstance;
    component.flight = mockFlight;

    let detailsId = '';
    component.details.subscribe((id) => (detailsId = id));

    component.onDetails();
    expect(detailsId).toBe('1');
  });

  it('should calculate discount correctly', () => {
    const fixture = TestBed.createComponent(FlightCardOrganism);
    const component = fixture.componentInstance;
    component.flight = mockFlight;

    expect(component.hasDiscount()).toBe(true);
    expect(component.getDiscountPercent()).toBe(10);
  });

  it('should format stops text correctly', () => {
    const fixture = TestBed.createComponent(FlightCardOrganism);
    const component = fixture.componentInstance;

    component.flight = { ...mockFlight, stops: 0 };
    expect(component.getStopsText()).toBe('Direct flight');

    component.flight = { ...mockFlight, stops: 1 };
    expect(component.getStopsText()).toBe('1 escala');

    component.flight = { ...mockFlight, stops: 2 };
    expect(component.getStopsText()).toBe('2 escalas');
  });

  it('should apply selected class when selected', () => {
    const fixture = TestBed.createComponent(FlightCardOrganism);
    const component = fixture.componentInstance;
    component.flight = mockFlight;
    component.selected = true;

    const classes = component.getCardClasses();
    expect(classes).toContain('organism-flight-card--selected');
  });

  it('should apply compact class when compact', () => {
    const fixture = TestBed.createComponent(FlightCardOrganism);
    const component = fixture.componentInstance;
    component.flight = mockFlight;
    component.compact = true;

    const classes = component.getCardClasses();
    expect(classes).toContain('organism-flight-card--compact');
  });

  it('should apply low-seats class when seats are low', () => {
    const fixture = TestBed.createComponent(FlightCardOrganism);
    const component = fixture.componentInstance;
    component.flight = { ...mockFlight, seatsLeft: 3 };

    const classes = component.getCardClasses();
    expect(classes).toContain('organism-flight-card--low-seats');
  });
});
