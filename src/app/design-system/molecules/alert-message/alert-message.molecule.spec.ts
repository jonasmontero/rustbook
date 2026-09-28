import { TestBed } from '@angular/core/testing';
import { AlertMessageMolecule } from './alert-message.molecule';

describe('AlertMessageMolecule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertMessageMolecule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AlertMessageMolecule);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit dismiss event', () => {
    const fixture = TestBed.createComponent(AlertMessageMolecule);
    const component = fixture.componentInstance;

    let dismissed = false;
    component.dismiss.subscribe(() => (dismissed = true));

    component.onDismiss();
    expect(dismissed).toBe(true);
  });
});
