import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { IUser } from '../../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
   constructor(
      private _httpClient: HttpClient,
      private _userService: UserService,
      private _router: Router
   ) {
   }

   set token(token: string) {
      localStorage.setItem('token', token);
   }

   get token(): string {
      return localStorage.getItem('token') ?? '';
   }

   signOut() {
      localStorage.removeItem('token');
      this._userService.user = null;
   }


   signUp(credentials: IUser): Observable<{ ok: boolean; user: IUser; token: string }> {
      return this._httpClient.post<{
         ok: boolean;
         user: IUser;
         token: string
      }>(environment.host + 'sign-up', credentials)
         .pipe(
            switchMap((response: { ok: boolean; user: IUser; token: string }) => {
               this.token = response.token;
               this._userService.user = response.user;
               this._router.navigate(['apps', 'academy']).then();
               return of(response);
            })
         );
   }

   signIn(credentials: { phone: string; password: string }): Observable<{ ok: boolean; user: IUser; token: string }> {
      return this._httpClient.post(environment.host + 'sign-in', credentials).pipe(
         switchMap((response: { ok: boolean; user: IUser; token: string }) => {
            this.token = response.token;
            this._userService.user = response.user;
            this._router.navigate(['apps', 'academy']).then();
            return of(response);
         })
      );
   }
}
