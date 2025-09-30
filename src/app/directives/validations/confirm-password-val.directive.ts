import { Directive, forwardRef } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[passwordsMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ConfirmPasswordValDirective),
      multi: true,
    },
  ],
  standalone: true,
})
export class ConfirmPasswordValDirective implements Validator {
  validate(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass && confirm && pass !== confirm
      ? { passwordsMismatch: true }
      : null;
  }
}
