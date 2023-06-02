import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class UserService {
   private _user: IUser;

   constructor(
      private _httpClient: HttpClient,
      private _router: Router
   ) {
   }

   set user(value: IUser) {
      this._user = value
   }

   get user() {
      return this._user
   }

   getUser() {
      this._httpClient.post(environment.host + 'get-user', {})
         .subscribe((response: { ok: boolean; user: IUser }) => {
            this.user = response.user
         }, () => {
            this._router.navigate(['sign-in']).then()
         })
   }
}
