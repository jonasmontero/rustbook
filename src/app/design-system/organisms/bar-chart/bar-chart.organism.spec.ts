import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarChartOrganism } from './bar-chart.organism';

describe('BarChartOrganism', () => {
  let component: BarChartOrganism;
  let fixture: ComponentFixture<BarChartOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartOrganism],
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartOrganism);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
