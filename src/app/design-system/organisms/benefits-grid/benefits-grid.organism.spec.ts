import { TestBed } from '@angular/core/testing';
import { BenefitsGridOrganism } from './benefits-grid.organism';

describe('BenefitsGridOrganism', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenefitsGridOrganism],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BenefitsGridOrganism);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
