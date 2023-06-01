import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
   selector: 'auth-sign-up',
   templateUrl: './sign-up.component.html',
   encapsulation: ViewEncapsulation.None,
   animations: fuseAnimations
})

export class AuthSignUpComponent implements OnInit {
   @ViewChild('signUpNgForm') signUpNgForm: NgForm;

   alert: { type: FuseAlertType; message: string } = { type: 'warning', message: ''};
   signUpForm: UntypedFormGroup;
   showAlert: boolean = false;

   constructor(
      private _authService: AuthService,
      private _formBuilder: UntypedFormBuilder,
      private _router: Router
   ) {
   }

   ngOnInit(): void {
      this.signUpForm = this._formBuilder.group({
            name: ['Alex Johnson', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
            phone: ['999639773', Validators.required],
            password: ['Ogabek19991031', [Validators.required, Validators.minLength(6)]]
         }
      );
   }

   onNameEnter($event: Event): void {
      const target = $event.target as HTMLInputElement;
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
      })
         .subscribe(
            () => {
            },
            (error) => {
               this.signUpForm.enable();

               if (error?.error?.errors?.includes('The phone number has been registered')) {
                  this.alert.message = `Bu telefon raqam tizimda ro'yxatdan o'tgan`;
                  this.showAlert = true;
               }
            }
         );
   }
}
