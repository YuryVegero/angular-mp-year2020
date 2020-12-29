import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'mp-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: [ './text-input.component.scss' ],
})
export class TextInputComponent {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() type = 'text';

  get showErrors(): boolean {
    const { invalid, touched, errors } = this.control;
    return !!invalid && !!touched && !!errors;
  }

  get isRequired(): boolean {
    const validator = this.control.validator({} as AbstractControl);
    return validator?.required;
  }
}
