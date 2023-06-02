import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
   providedIn: 'root'
})
export class UserService {
   private _user: IUser;

   constructor(private _httpClient: HttpClient) {
   }

   set user(value: IUser) {
      this._user = value
   }

   get user() {
      return this._user
   }

   getUser(): Observable<any> {
      return this._httpClient.post(environment.host + 'get-user', {})
         .pipe(
            tap((response) => { this.user = response.user }),
            catchError(() => {})
         )
   }
}
