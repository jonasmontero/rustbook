import { TestBed } from '@angular/core/testing';
import { PriceChartOrganism } from './price-chart.organism';
import { PriceHistoryModel } from '../../../core/models';

describe('PriceChartOrganism', () => {
  const mockData: PriceHistoryModel[] = [
    {
      date: new Date('2026-01-01'),
      prices: { azul: 400, gol: 350, latam: 450 },
    },
    {
      date: new Date('2026-01-02'),
      prices: { azul: 420, gol: 370, latam: 470 },
    },
    {
      date: new Date('2026-01-03'),
      prices: { azul: 410, gol: 360, latam: 460 },
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceChartOrganism],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PriceChartOrganism);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit periodChange event', () => {
    const fixture = TestBed.createComponent(PriceChartOrganism);
    const component = fixture.componentInstance;

    let newPeriod = '';
    component.periodChange.subscribe((period) => (newPeriod = period));

    component.onPeriodChange('30d');
    expect(newPeriod).toBe('30d');
  });

  it('should return correct button variant for selected period', () => {
    const fixture = TestBed.createComponent(PriceChartOrganism);
    const component = fixture.componentInstance;

    component.period = '7d';

    expect(component.getPeriodButtonVariant('7d')).toBe('primary');
    expect(component.getPeriodButtonVariant('30d')).toBe('ghost');
  });

  it('should calculate best period', () => {
    const fixture = TestBed.createComponent(PriceChartOrganism);
    const component = fixture.componentInstance;

    component.data = mockData;

    const bestPeriod = component.getBestPeriod();
    expect(bestPeriod).toContain('Best average');
    expect(bestPeriod).toContain('$');
  });

  it('should generate SVG paths from data', () => {
    const fixture = TestBed.createComponent(PriceChartOrganism);
    const component = fixture.componentInstance;

    component.data = mockData;
    component.ngOnChanges({
      data: {
        previousValue: [],
        currentValue: mockData,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.azulPath).toBeTruthy();
    expect(component.golPath).toBeTruthy();
    expect(component.latamPath).toBeTruthy();
  });

  it('should handle empty data', () => {
    const fixture = TestBed.createComponent(PriceChartOrganism);
    const component = fixture.componentInstance;

    component.data = [];
    component.ngOnChanges({
      data: {
        previousValue: mockData,
        currentValue: [],
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.azulPath).toBe('');
    expect(component.golPath).toBe('');
    expect(component.latamPath).toBe('');
  });

  it('should calculate min and max prices correctly', () => {
    const fixture = TestBed.createComponent(PriceChartOrganism);
    const component = fixture.componentInstance;

    component.data = mockData;
    component.ngOnChanges({
      data: {
        previousValue: [],
        currentValue: mockData,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.minPrice).toBeLessThan(350);
    expect(component.maxPrice).toBeGreaterThan(470);
  });
});
