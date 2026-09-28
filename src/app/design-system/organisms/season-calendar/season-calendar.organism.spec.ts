import { TestBed } from '@angular/core/testing';
import { SeasonCalendarOrganism } from './season-calendar.organism';

describe('SeasonCalendarOrganism', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonCalendarOrganism],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SeasonCalendarOrganism);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit monthClick event', () => {
    const fixture = TestBed.createComponent(SeasonCalendarOrganism);
    const component = fixture.componentInstance;

    let clickedMonth = 0;
    component.monthClick.subscribe((month) => (clickedMonth = month));

    component.onMonthClick(5);
    expect(clickedMonth).toBe(5);
  });

  it('should return correct season label', () => {
    const fixture = TestBed.createComponent(SeasonCalendarOrganism);
    const component = fixture.componentInstance;

    expect(component.getSeasonLabel('low')).toBe('Baixa');
    expect(component.getSeasonLabel('medium')).toBe('Média');
    expect(component.getSeasonLabel('high')).toBe('Alta');
    expect(component.getSeasonLabel(undefined)).toBe('N/D');
  });

  it('should format price correctly', () => {
    const fixture = TestBed.createComponent(SeasonCalendarOrganism);
    const component = fixture.componentInstance;

    expect(component.formatPrice(450.75)).toBe('R$ 451');
    expect(component.formatPrice(undefined)).toBe('N/D');
  });
});
