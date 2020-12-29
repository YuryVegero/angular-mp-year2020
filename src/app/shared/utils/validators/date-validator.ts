import { FormControl } from '@angular/forms';
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
