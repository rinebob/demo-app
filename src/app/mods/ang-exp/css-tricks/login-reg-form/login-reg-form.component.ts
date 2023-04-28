import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Login, UserAccount } from 'src/app/common/interfaces';
import { passwordsMatchValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-login-reg-form',
  templateUrl: './login-reg-form.component.html',
  styleUrls: ['./login-reg-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRegFormComponent implements OnDestroy {
  readonly destroy$ = new Subject<void>();
  @Input() implementationToShow: 'angular' | 'primitive' = 'angular';

  formMode: 'create' | 'login' = 'create';
  
  createAccountForm: FormGroup;
  
  usernameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', Validators.required);
  passwordControl = new FormControl('', Validators.required);
  confirmControl = new FormControl('');

  get username() {return this.createAccountForm.get('usernameControl')}
  get email() {return this.createAccountForm.get('emailControl')}
  get password() {return this.createAccountForm.get('passwordControl')}
  get confirm() {return this.createAccountForm.get('confirmControl')}

  loginForm: FormGroup;

  loginUserControl = new FormControl('', Validators.required);
  loginPasswordControl = new FormControl('', Validators.required);

  get loginUser() {return this.loginForm.get('loginUserControl')}
  get loginPassword() {return this.loginForm.get('loginPasswordControl')}

  usernameError = false;
  

  constructor() {
    this.buildForm();

    this.createAccountForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      // console.log('lRF ctor createAccountForm value changes sub: ', changes);
    });

    
    this.createAccountForm.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      // console.log('lRF ctor createAccountForm status changes sub: ', changes);
      // console.log('lRF ctor createAccountForm errors: ', this.createAccountForm.errors);
      // console.log('lRF ctor has pw error: ', this.createAccountForm.hasError('passwordsDoNotMatch'));
      // console.log('lRF ctor confirm touched: ', this.confirm?.touched);
    });
    
    this.loginForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      // console.log('lRF ctor loginForm value changes sub: ', changes);
    });
    
    this.loginForm.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      // console.log('lRF ctor loginForm status changes sub: ', changes);
    });

    this.usernameControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      // console.log('lRF ctor usernameControl value sub: ', changes);
      // console.log('lRF ctor usernameControl status: ', this.usernameControl.status);
    });
    
    this.usernameControl.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      // console.log('lRF ctor usernameControl status sub: ', changes);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm() {
    
      this.createAccountForm = new FormGroup({
        'usernameControl': this.usernameControl,
        'emailControl': this.emailControl,
        'passwordControl': this.passwordControl,
        'confirmControl': this.confirmControl,
      }, {validators: passwordsMatchValidator});
    
      this.loginForm = new FormGroup({
        'loginUserControl': this.loginUserControl,
        'loginPasswordControl': this.loginPasswordControl,
      });
  }

  handleSubmitForm() {
    if (this.formMode === 'create') {
      const account: UserAccount = {
        username: this.createAccountForm.get('usernameControl')?.value,
        emailAddress: this.createAccountForm.get('emailControl')?.value,
        password: this.createAccountForm.get('passwordControl')?.value,
      }

      // console.log('lRF hSF create account: ', account);

    } else {
      const login: Login = {
        username: this.loginForm.get('loginUserControl')?.value,
        password: this.loginForm.get('loginPasswordControl')?.value,
      }

      // console.log('lRF hSF login: ', login);
      
    }
  }
  
  toggleForm() {
    this.formMode = this.formMode === 'create' ? 'login' : 'create';
    // console.log('lRF tF new form mode: ', this.formMode);
  }

}
