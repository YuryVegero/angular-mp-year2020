import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { createRangeValidator } from 'app/shared/utils/validators/range-validator';


@Component({
  selector: 'mp-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: [ './duration-input.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true,
    }
  ]
})
export class DurationInputComponent implements ControlValueAccessor, OnChanges {
  @Input() value = 1;
  @Input() max: number;
  @Input() min: number;
  @Input() label: string;

  propagateChange: any = () => {
  };

  propagateTouch: any = () => {
  };

  validateFn: any = () => {
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.max || changes.min) {
      this.validateFn = createRangeValidator(this.min, this.max);
    }
  }

  get durationValue(): number {
    return this.value;
  }

  set durationValue(val) {
    this.value = val;
    this.propagateChange(val);
    this.propagateTouch(val);
  }

  writeValue(value): void {
    if (value) {
      this.durationValue = value;
    }
  }

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn): void {
    this.propagateTouch = fn;
  }

  validate(control: FormControl): boolean {
    return this.validateFn(control);
  }
}
