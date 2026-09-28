import { TestBed } from '@angular/core/testing';
import { StatCardMolecule } from './stat-card.molecule';

describe('StatCardMolecule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCardMolecule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StatCardMolecule);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
