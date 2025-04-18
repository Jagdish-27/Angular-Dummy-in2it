import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordValidatorDirective implements Validator {
  constructor() {}

  @Input('appPasswordValidator') validationPattern!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      let pattern = new RegExp(this.validationPattern);

      let isValid = pattern.test(control.value);

      if (!isValid) {
        return { passwordPattern: true };
      }
    }
    return null;
  }
}
