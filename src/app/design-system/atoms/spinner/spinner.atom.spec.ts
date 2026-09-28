import { TestBed } from '@angular/core/testing';
import { SpinnerAtom } from './spinner.atom';

describe('SpinnerAtom', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerAtom],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SpinnerAtom);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default size as md', () => {
    const fixture = TestBed.createComponent(SpinnerAtom);
    const component = fixture.componentInstance;
    expect(component.size).toBe('md');
  });

  it('should accept all size variants', () => {
    const fixture = TestBed.createComponent(SpinnerAtom);
    const component = fixture.componentInstance;

    component.size = 'sm';
    expect(component.size).toBe('sm');

    component.size = 'md';
    expect(component.size).toBe('md');

    component.size = 'lg';
    expect(component.size).toBe('lg');
  });

  it('should accept custom color', () => {
    const fixture = TestBed.createComponent(SpinnerAtom);
    const component = fixture.componentInstance;

    component.color = '#FF0000';
    expect(component.color).toBe('#FF0000');
  });

  it('should render with correct aria attributes', () => {
    const fixture = TestBed.createComponent(SpinnerAtom);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const spinner = compiled.querySelector('.atom-spinner');

    expect(spinner.getAttribute('role')).toBe('status');
    expect(spinner.getAttribute('aria-label')).toBe('Loading');
  });
});
