import { TestBed } from '@angular/core/testing';
import { AvatarAtom } from './avatar.atom';

describe('AvatarAtom', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarAtom],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AvatarAtom);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    const fixture = TestBed.createComponent(AvatarAtom);
    const component = fixture.componentInstance;
    expect(component.alt).toBe('');
    expect(component.size).toBe('md');
    expect(component.imageError).toBe(false);
  });

  it('should render image when src is provided', () => {
    const fixture = TestBed.createComponent(AvatarAtom);
    const component = fixture.componentInstance;
    component.src = 'https://example.com/avatar.png';
    component.alt = 'Test Avatar';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const imageElement = compiled.querySelector('.atom-avatar__image');
    expect(imageElement).toBeTruthy();
    expect(imageElement?.getAttribute('src')).toBe('https://example.com/avatar.png');
    expect(imageElement?.getAttribute('alt')).toBe('Test Avatar');
  });

  it('should render fallback when no src is provided', () => {
    const fixture = TestBed.createComponent(AvatarAtom);
    const component = fixture.componentInstance;
    component.fallback = 'AZ';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const fallbackElement = compiled.querySelector('.atom-avatar__fallback');
    expect(fallbackElement).toBeTruthy();
    expect(fallbackElement?.textContent?.trim()).toBe('AZ');
  });

  it('should generate initials from alt text', () => {
    const fixture = TestBed.createComponent(AvatarAtom);
    const component = fixture.componentInstance;
    component.alt = 'Azul Linhas';

    const initials = component.getFallbackText();
    expect(initials).toBe('AL');
  });

  it('should generate single letter initials from single word', () => {
    const fixture = TestBed.createComponent(AvatarAtom);
    const component = fixture.componentInstance;
    component.alt = 'Azul';

    const initials = component.getFallbackText();
    expect(initials).toBe('AZ');
  });

  it('should use fallback prop when provided', () => {
    const fixture = TestBed.createComponent(AvatarAtom);
    const component = fixture.componentInstance;
    component.fallback = 'GL';
    component.alt = 'Azul Linhas';

    const fallbackText = component.getFallbackText();
    expect(fallbackText).toBe('GL');
  });

  it('should return ? when no alt or fallback is provided', () => {
    const fixture = TestBed.createComponent(AvatarAtom);
    const component = fixture.componentInstance;

    const fallbackText = component.getFallbackText();
    expect(fallbackText).toBe('?');
  });

  it('should generate correct CSS classes', () => {
    const fixture = TestBed.createComponent(AvatarAtom);
    const component = fixture.componentInstance;
    component.size = 'lg';

    const classes = component.getAvatarClasses();
    expect(classes).toContain('atom-avatar');
    expect(classes).toContain('atom-avatar--lg');
  });

  it('should handle image error', () => {
    const fixture = TestBed.createComponent(AvatarAtom);
    const component = fixture.componentInstance;
    component.src = 'https://broken-url.com/image.png';
    component.fallback = 'AZ';
    fixture.detectChanges();

    expect(component.imageError).toBe(false);
    component.onImageError();
    expect(component.imageError).toBe(true);
  });

  it('should show fallback when image error occurs', () => {
    const fixture = TestBed.createComponent(AvatarAtom);
    const component = fixture.componentInstance;
    component.src = 'https://broken-url.com/image.png';
    component.fallback = 'AZ';
    component.imageError = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const imageElement = compiled.querySelector('.atom-avatar__image');
    const fallbackElement = compiled.querySelector('.atom-avatar__fallback');

    expect(imageElement).toBeFalsy();
    expect(fallbackElement).toBeTruthy();
    expect(fallbackElement?.textContent?.trim()).toBe('AZ');
  });

  it('should handle all sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];

    sizes.forEach((size) => {
      const fixture = TestBed.createComponent(AvatarAtom);
      const component = fixture.componentInstance;
      component.size = size;

      const classes = component.getAvatarClasses();
      expect(classes).toContain(`atom-avatar--${size}`);
    });
  });
});
