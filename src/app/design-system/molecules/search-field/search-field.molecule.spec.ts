import { TestBed } from '@angular/core/testing';
import { SearchFieldMolecule } from './search-field.molecule';

describe('SearchFieldMolecule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFieldMolecule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SearchFieldMolecule);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    const fixture = TestBed.createComponent(SearchFieldMolecule);
    const component = fixture.componentInstance;
    expect(component.placeholder).toBe('Search...');
    expect(component.value).toBe('');
    expect(component.loading).toBe(false);
    expect(component.size).toBe('md');
  });

  it('should emit search event on Enter key', () => {
    const fixture = TestBed.createComponent(SearchFieldMolecule);
    const component = fixture.componentInstance;
    component.value = 'test search';

    let emittedValue: string | undefined;
    component.search.subscribe((value: string) => {
      emittedValue = value;
    });

    component.onSearch();
    expect(emittedValue).toBe('test search');
  });

  it('should not emit search when value is empty', () => {
    const fixture = TestBed.createComponent(SearchFieldMolecule);
    const component = fixture.componentInstance;
    component.value = '   ';

    let searchEmitted = false;
    component.search.subscribe(() => {
      searchEmitted = true;
    });

    component.onSearch();
    expect(searchEmitted).toBe(false);
  });

  it('should not emit search when loading', () => {
    const fixture = TestBed.createComponent(SearchFieldMolecule);
    const component = fixture.componentInstance;
    component.value = 'test';
    component.loading = true;

    let searchEmitted = false;
    component.search.subscribe(() => {
      searchEmitted = true;
    });

    component.onSearch();
    expect(searchEmitted).toBe(false);
  });

  it('should emit clear event and reset value', () => {
    const fixture = TestBed.createComponent(SearchFieldMolecule);
    const component = fixture.componentInstance;
    component.value = 'test value';

    let clearEmitted = false;
    component.clear.subscribe(() => {
      clearEmitted = true;
    });

    let valueChangeEmitted: string | undefined;
    component.valueChange.subscribe((value: string) => {
      valueChangeEmitted = value;
    });

    component.onClear();
    expect(clearEmitted).toBe(true);
    expect(component.value).toBe('');
    expect(valueChangeEmitted).toBe('');
  });

  it('should emit valueChange when value changes', () => {
    const fixture = TestBed.createComponent(SearchFieldMolecule);
    const component = fixture.componentInstance;

    let emittedValue: string | undefined;
    component.valueChange.subscribe((value: string) => {
      emittedValue = value;
    });

    component.onValueChange('new value');
    expect(component.value).toBe('new value');
    expect(emittedValue).toBe('new value');
  });

  it('should generate correct CSS classes', () => {
    const fixture = TestBed.createComponent(SearchFieldMolecule);
    const component = fixture.componentInstance;
    component.size = 'lg';

    const classes = component.getSearchFieldClasses();
    expect(classes).toContain('molecule-search-field');
    expect(classes).toContain('molecule-search-field--lg');
  });

  it('should add loading class when loading', () => {
    const fixture = TestBed.createComponent(SearchFieldMolecule);
    const component = fixture.componentInstance;
    component.loading = true;

    const classes = component.getSearchFieldClasses();
    expect(classes).toContain('molecule-search-field--loading');
  });

  it('should trim search value before emitting', () => {
    const fixture = TestBed.createComponent(SearchFieldMolecule);
    const component = fixture.componentInstance;
    component.value = '  search term  ';

    let emittedValue: string | undefined;
    component.search.subscribe((value: string) => {
      emittedValue = value;
    });

    component.onSearch();
    expect(emittedValue).toBe('search term');
  });
});
