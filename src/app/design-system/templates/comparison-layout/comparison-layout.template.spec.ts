import { TestBed } from '@angular/core/testing';
import { ComparisonLayoutTemplate } from './comparison-layout.template';

describe('ComparisonLayoutTemplate', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonLayoutTemplate],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ComparisonLayoutTemplate);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit tabChange event', () => {
    const fixture = TestBed.createComponent(ComparisonLayoutTemplate);
    const component = fixture.componentInstance;

    let newTab = '';
    component.tabChange.subscribe((tab) => (newTab = tab));

    component.onTabClick('benefits');
    expect(newTab).toBe('benefits');
  });

  it('should identify active tab correctly', () => {
    const fixture = TestBed.createComponent(ComparisonLayoutTemplate);
    const component = fixture.componentInstance;

    component.activeTab = 'prices';

    expect(component.isActiveTab('prices')).toBe(true);
    expect(component.isActiveTab('benefits')).toBe(false);
  });

  it('should apply active class to current tab', () => {
    const fixture = TestBed.createComponent(ComparisonLayoutTemplate);
    const component = fixture.componentInstance;

    component.activeTab = 'history';

    expect(component.getTabClass('history')).toContain('--active');
    expect(component.getTabClass('prices')).not.toContain('--active');
  });
});
