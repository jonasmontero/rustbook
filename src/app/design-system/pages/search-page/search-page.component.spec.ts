import { TestBed } from '@angular/core/testing';
import { SearchPageComponent } from './search-page.component';

describe('SearchPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPageComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SearchPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load flights on init', () => {
    const fixture = TestBed.createComponent(SearchPageComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();

    expect(component.allFlights.length).toBe(12);
    expect(component.filteredFlights.length).toBeGreaterThan(0);
  });

  it('should filter by airline', () => {
    const fixture = TestBed.createComponent(SearchPageComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();
    component.selectedAirlines = new Set(['azul']);
    component['applyFilters']();

    expect(component.filteredFlights.every((f) => f.airline === 'azul')).toBe(true);
  });

  it('should filter by price', () => {
    const fixture = TestBed.createComponent(SearchPageComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();
    component.maxPrice = 400;
    component['applyFilters']();

    expect(component.filteredFlights.every((f) => f.price <= 400)).toBe(true);
  });

  it('should filter direct flights only', () => {
    const fixture = TestBed.createComponent(SearchPageComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();
    component.directOnly = true;
    component['applyFilters']();

    expect(component.filteredFlights.every((f) => f.stops === 0)).toBe(true);
  });

  it('should sort by price', () => {
    const fixture = TestBed.createComponent(SearchPageComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();
    component.sortBy = 'price';
    component['sortFlights']();

    const prices = component.filteredFlights.map((f) => f.price);
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });
});
