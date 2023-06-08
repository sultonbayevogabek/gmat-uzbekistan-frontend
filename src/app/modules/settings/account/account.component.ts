import {
   ChangeDetectorRef,
   Component,
   OnDestroy,
   OnInit,
   ViewEncapsulation
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { SettingsService } from '../settings.service';
import { fuseAnimations } from '../../../../@fuse/animations';
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../../interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'settings-account',
   templateUrl: './account.component.html',
   encapsulation: ViewEncapsulation.None,
   animations: fuseAnimations
})
export class SettingsAccountComponent implements OnInit, OnDestroy {
   accountForm: UntypedFormGroup;
   changePasswordForm: UntypedFormGroup;
   setPasswordForm: UntypedFormGroup;
   user: IUser;

   private _unsubscribeAll: BehaviorSubject<any> = new BehaviorSubject<any>(null);

   constructor(
      private _formBuilder: UntypedFormBuilder,
      private _settingsService: SettingsService,
      private _authService: AuthService,
      private _snackbar: MatSnackBar,
      private _changeDetectorRef: ChangeDetectorRef
   ) {
   }

   ngOnInit(): void {
      this._authService.userObservable$
         .subscribe((user) => {
            this.user = user;

            if (user.password) {
               this.changePasswordForm = this._formBuilder.group({
                  currentPassword: [ '', [ Validators.required ] ],
                  newPassword: [ '', [ Validators.required, Validators.minLength(6) ] ]
               });
            }

            if (!user.password) {
               this.setPasswordForm = this._formBuilder.group({
                  newPassword: [ '', [ Validators.required, Validators.minLength(6) ] ]
               });
            }

            this._changeDetectorRef.markForCheck()
         })

      this.accountForm = this._formBuilder.group({
         name: [ '' ],
         email: [ '' ],
         phone: [ '999639773' ]
      });
   }

   changePassword() {
      if (this.changePasswordForm.invalid) {
         return;
      }
      this.changePasswordForm.disable();
      this._settingsService.changePassword(this.changePasswordForm.value)
         .subscribe(() => {
            this.changePasswordForm.reset();
            this.changePasswordForm.enable();
            this._snackbar.open(`Parol muvaffaqiyatli o'zgartirildi`, 'OK', {
               duration: 5000
            })
         }, ({ error: { error } }) => {
            this.changePasswordForm.enable();
            this._snackbar.open(`Eski parolingizni xato kiritdingiz`, 'OK', {
               duration: 5000
            })
         });
   }

   setPassword() {
      if (this.setPasswordForm.invalid) {
         return;
      }
      this.setPasswordForm.disable();
      this._settingsService.changePassword(this.setPasswordForm.value)
         .subscribe(() => {
            this._authService.getUser();
            this._snackbar.open(`Parol muvaffaqiyatli o'zgartirildi`, 'OK', {
               duration: 5000
            })
         }, ({ error: { error } }) => {
            this.changePasswordForm.enable();
            this._snackbar.open(`Parolni o'rnatishda xatolik sodir bo'ldi. Qayta urinib ko'ring`, 'OK', {
               duration: 5000
            })
         });
   }

   ngOnDestroy() {
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
   }
}
