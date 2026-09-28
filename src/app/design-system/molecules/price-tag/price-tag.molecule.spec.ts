import { TestBed } from '@angular/core/testing';
import { PriceTagMolecule } from './price-tag.molecule';

describe('PriceTagMolecule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceTagMolecule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PriceTagMolecule);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should format price correctly', () => {
    const fixture = TestBed.createComponent(PriceTagMolecule);
    const component = fixture.componentInstance;
    component.price = 450.50;
    component.currency = 'R$';

    const formatted = component.formatPrice(450.50);
    expect(formatted).toContain('450');
    expect(formatted).toContain('R$');
  });

  it('should return green color when highlighted', () => {
    const fixture = TestBed.createComponent(PriceTagMolecule);
    const component = fixture.componentInstance;
    component.highlighted = true;

    expect(component.getColor()).toBe('#10B981');
  });

  it('should return default color when not highlighted', () => {
    const fixture = TestBed.createComponent(PriceTagMolecule);
    const component = fixture.componentInstance;
    component.highlighted = false;

    expect(component.getColor()).toBe('#0F172A');
  });
});
