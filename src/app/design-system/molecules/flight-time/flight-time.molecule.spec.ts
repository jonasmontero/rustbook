import { TestBed } from '@angular/core/testing';
import { FlightTimeMolecule } from './flight-time.molecule';

describe('FlightTimeMolecule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightTimeMolecule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FlightTimeMolecule);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
