import { Directive } from '@angular/core';
import {ValidationErrors, ValidatorFn} from "@angular/forms";
import {AbstractControl} from "@angular/forms";

// @Directive({
//   selector: '[appConfirmPassword]'
// })
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
};
