import { TestBed } from '@angular/core/testing';
import { PassengerSelectorMolecule } from './passenger-selector.molecule';

describe('PassengerSelectorMolecule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerSelectorMolecule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PassengerSelectorMolecule);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    const fixture = TestBed.createComponent(PassengerSelectorMolecule);
    const component = fixture.componentInstance;
    expect(component.label).toBe('');
    expect(component.value).toBe(0);
    expect(component.min).toBe(0);
    expect(component.max).toBe(9);
  });

  it('should increment value', () => {
    const fixture = TestBed.createComponent(PassengerSelectorMolecule);
    const component = fixture.componentInstance;
    component.value = 2;
    component.max = 5;

    let emittedValue: number | undefined;
    component.valueChange.subscribe((value: number) => {
      emittedValue = value;
    });

    component.increment();
    expect(component.value).toBe(3);
    expect(emittedValue).toBe(3);
  });

  it('should not increment above max', () => {
    const fixture = TestBed.createComponent(PassengerSelectorMolecule);
    const component = fixture.componentInstance;
    component.value = 9;
    component.max = 9;

    component.increment();
    expect(component.value).toBe(9);
  });

  it('should decrement value', () => {
    const fixture = TestBed.createComponent(PassengerSelectorMolecule);
    const component = fixture.componentInstance;
    component.value = 3;
    component.min = 1;

    let emittedValue: number | undefined;
    component.valueChange.subscribe((value: number) => {
      emittedValue = value;
    });

    component.decrement();
    expect(component.value).toBe(2);
    expect(emittedValue).toBe(2);
  });

  it('should not decrement below min', () => {
    const fixture = TestBed.createComponent(PassengerSelectorMolecule);
    const component = fixture.componentInstance;
    component.value = 1;
    component.min = 1;

    component.decrement();
    expect(component.value).toBe(1);
  });

  it('should handle min and max boundaries', () => {
    const fixture = TestBed.createComponent(PassengerSelectorMolecule);
    const component = fixture.componentInstance;
    component.min = 0;
    component.max = 4;
    component.value = 0;

    component.decrement();
    expect(component.value).toBe(0);

    component.value = 4;
    component.increment();
    expect(component.value).toBe(4);
  });

  it('should have description', () => {
    const fixture = TestBed.createComponent(PassengerSelectorMolecule);
    const component = fixture.componentInstance;
    component.description = '12 anos ou mais';

    expect(component.description).toBe('12 anos ou mais');
  });
});
