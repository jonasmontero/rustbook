import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsPageComponent } from './analytics-page.component';

describe('AnalyticsPageComponent', () => {
  let component: AnalyticsPageComponent;
  let fixture: ComponentFixture<AnalyticsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load reservation history data', () => {
    expect(component.reservationHistory.length).toBe(90);
  });

  it('should load distribution data with 3 airlines', () => {
    expect(component.distributionData.length).toBe(3);
    expect(component.distributionData[0].label).toBe('Azul');
    expect(component.distributionData[1].label).toBe('Gol');
    expect(component.distributionData[2].label).toBe('Latam');
  });

  it('should load monthly flights data with 12 months', () => {
    expect(component.monthlyFlightsData.length).toBe(12);
  });

  it('should load top 10 routes data', () => {
    expect(component.topRoutesData.length).toBe(10);
    expect(component.topRoutesData[0].label).toBe('GRU → GIG');
  });

  it('should load cumulative revenue data with 12 months', () => {
    expect(component.cumulativeRevenueData.length).toBe(12);
  });

  it('should have increasing cumulative revenue', () => {
    for (let i = 1; i < component.cumulativeRevenueData.length; i++) {
      expect(component.cumulativeRevenueData[i].value).toBeGreaterThan(
        component.cumulativeRevenueData[i - 1].value
      );
    }
  });
});
