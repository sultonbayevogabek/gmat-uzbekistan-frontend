import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/modules/auth/auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
   selector: 'auth-sign-in',
   templateUrl: './sign-in.component.html',
   encapsulation: ViewEncapsulation.None,
   animations: fuseAnimations
})

export class AuthSignInComponent implements OnInit {
   @ViewChild('signInNgForm') signInNgForm: NgForm;

   alert: { type: FuseAlertType; message: string } = { type: 'error', message: '' };
   signInForm: UntypedFormGroup;
   showAlert: boolean = false;

   constructor(
      private _authService: AuthService,
      private _formBuilder: UntypedFormBuilder,
      private _router: Router,
      private _socialAuthService: SocialAuthService
   ) {
   }

   ngOnInit(): void {
      localStorage.clear();
      this.signInForm = this._formBuilder.group({
            phone: [ '999639773', Validators.required ],
            password: [ 'Ogabek19991031', [ Validators.required, Validators.minLength(6) ] ]
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

   signUp(): void {
      if (this.signInForm.invalid) {
         return;
      }
      this.signInForm.disable();
      this.showAlert = false;

      let { phone, password } = this.signInForm.value;
      this._authService.signIn({
         phone: `+998${ phone }`, password
      }).subscribe(null, ({ error: { error } }) => {
            this.signInForm.enable();
            if (error === 'User has been blocked by system') {
               this.alert.message = `Foydalanuvchi bloklangan`;
            }
            if (error === 'User not found') {
               this.alert.message = `Bu raqam tizimda ro'yxatdan o'tmagan`;
            }
            if (error === 'Incorrect password') {
               this.alert.message = `Parol noto'g'ri`;
            }
            this.showAlert = true;
         }
      );
   }
}
