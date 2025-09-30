import { Directive, forwardRef } from '@angular/core';
import {
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[password]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordValDirective),
      multi: true,
    },
  ],
  standalone: true,
})
export class PasswordValDirective implements Validator {
  validPassWordRegex =
    /^(?=.{9,}$)(?=.*\d)(?=.*[A-Za-z])(?!.*[^\w#!.\-+]).*(?=.*[#!.\-+]).*$/;
  validate(control: AbstractControl): ValidationErrors | null {
    return this.validPassWordRegex.test(control.value)
      ? null
      : { password: true };
  }
}
