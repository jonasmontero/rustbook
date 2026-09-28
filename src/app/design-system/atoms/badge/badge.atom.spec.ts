import { TestBed } from '@angular/core/testing';
import { BadgeAtom } from './badge.atom';

describe('BadgeAtom', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeAtom],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BadgeAtom);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    const fixture = TestBed.createComponent(BadgeAtom);
    const component = fixture.componentInstance;
    expect(component.text).toBe('');
    expect(component.variant).toBe('default');
    expect(component.size).toBe('md');
  });

  it('should render text correctly', () => {
    const fixture = TestBed.createComponent(BadgeAtom);
    const component = fixture.componentInstance;
    component.text = 'Test Badge';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const badgeElement = compiled.querySelector('.atom-badge');
    expect(badgeElement?.textContent?.trim()).toBe('Test Badge');
  });

  it('should generate correct CSS classes for default variant', () => {
    const fixture = TestBed.createComponent(BadgeAtom);
    const component = fixture.componentInstance;
    component.variant = 'default';
    component.size = 'md';

    const classes = component.getBadgeClasses();
    expect(classes).toContain('atom-badge');
    expect(classes).toContain('atom-badge--default');
    expect(classes).toContain('atom-badge--md');
  });

  it('should generate correct CSS classes for primary variant', () => {
    const fixture = TestBed.createComponent(BadgeAtom);
    const component = fixture.componentInstance;
    component.variant = 'primary';
    component.size = 'sm';

    const classes = component.getBadgeClasses();
    expect(classes).toContain('atom-badge--primary');
    expect(classes).toContain('atom-badge--sm');
  });

  it('should generate correct CSS classes for success variant', () => {
    const fixture = TestBed.createComponent(BadgeAtom);
    const component = fixture.componentInstance;
    component.variant = 'success';

    expect(component.getBadgeClasses()).toContain('atom-badge--success');
  });

  it('should generate correct CSS classes for warning variant', () => {
    const fixture = TestBed.createComponent(BadgeAtom);
    const component = fixture.componentInstance;
    component.variant = 'warning';

    expect(component.getBadgeClasses()).toContain('atom-badge--warning');
  });

  it('should generate correct CSS classes for danger variant', () => {
    const fixture = TestBed.createComponent(BadgeAtom);
    const component = fixture.componentInstance;
    component.variant = 'danger';

    expect(component.getBadgeClasses()).toContain('atom-badge--danger');
  });

  it('should generate correct CSS classes for azul variant', () => {
    const fixture = TestBed.createComponent(BadgeAtom);
    const component = fixture.componentInstance;
    component.variant = 'azul';

    expect(component.getBadgeClasses()).toContain('atom-badge--azul');
  });

  it('should generate correct CSS classes for gol variant', () => {
    const fixture = TestBed.createComponent(BadgeAtom);
    const component = fixture.componentInstance;
    component.variant = 'gol';

    expect(component.getBadgeClasses()).toContain('atom-badge--gol');
  });

  it('should generate correct CSS classes for latam variant', () => {
    const fixture = TestBed.createComponent(BadgeAtom);
    const component = fixture.componentInstance;
    component.variant = 'latam';

    expect(component.getBadgeClasses()).toContain('atom-badge--latam');
  });

  it('should handle small size', () => {
    const fixture = TestBed.createComponent(BadgeAtom);
    const component = fixture.componentInstance;
    component.size = 'sm';

    expect(component.getBadgeClasses()).toContain('atom-badge--sm');
  });

  it('should handle medium size', () => {
    const fixture = TestBed.createComponent(BadgeAtom);
    const component = fixture.componentInstance;
    component.size = 'md';

    expect(component.getBadgeClasses()).toContain('atom-badge--md');
  });
});
