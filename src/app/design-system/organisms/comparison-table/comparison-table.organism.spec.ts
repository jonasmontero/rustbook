import { TestBed } from '@angular/core/testing';
import { ComparisonTableOrganism } from './comparison-table.organism';

describe('ComparisonTableOrganism', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonTableOrganism],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ComparisonTableOrganism);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should limit to maximum 3 flights', () => {
    const fixture = TestBed.createComponent(ComparisonTableOrganism);
    const component = fixture.componentInstance;

    component.flights = Array(5).fill({}).map((_, i) => ({ id: `${i}` })) as any;

    expect(component.displayFlights.length).toBe(3);
  });
});
