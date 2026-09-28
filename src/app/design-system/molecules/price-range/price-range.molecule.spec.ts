import { TestBed } from '@angular/core/testing';
import { PriceRangeMolecule } from './price-range.molecule';

describe('PriceRangeMolecule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceRangeMolecule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PriceRangeMolecule);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should format prices correctly', () => {
    const fixture = TestBed.createComponent(PriceRangeMolecule);
    const component = fixture.componentInstance;

    const formatted = component.formatPrice(1250.75);
    expect(formatted).toContain('1.251');
    expect(formatted).toContain('R$');
  });
});
