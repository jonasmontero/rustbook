import { TestBed } from '@angular/core/testing';
import { IconAtom } from './icon.atom';

describe('IconAtom', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconAtom],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(IconAtom);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    const fixture = TestBed.createComponent(IconAtom);
    const component = fixture.componentInstance;
    expect(component.name).toBe('search');
    expect(component.size).toBe('md');
    expect(component.color).toBeUndefined();
  });

  it('should return correct size in pixels', () => {
    const fixture = TestBed.createComponent(IconAtom);
    const component = fixture.componentInstance;

    component.size = 'sm';
    expect(component.sizeInPx).toBe(16);

    component.size = 'md';
    expect(component.sizeInPx).toBe(20);

    component.size = 'lg';
    expect(component.sizeInPx).toBe(24);

    component.size = 'xl';
    expect(component.sizeInPx).toBe(32);
  });

  it('should return icon path from registry', () => {
    const fixture = TestBed.createComponent(IconAtom);
    const component = fixture.componentInstance;

    component.name = 'search';
    expect(component.getIconPath()).toBeTruthy();
    expect(component.getIconPath()).toContain('M');

    component.name = 'plane';
    expect(component.getIconPath()).toBeTruthy();
  });

  it('should fallback to search icon if name not found', () => {
    const fixture = TestBed.createComponent(IconAtom);
    const component = fixture.componentInstance;

    component.name = 'nonexistent-icon';
    const searchPath = component.getIconPath();

    component.name = 'search';
    expect(component.getIconPath()).toBe(searchPath);
  });
});
