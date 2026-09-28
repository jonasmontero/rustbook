import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PieChartOrganism } from './pie-chart.organism';

describe('PieChartOrganism', () => {
  let component: PieChartOrganism;
  let fixture: ComponentFixture<PieChartOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieChartOrganism],
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartOrganism);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate slices correctly', () => {
    component.data = [
      { label: 'A', value: 50, color: '#000' },
      { label: 'B', value: 30, color: '#111' },
      { label: 'C', value: 20, color: '#222' },
    ];

    component.ngOnInit();

    expect(component.slices.length).toBe(3);
    expect(component.total).toBe(100);
    expect(component.slices[0].percentage).toBe(50);
    expect(component.slices[1].percentage).toBe(30);
    expect(component.slices[2].percentage).toBe(20);
  });

  it('should handle empty data', () => {
    component.data = [];
    component.ngOnInit();

    expect(component.slices.length).toBe(0);
    expect(component.total).toBe(0);
  });

  it('should format percentage correctly', () => {
    expect(component.formatPercentage(45.678)).toBe('45.7%');
    expect(component.formatPercentage(100)).toBe('100.0%');
    expect(component.formatPercentage(0)).toBe('0.0%');
  });

  it('should return correct viewBox', () => {
    expect(component.getViewBox()).toBe('0 0 300 300');
  });

  it('should use custom radius', () => {
    component.radius = 150;
    expect(component.radius).toBe(150);
  });

  it('should show/hide percentages based on input', () => {
    component.showPercentages = false;
    expect(component.showPercentages).toBe(false);

    component.showPercentages = true;
    expect(component.showPercentages).toBe(true);
  });
});
