import { TestBed } from '@angular/core/testing';
import { LabelAtom } from './label.atom';

describe('LabelAtom', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelAtom],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LabelAtom);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should display text', () => {
    const fixture = TestBed.createComponent(LabelAtom);
    const component = fixture.componentInstance;
    component.text = 'Nome';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.atom-label')?.textContent).toContain('Nome');
  });

  it('should show asterisk when required', () => {
    const fixture = TestBed.createComponent(LabelAtom);
    const component = fixture.componentInstance;
    component.text = 'Email';
    component.required = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const requiredSpan = compiled.querySelector('.atom-label__required');
    expect(requiredSpan).toBeTruthy();
    expect(requiredSpan?.textContent).toBe('*');
  });

  it('should not show asterisk when not required', () => {
    const fixture = TestBed.createComponent(LabelAtom);
    const component = fixture.componentInstance;
    component.text = 'Telefone';
    component.required = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const requiredSpan = compiled.querySelector('.atom-label__required');
    expect(requiredSpan).toBeFalsy();
  });

  it('should set htmlFor attribute', () => {
    const fixture = TestBed.createComponent(LabelAtom);
    const component = fixture.componentInstance;
    component.htmlFor = 'name-input';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const label = compiled.querySelector('.atom-label');
    expect(label?.getAttribute('for')).toBe('name-input');
  });
});
