import { TestBed } from '@angular/core/testing';
import { SearchResultsLayoutTemplate } from './search-results-layout.template';

describe('SearchResultsLayoutTemplate', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultsLayoutTemplate],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SearchResultsLayoutTemplate);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit searchSubmit event', () => {
    const fixture = TestBed.createComponent(SearchResultsLayoutTemplate);
    const component = fixture.componentInstance;

    let submitted = false;
    component.searchSubmit.subscribe(() => (submitted = true));

    component.onSearchSubmit({} as any);
    expect(submitted).toBe(true);
  });

  it('should emit filtersToggle event', () => {
    const fixture = TestBed.createComponent(SearchResultsLayoutTemplate);
    const component = fixture.componentInstance;

    let toggled = false;
    component.filtersToggle.subscribe(() => (toggled = true));

    component.onFiltersToggle();
    expect(toggled).toBe(true);
  });
});
