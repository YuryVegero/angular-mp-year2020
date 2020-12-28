import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { validateDate } from 'app/shared/utils/validators/date-validator';


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
