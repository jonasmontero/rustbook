import { TestBed } from '@angular/core/testing';
import { ComparisonPageComponent } from './comparison-page.component';

describe('ComparisonPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonPageComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ComparisonPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load 3 flights on init', () => {
    const fixture = TestBed.createComponent(ComparisonPageComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();

    expect(component.selectedFlights.length).toBe(3);
    expect(component.selectedFlights[0].airline).toBe('azul');
    expect(component.selectedFlights[1].airline).toBe('gol');
    expect(component.selectedFlights[2].airline).toBe('latam');
  });

  it('should load 30 days of price history', () => {
    const fixture = TestBed.createComponent(ComparisonPageComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();

    expect(component.priceHistory.length).toBe(30);
    expect(component.priceHistory[0].prices).toHaveProperty('azul');
    expect(component.priceHistory[0].prices).toHaveProperty('gol');
    expect(component.priceHistory[0].prices).toHaveProperty('latam');
  });

  it('should load benefits data for all 3 airlines', () => {
    const fixture = TestBed.createComponent(ComparisonPageComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();

    expect(component.benefitsData.length).toBe(3);
    expect(component.benefitsData[0].airline).toBe('azul');
    expect(component.benefitsData[1].airline).toBe('gol');
    expect(component.benefitsData[2].airline).toBe('latam');

    // Verificar que cada companhia tem 6 benefícios
    expect(component.benefitsData[0].items.length).toBe(6);
    expect(component.benefitsData[1].items.length).toBe(6);
    expect(component.benefitsData[2].items.length).toBe(6);
  });

  it('should change active tab', () => {
    const fixture = TestBed.createComponent(ComparisonPageComponent);
    const component = fixture.componentInstance;

    expect(component.activeTab).toBe('prices');

    component.onTabChange('benefits');
    expect(component.activeTab).toBe('benefits');

    component.onTabChange('history');
    expect(component.activeTab).toBe('history');
  });

  it('should have different prices for each airline', () => {
    const fixture = TestBed.createComponent(ComparisonPageComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();

    const azulPrice = component.selectedFlights[0].price;
    const golPrice = component.selectedFlights[1].price;
    const latamPrice = component.selectedFlights[2].price;

    expect(azulPrice).toBe(320);
    expect(golPrice).toBe(380);
    expect(latamPrice).toBe(450);
    expect(azulPrice).toBeLessThan(golPrice);
    expect(golPrice).toBeLessThan(latamPrice);
  });

  it('should have realistic benefit differences', () => {
    const fixture = TestBed.createComponent(ComparisonPageComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();

    // Azul: 3/6 benefícios
    const azulBenefits = component.benefitsData[0].items.filter((b) => b.included);
    expect(azulBenefits.length).toBe(3);

    // Gol: 4/6 benefícios
    const golBenefits = component.benefitsData[1].items.filter((b) => b.included);
    expect(golBenefits.length).toBe(4);

    // Latam: 6/6 benefícios (todos)
    const latamBenefits = component.benefitsData[2].items.filter((b) => b.included);
    expect(latamBenefits.length).toBe(6);
  });
});
