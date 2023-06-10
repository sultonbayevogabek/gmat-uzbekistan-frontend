import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ContactsService } from '../contacts.service';
import { IUser } from '../../../interfaces/user.interface';
import { environment } from 'environments/environment';
import { Confirmable } from '../../../decorators/confirmation.decorator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'contacts-list',
   templateUrl: './list.component.html'
})

export class ContactsListComponent implements OnInit, OnDestroy {
   search: string = '';
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
      private _snackbar: MatSnackBar
   ) {
   }

   ngOnInit() {
      this.getUserList();
   }

   getUserList() {
      this._usersService.getUsers().subscribe((response) => {
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

   ngOnDestroy() {
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
   }
}
