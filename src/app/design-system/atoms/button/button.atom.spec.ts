import { TestBed } from '@angular/core/testing';
import { ButtonAtom } from './button.atom';

describe('ButtonAtom', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAtom],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ButtonAtom);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    const fixture = TestBed.createComponent(ButtonAtom);
    const component = fixture.componentInstance;
    expect(component.label).toBe('Button');
    expect(component.variant).toBe('primary');
    expect(component.size).toBe('md');
    expect(component.disabled).toBe(false);
    expect(component.loading).toBe(false);
  });

  it('should emit clicked event when clicked', () => {
    const fixture = TestBed.createComponent(ButtonAtom);
    const component = fixture.componentInstance;
    let clickedEmitted = false;

    component.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    component.onClick(new Event('click'));
    expect(clickedEmitted).toBe(true);
  });

  it('should not emit clicked when disabled', () => {
    const fixture = TestBed.createComponent(ButtonAtom);
    const component = fixture.componentInstance;
    component.disabled = true;
    let clickedEmitted = false;

    component.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    component.onClick(new Event('click'));
    expect(clickedEmitted).toBe(false);
  });

  it('should not emit clicked when loading', () => {
    const fixture = TestBed.createComponent(ButtonAtom);
    const component = fixture.componentInstance;
    component.loading = true;
    let clickedEmitted = false;

    component.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    component.onClick(new Event('click'));
    expect(clickedEmitted).toBe(false);
  });

  it('should generate correct CSS classes', () => {
    const fixture = TestBed.createComponent(ButtonAtom);
    const component = fixture.componentInstance;

    component.variant = 'primary';
    component.size = 'md';
    const classes = component.getButtonClasses();

    expect(classes).toContain('atom-button');
    expect(classes).toContain('atom-button--primary');
    expect(classes).toContain('atom-button--md');
  });

  it('should add full-width class when fullWidth is true', () => {
    const fixture = TestBed.createComponent(ButtonAtom);
    const component = fixture.componentInstance;
    component.fullWidth = true;

    expect(component.getButtonClasses()).toContain('atom-button--full-width');
  });

  it('should add loading class when loading is true', () => {
    const fixture = TestBed.createComponent(ButtonAtom);
    const component = fixture.componentInstance;
    component.loading = true;

    expect(component.getButtonClasses()).toContain('atom-button--loading');
  });
});
