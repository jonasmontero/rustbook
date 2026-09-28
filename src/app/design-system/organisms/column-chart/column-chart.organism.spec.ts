import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnChartOrganism } from './column-chart.organism';

describe('ColumnChartOrganism', () => {
  let component: ColumnChartOrganism;
  let fixture: ComponentFixture<ColumnChartOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnChartOrganism],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnChartOrganism);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate max value from data', () => {
    component.data = [
      { label: 'A', value: 100 },
      { label: 'B', value: 200 },
      { label: 'C', value: 150 },
    ];

    component.ngOnInit();

    expect(component.calculatedMaxValue).toBeGreaterThan(200);
  });

  it('should format values correctly', () => {
    expect(component.formatValue(500)).toBe('500');
    expect(component.formatValue(1500)).toBe('1.5k');
    expect(component.formatValue(2000)).toBe('2.0k');
  });
});
