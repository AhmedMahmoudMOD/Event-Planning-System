import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
    const password = control.get('password')|| control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if(!password || !confirmPassword){
        return null;
    }

    return  password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;
}