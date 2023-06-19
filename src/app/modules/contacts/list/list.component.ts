import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   OnDestroy,
   OnInit,
   ViewEncapsulation
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ContactsService } from '../contacts.service';
import { IPayment, IUser } from '../../../interfaces/user.interface';
import { environment } from 'environments/environment';
import { Confirmable } from '../../../decorators/confirmation.decorator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ScreenshotModalComponent } from '../screenshot-modal/screenshot-modal.component';

@Component({
   selector: 'contacts-list',
   templateUrl: './list.component.html',
   encapsulation: ViewEncapsulation.None,
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactsListComponent implements OnInit, OnDestroy {
   searchParams = {
      screenshotSeen: 'all',
      name: '',
      role: 'all'
   }
   count: number = 0;
   users: IUser[] = [];
   environment = environment;
   private _unsubscribeAll: Subject<any> = new Subject<any>();

   /**
    * Constructor
    */
   constructor(
      private _usersService: ContactsService,
      private _changeDetectorRef: ChangeDetectorRef,
      private _snackbar: MatSnackBar,
      private _matDialog: MatDialog
   ) {
   }

   ngOnInit() {
      this.getUserList();
   }

   getUserList() {
      this._usersService.getUsers(this.searchParams)
         .subscribe((response) => {
         this.users = response?.users;
         this.count = response?.count;
         this._changeDetectorRef.markForCheck();
      });
   }

   @Confirmable({
      title: `Foydalanuvchini o'chirish`,
      message: `Foydalanuvchini o'chirishni tasdiqlaysizmi?`,
      dismissible: true
   })
   deleteUser(id: string) {
      this._usersService.deleteUser(id)
         .pipe(takeUntil(this._unsubscribeAll))
         .subscribe(() => {
            this._snackbar.open(`Foydalanuvchi o'chirildi`, 'OK', {
               duration: 5000
            })
            this.getUserList();
         });
   }

   @Confirmable({
      title: `Foydalanuvchi rolini o'zgartirish`,
      message: `Foydalanuvchi rolini o'zgartirishni tasdiqlaysizmi?`,
      dismissible: true
   })
   changeRole(id: string) {
      this._usersService.changeRole(id)
         .pipe(takeUntil(this._unsubscribeAll))
         .subscribe(() => {
            this._snackbar.open(`Foydalanuvchi roli o'zgartirildi`, 'OK', {
               duration: 5000
            })
            this.getUserList();
         });
   }

   openScreenshot(screenshot: IPayment) {
      if (!screenshot?.seenTime) {
         screenshot.seenTime = new Date().toDateString();
         this._usersService.setScreenshotAsSeen(screenshot.id);
      }
      this._matDialog.open(ScreenshotModalComponent, {
         data: {
            paymentScreenshot: screenshot.paymentScreenshot
         },
         width: '400px'
      })
   }

   ngOnDestroy() {
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
   }
}
