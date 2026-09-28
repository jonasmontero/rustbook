import { TestBed } from '@angular/core/testing';
import { TooltipAtom } from './tooltip.atom';

describe('TooltipAtom', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipAtom],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    expect(component.text).toBe('');
    expect(component.position).toBe('top');
    expect(component.delay).toBe(200);
    expect(component.isVisible).toBe(false);
  });

  it('should generate correct CSS classes for top position', () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    component.position = 'top';

    const classes = component.getTooltipClasses();
    expect(classes).toContain('atom-tooltip__content');
    expect(classes).toContain('atom-tooltip__content--top');
  });

  it('should generate correct CSS classes for bottom position', () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    component.position = 'bottom';

    expect(component.getTooltipClasses()).toContain('atom-tooltip__content--bottom');
  });

  it('should generate correct CSS classes for left position', () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    component.position = 'left';

    expect(component.getTooltipClasses()).toContain('atom-tooltip__content--left');
  });

  it('should generate correct CSS classes for right position', () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    component.position = 'right';

    expect(component.getTooltipClasses()).toContain('atom-tooltip__content--right');
  });

  it('should show tooltip after delay', async () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    component.delay = 100;

    expect(component.isVisible).toBe(false);
    component.show();

    await new Promise(r => setTimeout(r, 150));
    expect(component.isVisible).toBe(true);
  });

  it('should hide tooltip immediately', () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    component.isVisible = true;

    component.hide();
    expect(component.isVisible).toBe(false);
  });

  it('should cancel show timeout when hiding', async () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    component.delay = 200;

    component.show();
    component.hide();

    await new Promise(r => setTimeout(r, 250));
    expect(component.isVisible).toBe(false);
  });

  it('should show tooltip with zero delay', async () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    component.delay = 0;

    component.show();

    await new Promise(r => setTimeout(r, 10));
    expect(component.isVisible).toBe(true);
  });

  it('should render tooltip content when visible', () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    component.text = 'Test Tooltip';
    component.isVisible = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tooltipContent = compiled.querySelector('.atom-tooltip__content');
    expect(tooltipContent).toBeTruthy();
    expect(tooltipContent?.textContent?.trim()).toContain('Test Tooltip');
  });

  it('should not render tooltip content when not visible', () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    component.text = 'Test Tooltip';
    component.isVisible = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tooltipContent = compiled.querySelector('.atom-tooltip__content');
    expect(tooltipContent).toBeFalsy();
  });

  it('should have tooltip role', () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    component.text = 'Test Tooltip';
    component.isVisible = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tooltipContent = compiled.querySelector('.atom-tooltip__content');
    expect(tooltipContent?.getAttribute('role')).toBe('tooltip');
  });

  it('should have aria-label attribute', () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    component.text = 'Test Tooltip';
    component.isVisible = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tooltipContent = compiled.querySelector('.atom-tooltip__content');
    expect(tooltipContent?.getAttribute('aria-label')).toBe('Test Tooltip');
  });

  it('should cleanup timeout on destroy', () => {
    const fixture = TestBed.createComponent(TooltipAtom);
    const component = fixture.componentInstance;
    component.delay = 1000;

    component.show();
    expect(component.isVisible).toBe(false);

    component.ngOnDestroy();
    // Should not throw error
  });
});
