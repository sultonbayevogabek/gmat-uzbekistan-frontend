import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { SettingsService } from '../settings.service';
import { FuseAlertType } from '../../../../../../@fuse/components/alert';

@Component({
   selector: 'settings-account',
   templateUrl: './account.component.html',
   encapsulation: ViewEncapsulation.None,
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsAccountComponent implements OnInit, OnDestroy {
   accountForm: UntypedFormGroup;
   changePasswordForm: UntypedFormGroup;
   passwordChangeAlert: { type: FuseAlertType; message: string };
   showPasswordChangeAlert: boolean = false;

   private _unsubscribeAll: BehaviorSubject<any> = new BehaviorSubject<any>(null)

   constructor(
      private _formBuilder: UntypedFormBuilder,
      private _settingsService: SettingsService
   ) {
   }

   ngOnInit(): void {
      this.accountForm = this._formBuilder.group({
         name: [''],
         email: [''],
         phone: ['999639773']
      });
      this.changePasswordForm = this._formBuilder.group({
         currentPassword: ['', [Validators.required]],
         newPassword: ['', [Validators.required, Validators.minLength(6)]]
      });
   }

   changePassword() {
      if (this.changePasswordForm.invalid) {
         return;
      }
      this.changePasswordForm.disable();
      this._settingsService.changePassword(this.changePasswordForm.value)
         .pipe(takeUntil(this._unsubscribeAll))
         .subscribe(() => {
            this.changePasswordForm.reset();
            this.changePasswordForm.enable();
            this.passwordChangeAlert = {
               type: 'success',
               message: `Parol muvaffaqiyatli o'zgartirildi`
            }
            this.showPasswordChangeAlert = true;

            setTimeout(() => {
               this.showPasswordChangeAlert = false;
            }, 10000)
         }, ({ error: {error}}) => {
            this.changePasswordForm.enable()
            this.passwordChangeAlert = {
               type: 'error',
               message: `Eski parolingizni xato kiritdingiz`
            }
            this.showPasswordChangeAlert = true;
         })
   }

   ngOnDestroy() {
      this._unsubscribeAll.next(null)
      this._unsubscribeAll.complete()
   }
}
