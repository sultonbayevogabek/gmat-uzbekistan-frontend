import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private _user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
   private _authenticated: boolean = false;

   constructor(
      private _httpClient: HttpClient,
      private _router: Router
   ) {
   }

   private _setToken(response: { ok: boolean; user: IUser; token: string } | null) {
      if (response) {
         localStorage.setItem('token', response?.token);
      } else {
         localStorage.clear();
      }
   }

   isAuthenticated(): boolean {
      return !!this.token;
   }

   get token(): string {
      return localStorage.getItem('token');
   }

   set authenticated(value: boolean) {
      this._authenticated = value;
   }

   get authenticated() {
      return this._authenticated;
   }

   get user$() {
      return this._user.asObservable();
   }

   getUser(): Observable<boolean> {
      if (!this.token) {
         return of(false);
      }
      return this._httpClient.post(environment.host + 'get-user', {})
         .pipe(
            switchMap((response: { ok: boolean; user: IUser }) => {
               this.authenticated = true;
               this._user.next(response.user);
               return of(true);
            }),
            catchError(() => {
               this.authenticated = false;
               this._router.navigate([ 'sign-in' ]).then();
               return of(false);
            })
         );
   }

   signOut() {
      this._setToken(null);
   }


   signUp(credentials: IUser): Observable<{ ok: boolean; user: IUser; token: string }> {
      return this._httpClient.post<{
         ok: boolean;
         user: IUser;
         token: string
      }>(environment.host + 'sign-up', credentials)
         .pipe(
            switchMap((response: { ok: boolean; user: IUser; token: string }) => {
               this.authenticated = true;
               this._router.navigate([ 'lessons' ]).then();
               return of(response);
            })
         );
   }

   signIn(credentials: { phone: string; password: string }): Observable<{ ok: boolean; user: IUser; token: string }> {
      return this._httpClient.post(environment.host + 'sign-in', credentials).pipe(
         switchMap((response: { ok: boolean; user: IUser; token: string }) => {
            this.authenticated = true;
            this._setToken(response);
            this._router.navigate([ 'lessons' ]).then();
            return of(response);
         })
      );
   }

   // signIn(credentials: { phone: string; password: string }): Observable<{ ok: boolean; user: IUser; token: string }> {
   //    return this._httpClient.post(environment.host + 'sign-in', credentials).pipe(
   //       tap(this._setToken)
   //    );
   // }

   googleAuth(idToken: string) {
      return this._httpClient.post(environment.host + 'google-auth', { idToken }).pipe(
         switchMap((response: { ok: boolean; user: IUser; token: string }) => {
            this._authenticated = true;
            this._router.navigate([ 'lessons' ]).then();
            return of(response);
         })
      );
   }
}
