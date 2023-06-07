import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
   public _userObservable: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
   private _user: IUser;

   constructor(
      private _httpClient: HttpClient,
      private _router: Router
   ) {
   }

   set token(token: string) {
      localStorage.setItem('token', token);
   }

   get token(): string {
      return localStorage.getItem('token') ?? '';
   }

   set user(value: IUser) {
      this._user = value;
   }

   get user() {
      return this._user;
   }

   get userObservable$() {
      return this._userObservable.asObservable();
   }

   getUser() {
      this._httpClient.post(environment.host + 'get-user', {})
         .subscribe((response: { ok: boolean; user: IUser }) => {
            this.user = response.user;
            this._userObservable.next(response.user);
         }, () => {
            this._router.navigate([ 'sign-in' ]).then();
         });
   }

   signOut() {
      localStorage.removeItem('token');
      this.user = null;
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
               this.user = response.user;
               this._userObservable.next(response.user);
               this._router.navigate([ 'lessons' ]).then();
               return of(response);
            })
         );
   }

   signIn(credentials: { phone: string; password: string }): Observable<{ ok: boolean; user: IUser; token: string }> {
      return this._httpClient.post(environment.host + 'sign-in', credentials).pipe(
         switchMap((response: { ok: boolean; user: IUser; token: string }) => {
            this.token = response.token;
            this.user = response.user;
            this._userObservable.next(response.user);
            this._router.navigate([ 'lessons' ]).then();
            return of(response);
         })
      );
   }

   googleAuth(idToken: string) {
      return this._httpClient.post(environment.host + 'google-auth', { idToken }).pipe(
         switchMap((response: { ok: boolean; user: IUser; token: string }) => {
            this.token = response.token;
            this.user = response.user;
            this._userObservable.next(response.user);
            this._router.navigate([ 'lessons' ]).then();
            return of(response);
         })
      );
   }
}
