import { TestBed } from '@angular/core/testing';
import { DatePickerMolecule } from './date-picker.molecule';

describe('DatePickerMolecule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerMolecule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DatePickerMolecule);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    const fixture = TestBed.createComponent(DatePickerMolecule);
    const component = fixture.componentInstance;
    expect(component.label).toBe('');
    expect(component.value).toBe('');
    expect(component.placeholder).toBe('');
    expect(component.required).toBe(false);
    expect(component.disabled).toBe(false);
    expect(component.error).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  it('should emit dateChange when date changes', () => {
    const fixture = TestBed.createComponent(DatePickerMolecule);
    const component = fixture.componentInstance;

    let emittedValue: string | undefined;
    component.dateChange.subscribe((value: string) => {
      emittedValue = value;
    });

    component.onDateChange('2024-03-15');
    expect(component.value).toBe('2024-03-15');
    expect(emittedValue).toBe('2024-03-15');
  });

  it('should generate unique input ID', () => {
    const fixture1 = TestBed.createComponent(DatePickerMolecule);
    const fixture2 = TestBed.createComponent(DatePickerMolecule);

    const component1 = fixture1.componentInstance;
    const component2 = fixture2.componentInstance;

    expect(component1.inputId).toBeTruthy();
    expect(component2.inputId).toBeTruthy();
    expect(component1.inputId).not.toBe(component2.inputId);
  });

  it('should accept custom input ID', () => {
    const fixture = TestBed.createComponent(DatePickerMolecule);
    const component = fixture.componentInstance;
    component.inputId = 'custom-id';

    expect(component.inputId).toBe('custom-id');
  });

  it('should handle minDate and maxDate', () => {
    const fixture = TestBed.createComponent(DatePickerMolecule);
    const component = fixture.componentInstance;
    component.minDate = '2024-01-01';
    component.maxDate = '2024-12-31';

    expect(component.minDate).toBe('2024-01-01');
    expect(component.maxDate).toBe('2024-12-31');
  });

  it('should handle required state', () => {
    const fixture = TestBed.createComponent(DatePickerMolecule);
    const component = fixture.componentInstance;
    component.required = true;

    expect(component.required).toBe(true);
  });

  it('should handle disabled state', () => {
    const fixture = TestBed.createComponent(DatePickerMolecule);
    const component = fixture.componentInstance;
    component.disabled = true;

    expect(component.disabled).toBe(true);
  });

  it('should handle error state', () => {
    const fixture = TestBed.createComponent(DatePickerMolecule);
    const component = fixture.componentInstance;
    component.error = true;
    component.errorMessage = 'Invalid date';

    expect(component.error).toBe(true);
    expect(component.errorMessage).toBe('Invalid date');
  });
});
