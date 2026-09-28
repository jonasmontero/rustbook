import { TestBed } from '@angular/core/testing';
import { StatsRowOrganism } from './stats-row.organism';

describe('StatsRowOrganism', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsRowOrganism],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StatsRowOrganism);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
