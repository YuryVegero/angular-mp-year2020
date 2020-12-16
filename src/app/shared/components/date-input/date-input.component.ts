import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePipe } from '@angular/common';

export function validateDate(control: FormControl): object | null {
  const err = {
    formatError: {
      given: control.value,
    }
  };
  const date = isNaN(Date.parse(control.value)) ? null : new Date(control.value);
  const formattedDate = new DatePipe('en').transform(date, 'yyyy-MM-dd');
  return /\d{4}-\d{2}-\d{2}/.test(formattedDate) ? null : err;
}

@Component({
  selector: 'mp-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: [ './date-input.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useValue: validateDate,
      multi: true,
    }
  ]
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() value = '';
  @Input() label: string;

  propagateChange: any = () => {
  };

  propagateTouch: any = () => {
  };

  get dateValue(): string {
    return this.value;
  }

  set dateValue(val) {
    this.value = val;
    this.propagateChange(val);
    this.propagateTouch(val);
  }

  writeValue(value): void {
    if (value) {
      this.dateValue = value;
    }
  }

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn): void {
    this.propagateTouch = fn;
  }
}
