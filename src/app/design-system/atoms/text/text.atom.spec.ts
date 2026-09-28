import { TestBed } from '@angular/core/testing';
import { TextAtom } from './text.atom';

describe('TextAtom', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAtom],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TextAtom);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default variant as body', () => {
    const fixture = TestBed.createComponent(TextAtom);
    const component = fixture.componentInstance;
    expect(component.variant).toBe('body');
  });

  it('should generate correct CSS classes', () => {
    const fixture = TestBed.createComponent(TextAtom);
    const component = fixture.componentInstance;

    component.variant = 'h1';
    expect(component.getClasses()).toContain('atom-text--h1');

    component.weight = 'bold';
    expect(component.getClasses()).toContain('atom-text--weight-bold');

    component.align = 'center';
    expect(component.getClasses()).toContain('atom-text--align-center');
  });

  it('should include base class', () => {
    const fixture = TestBed.createComponent(TextAtom);
    const component = fixture.componentInstance;
    expect(component.getClasses()).toContain('atom-text');
  });
});
