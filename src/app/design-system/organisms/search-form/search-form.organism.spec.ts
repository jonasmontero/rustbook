import { TestBed } from '@angular/core/testing';
import { SearchFormOrganism } from './search-form.organism';
import { SearchFormModel } from '../../../core/models';

describe('SearchFormOrganism', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFormOrganism],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SearchFormOrganism);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should initialize with default values', () => {
    const fixture = TestBed.createComponent(SearchFormOrganism);
    const component = fixture.componentInstance;

    expect(component.origin).toBe('GRU');
    expect(component.destination).toBe('GIG');
    expect(component.adults).toBe(1);
    expect(component.children).toBe(0);
    expect(component.infants).toBe(0);
    expect(component.tripType).toBe('roundtrip');
  });

  it('should initialize with initial values', () => {
    const fixture = TestBed.createComponent(SearchFormOrganism);
    const component = fixture.componentInstance;

    const initialValues: SearchFormModel = {
      origin: 'BSB',
      destination: 'SSA',
      departureDate: new Date('2026-02-15'),
      returnDate: new Date('2026-02-22'),
      passengers: { adults: 2, children: 1, infants: 0 },
      tripType: 'roundtrip',
    };

    component.initialValues = initialValues;
    component.ngOnInit();

    expect(component.origin).toBe('BSB');
    expect(component.destination).toBe('SSA');
    expect(component.adults).toBe(2);
    expect(component.children).toBe(1);
  });

  it('should validate required fields', () => {
    const fixture = TestBed.createComponent(SearchFormOrganism);
    const component = fixture.componentInstance;
    component.origin = '';
    component.destination = '';

    const isValid = component.validate();

    expect(isValid).toBe(false);
    expect(component.validationErrors.length).toBeGreaterThan(0);
  });

  it('should validate infant per adult ratio', () => {
    const fixture = TestBed.createComponent(SearchFormOrganism);
    const component = fixture.componentInstance;

    component.adults = 1;
    component.infants = 2;

    const isValid = component.validate();

    expect(isValid).toBe(false);
    expect(component.validationErrors).toContain('Maximum 1 infant per adult.');
  });

  it('should validate return date >= departure date', () => {
    const fixture = TestBed.createComponent(SearchFormOrganism);
    const component = fixture.componentInstance;

    component.origin = 'GRU';
    component.destination = 'GIG';
    component.departureDate = new Date('2026-02-22');
    component.returnDate = new Date('2026-02-15');

    const isValid = component.validate();

    expect(isValid).toBe(false);
    expect(component.validationErrors).toContain(
      'Return date must be on or after departure date.'
    );
  });

  it('should emit search event with valid data', () => {
    const fixture = TestBed.createComponent(SearchFormOrganism);
    const component = fixture.componentInstance;

    component.origin = 'GRU';
    component.destination = 'GIG';
    component.departureDate = new Date('2026-02-15');
    component.returnDate = new Date('2026-02-22');
    component.adults = 2;

    let emittedData: SearchFormModel | undefined;
    component.search.subscribe((data: SearchFormModel) => (emittedData = data));

    component.onSubmit();

    expect(emittedData).toBeDefined();
    expect(emittedData!.origin).toBe('GRU');
    expect(emittedData!.destination).toBe('GIG');
    expect(emittedData!.passengers.adults).toBe(2);
  });

  it('should auto-adjust infants when adults decrease', () => {
    const fixture = TestBed.createComponent(SearchFormOrganism);
    const component = fixture.componentInstance;

    component.adults = 3;
    component.infants = 3;

    component.onAdultsChange(1);

    expect(component.infants).toBe(1);
  });

  it('should clear return date when switching to oneway', () => {
    const fixture = TestBed.createComponent(SearchFormOrganism);
    const component = fixture.componentInstance;

    component.returnDate = new Date('2026-02-22');
    component.onTripTypeChange('oneway');

    expect(component.returnDate).toBeNull();
    expect(component.tripType).toBe('oneway');
  });
});
