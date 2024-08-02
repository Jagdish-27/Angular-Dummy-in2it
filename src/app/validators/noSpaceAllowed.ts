import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value || '';
    const hasSpace = value.indexOf(' ') !== -1; 
    return hasSpace ? { 'noSpace': true } : null;
  };
}
