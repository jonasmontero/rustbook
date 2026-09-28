import { TestBed } from '@angular/core/testing';
import { DividerAtom } from './divider.atom';

describe('DividerAtom', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerAtom],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DividerAtom);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    const fixture = TestBed.createComponent(DividerAtom);
    const component = fixture.componentInstance;
    expect(component.orientation).toBe('horizontal');
    expect(component.spacing).toBe('md');
  });

  it('should generate correct CSS classes for horizontal orientation', () => {
    const fixture = TestBed.createComponent(DividerAtom);
    const component = fixture.componentInstance;
    component.orientation = 'horizontal';
    component.spacing = 'md';

    const classes = component.getDividerClasses();
    expect(classes).toContain('atom-divider');
    expect(classes).toContain('atom-divider--horizontal');
    expect(classes).toContain('atom-divider--spacing-md');
  });

  it('should generate correct CSS classes for vertical orientation', () => {
    const fixture = TestBed.createComponent(DividerAtom);
    const component = fixture.componentInstance;
    component.orientation = 'vertical';
    component.spacing = 'lg';

    const classes = component.getDividerClasses();
    expect(classes).toContain('atom-divider--vertical');
    expect(classes).toContain('atom-divider--spacing-lg');
  });

  it('should handle none spacing', () => {
    const fixture = TestBed.createComponent(DividerAtom);
    const component = fixture.componentInstance;
    component.spacing = 'none';

    expect(component.getDividerClasses()).toContain('atom-divider--spacing-none');
  });

  it('should handle sm spacing', () => {
    const fixture = TestBed.createComponent(DividerAtom);
    const component = fixture.componentInstance;
    component.spacing = 'sm';

    expect(component.getDividerClasses()).toContain('atom-divider--spacing-sm');
  });

  it('should handle md spacing', () => {
    const fixture = TestBed.createComponent(DividerAtom);
    const component = fixture.componentInstance;
    component.spacing = 'md';

    expect(component.getDividerClasses()).toContain('atom-divider--spacing-md');
  });

  it('should handle lg spacing', () => {
    const fixture = TestBed.createComponent(DividerAtom);
    const component = fixture.componentInstance;
    component.spacing = 'lg';

    expect(component.getDividerClasses()).toContain('atom-divider--spacing-lg');
  });

  it('should handle xl spacing', () => {
    const fixture = TestBed.createComponent(DividerAtom);
    const component = fixture.componentInstance;
    component.spacing = 'xl';

    expect(component.getDividerClasses()).toContain('atom-divider--spacing-xl');
  });

  it('should render with separator role', () => {
    const fixture = TestBed.createComponent(DividerAtom);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const dividerElement = compiled.querySelector('.atom-divider');
    expect(dividerElement?.getAttribute('role')).toBe('separator');
  });

  it('should allow custom color input', () => {
    const fixture = TestBed.createComponent(DividerAtom);
    const component = fixture.componentInstance;
    component.color = '#FF0000';

    expect(component.color).toBe('#FF0000');
  });

  it('should combine all classes correctly', () => {
    const fixture = TestBed.createComponent(DividerAtom);
    const component = fixture.componentInstance;
    component.orientation = 'vertical';
    component.spacing = 'xl';

    const classes = component.getDividerClasses();
    expect(classes).toBe('atom-divider atom-divider--vertical atom-divider--spacing-xl');
  });
});
