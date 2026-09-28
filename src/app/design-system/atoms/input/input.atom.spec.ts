import { TestBed } from '@angular/core/testing';
import { InputAtom } from './input.atom';

describe('InputAtom', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAtom],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(InputAtom);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default type as text', () => {
    const fixture = TestBed.createComponent(InputAtom);
    const component = fixture.componentInstance;
    expect(component.type).toBe('text');
  });

  it('should emit valueChange event', () => {
    const fixture = TestBed.createComponent(InputAtom);
    const component = fixture.componentInstance;
    let emittedValue = '';

    component.valueChange.subscribe((value: string) => {
      emittedValue = value;
    });

    component.onValueChange('test');
    expect(emittedValue).toBe('test');
  });

  it('should add error class when error is true', () => {
    const fixture = TestBed.createComponent(InputAtom);
    const component = fixture.componentInstance;

    component.error = true;
    expect(component.getInputClasses()).toContain('atom-input--error');
  });

  it('should add disabled class when disabled is true', () => {
    const fixture = TestBed.createComponent(InputAtom);
    const component = fixture.componentInstance;

    component.disabled = true;
    expect(component.getInputClasses()).toContain('atom-input--disabled');
  });
});
