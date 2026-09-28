import { TestBed } from '@angular/core/testing';
import { AirlineLogoMolecule } from './airline-logo.molecule';

describe('AirlineLogoMolecule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirlineLogoMolecule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AirlineLogoMolecule);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    const fixture = TestBed.createComponent(AirlineLogoMolecule);
    const component = fixture.componentInstance;
    expect(component.airline).toBe('azul');
    expect(component.size).toBe('md');
    expect(component.showName).toBe(true);
    expect(component.showBadge).toBe(false);
  });

  it('should return Azul airline data', () => {
    const fixture = TestBed.createComponent(AirlineLogoMolecule);
    const component = fixture.componentInstance;
    component.airline = 'azul';

    const data = component.getAirlineData();
    expect(data.name).toBe('Azul Linhas Aéreas');
    expect(data.code).toBe('AZ');
    expect(data.initials).toBe('AZ');
    expect(data.color).toBe('#0033A0');
  });

  it('should return Gol airline data', () => {
    const fixture = TestBed.createComponent(AirlineLogoMolecule);
    const component = fixture.componentInstance;
    component.airline = 'gol';

    const data = component.getAirlineData();
    expect(data.name).toBe('Gol Linhas Aéreas');
    expect(data.code).toBe('GL');
    expect(data.color).toBe('#FF6600');
  });

  it('should return Latam airline data', () => {
    const fixture = TestBed.createComponent(AirlineLogoMolecule);
    const component = fixture.componentInstance;
    component.airline = 'latam';

    const data = component.getAirlineData();
    expect(data.name).toBe('Latam Airlines');
    expect(data.code).toBe('LA');
    expect(data.color).toBe('#E31837');
  });

  it('should generate correct CSS classes', () => {
    const fixture = TestBed.createComponent(AirlineLogoMolecule);
    const component = fixture.componentInstance;
    component.airline = 'azul';
    component.size = 'lg';

    const classes = component.getAirlineLogoClasses();
    expect(classes).toContain('molecule-airline-logo');
    expect(classes).toContain('molecule-airline-logo--azul');
    expect(classes).toContain('molecule-airline-logo--lg');
  });

  it('should handle all airline values', () => {
    const airlines: Array<'azul' | 'gol' | 'latam'> = ['azul', 'gol', 'latam'];

    airlines.forEach((airline) => {
      const fixture = TestBed.createComponent(AirlineLogoMolecule);
      const component = fixture.componentInstance;
      component.airline = airline;

      const data = component.getAirlineData();
      expect(data).toBeTruthy();
      expect(data.name).toBeTruthy();
      expect(data.code).toBeTruthy();
      expect(data.color).toBeTruthy();
    });
  });

  it('should handle all size values', () => {
    const sizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];

    sizes.forEach((size) => {
      const fixture = TestBed.createComponent(AirlineLogoMolecule);
      const component = fixture.componentInstance;
      component.size = size;

      const classes = component.getAirlineLogoClasses();
      expect(classes).toContain(`molecule-airline-logo--${size}`);
    });
  });
});
