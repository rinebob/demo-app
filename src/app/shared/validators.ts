import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const passwordsMatchValidator: ValidatorFn = 
    (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('passwordControl');
        const confirm = control.get('confirmControl');

        return password && confirm && password.value === confirm.value ? 
            null 
            : {passwordsDoNotMatch: true};
}