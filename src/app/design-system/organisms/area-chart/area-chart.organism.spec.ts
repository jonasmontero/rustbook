import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaChartOrganism } from './area-chart.organism';

describe('AreaChartOrganism', () => {
  let component: AreaChartOrganism;
  let fixture: ComponentFixture<AreaChartOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaChartOrganism],
    }).compileComponents();

    fixture = TestBed.createComponent(AreaChartOrganism);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format values correctly', () => {
    expect(component.formatValue(500)).toBe('$500');
    expect(component.formatValue(5000)).toBe('$5k');
    expect(component.formatValue(1500000)).toBe('$1.5M');
  });

  it('should format dates correctly', () => {
    const date = new Date(2025, 0, 1);
    const formatted = component.formatDate(date);
    expect(formatted).toBe('Jan');
  });
});
