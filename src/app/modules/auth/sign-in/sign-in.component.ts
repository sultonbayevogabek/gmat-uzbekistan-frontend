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

   alert: { type: FuseAlertType; message: string } = { type: 'error', message: 'Tizimga kirishda noma\'lum xatolik yuz berdi' };
   signInForm: UntypedFormGroup;
   showAlert: boolean = false;
   data = [
       {
           id: '1',
           firstName: 'Kamron',
           lastName: 'Sultonbayev'
       },
       {
           id: '2',
           firstName: 'Karim',
           lastName: 'Salimov'
       },
       {
           id: '3',
           firstName: 'Ajab',
           lastName: 'Karimov'
       },
       {
           id: '4',
           firstName: 'Solix',
           lastName: 'Sotimov'
       },
       {
           id: '5',
           firstName: 'Munira',
           lastName: 'Sultonbayev'
       },
       {
           id: '6',
           firstName: 'Sobit',
           lastName: 'Salimov'
       },
       {
           id: '7',
           firstName: 'Asad',
           lastName: 'Karimov'
       }
   ];
   defaultValue = ['1', '2', '3']

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
            phone: [ '', Validators.required ],
            password: [ '', [ Validators.required, Validators.minLength(6) ] ]
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

   signIn(): void {
       this.data = [
           {
               id: '6',
               firstName: 'Sobit',
               lastName: 'Salimov'
           },
           {
               id: '7',
               firstName: 'Asad',
               lastName: 'Karimov'
           }
       ];
       return;
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

            if (error === 'This user has not yet set up a password') {
               this.alert.message = `Parol o'rnatilmagan. Hisobingizga Google orqali kiring`;
            }

            this.showAlert = true;
         }
      );
   }

   onSelect($event) {
       console.log($event);
   }
}
