import { TestBed } from '@angular/core/testing';
import { SidebarOrganism } from './sidebar.organism';

describe('SidebarOrganism', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarOrganism],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SidebarOrganism);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit navigate event', () => {
    const fixture = TestBed.createComponent(SidebarOrganism);
    const component = fixture.componentInstance;

    let route = '';
    component.navigate.subscribe((r) => (route = r));

    component.onNavigate('/search');
    expect(route).toBe('/search');
  });

  it('should emit toggleCollapse event', () => {
    const fixture = TestBed.createComponent(SidebarOrganism);
    const component = fixture.componentInstance;

    let toggled = false;
    component.toggleCollapse.subscribe(() => (toggled = true));

    component.onToggle();
    expect(toggled).toBe(true);
  });

  it('should identify active route', () => {
    const fixture = TestBed.createComponent(SidebarOrganism);
    const component = fixture.componentInstance;

    component.activeRoute = '/dashboard';

    expect(component.isActive('/dashboard')).toBe(true);
    expect(component.isActive('/search')).toBe(false);
  });
});
