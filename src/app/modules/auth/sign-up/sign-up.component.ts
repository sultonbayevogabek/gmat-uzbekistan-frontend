import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/modules/auth/auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
   selector: 'auth-sign-up',
   templateUrl: './sign-up.component.html',
   encapsulation: ViewEncapsulation.None,
   animations: fuseAnimations
})

export class AuthSignUpComponent implements OnInit {
   alert: { type: FuseAlertType; message: string } = { type: 'error', message: '' };
   signUpForm: UntypedFormGroup;
   showAlert: boolean = false;

   constructor(
      private _authService: AuthService,
      private _formBuilder: UntypedFormBuilder,
      private _router: Router,
      private _socialAuthService: SocialAuthService
   ) {
   }

   ngOnInit(): void {
      this._authService.signOut();
      this.signUpForm = this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
            phone: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
         }
      );
      this._socialAuthService.authState.subscribe((user) => {
         this._authService.googleAuth(user.idToken)
            .subscribe(null, ({ error: { error } }) => {
                  if (error === 'User has been blocked by system') {
                     this.alert.message = `Foydalanuvchi bloklangan`;
                  }
                  this.showAlert = true;
               }
            );
      });
   }

   onNameEnter($event: Event): void {
      const target: HTMLInputElement = $event.target as HTMLInputElement;
      let value: string = target.value;
      let length: number = value.length;

      if (length === 1) {
         value = value.trim();
      }

      if (length > 1) {
         const lastSymbol = value.charAt(length - 1);
         const preLastSymbol = value.charAt(length - 2);

         if (lastSymbol === ' ' && preLastSymbol === ' ') {
            value = value.slice(0, length - 1);
         }
      }
      this.signUpForm.get('name').patchValue(value);
      this.signUpForm.get('name').updateValueAndValidity();
   }

   signUp(): void {
      if (this.signUpForm.invalid) {
         return;
      }

      this.signUpForm.disable();
      this.showAlert = false;
      this._authService.signUp({
         ...this.signUpForm.value,
         phone: `+998${this.signUpForm.get('phone').value}`
      }).subscribe(null, ({ error: { error } }) => {
            this.signUpForm.enable();
            if (error === 'User has been blocked by system') {
               this.alert.message = `Foydalanuvchi bloklangan`;
            }
            if (error === 'The phone number has already been registered') {
               this.alert.message = `Bu telefon raqam tizimda ro'yxatdan o'tgan`;
            }
            this.showAlert = true;
         }
      );
   }
}
