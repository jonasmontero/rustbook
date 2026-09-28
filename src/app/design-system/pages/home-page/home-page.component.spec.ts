import { TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load stats on init', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();

    expect(component.stats.length).toBe(4);
    expect(component.stats[0].label).toBe('Voos Pesquisados');
  });

  it('should load recent flights on init', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();

    expect(component.recentFlights.length).toBe(3);
  });

  it('should toggle sidebar', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    const component = fixture.componentInstance;

    expect(component.sidebarCollapsed).toBe(false);
    component.onSidebarToggle();
    expect(component.sidebarCollapsed).toBe(true);
  });

  it('should update active route on navigate', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    const component = fixture.componentInstance;

    component.onNavigate('/search');
    expect(component.activeRoute).toBe('/search');
  });
});
