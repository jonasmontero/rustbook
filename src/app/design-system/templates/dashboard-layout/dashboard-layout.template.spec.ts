import { TestBed } from '@angular/core/testing';
import { DashboardLayoutTemplate } from './dashboard-layout.template';

describe('DashboardLayoutTemplate', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLayoutTemplate],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardLayoutTemplate);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit sidebarToggle event', () => {
    const fixture = TestBed.createComponent(DashboardLayoutTemplate);
    const component = fixture.componentInstance;

    let toggled = false;
    component.sidebarToggle.subscribe(() => (toggled = true));

    component.onSidebarToggle();
    expect(toggled).toBe(true);
  });

  it('should emit navigate event', () => {
    const fixture = TestBed.createComponent(DashboardLayoutTemplate);
    const component = fixture.componentInstance;

    let route = '';
    component.navigate.subscribe((r) => (route = r));

    component.onNavigate('/search');
    expect(route).toBe('/search');
  });
});
