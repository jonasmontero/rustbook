import { TestBed } from '@angular/core/testing';
import { HeaderOrganism } from './header.organism';

describe('HeaderOrganism', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderOrganism],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HeaderOrganism);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit menuClick event', () => {
    const fixture = TestBed.createComponent(HeaderOrganism);
    const component = fixture.componentInstance;

    let clicked = false;
    component.menuClick.subscribe(() => (clicked = true));

    component.onMenuClick();
    expect(clicked).toBe(true);
  });

  it('should emit searchSubmit event', () => {
    const fixture = TestBed.createComponent(HeaderOrganism);
    const component = fixture.componentInstance;

    let searchTerm = '';
    component.searchSubmit.subscribe((value) => (searchTerm = value));

    component.onSearch('GRU-GIG');
    expect(searchTerm).toBe('GRU-GIG');
  });
});
