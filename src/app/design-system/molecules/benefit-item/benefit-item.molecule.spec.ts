import { TestBed } from '@angular/core/testing';
import { BenefitItemMolecule } from './benefit-item.molecule';

describe('BenefitItemMolecule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenefitItemMolecule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BenefitItemMolecule);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
