import { FormControl } from '@angular/forms';

export function createRangeValidator(minValue, maxValue): any {
  return (control: FormControl) => {
    const err = {
      rangeError: {
        given: control.value,
        min: (minValue > 0) ? minValue : 1,
        max: maxValue || 10000,
      }
    };

    return (control.value > +maxValue || control.value < +minValue) ? err : null;
  };
}
