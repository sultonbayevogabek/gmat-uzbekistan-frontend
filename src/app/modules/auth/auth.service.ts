import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
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

   isAuthenticated(): boolean {
      return this._authenticated;
   }

   get token(): string {
      return localStorage.getItem('token');
   }

   set token(value) {
      localStorage.setItem('token', value)
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

   getUser(): Observable<{ user: IUser }> {
      return this._httpClient.post(environment.host + 'get-user', {})
         .pipe(
            tap((response: { ok: boolean; user: IUser }) => {
               this._user.next(response.user);
               return response.user
            })
         );
   }

   signOut() {
      localStorage.clear();
      this._router.navigate(['sign-in']).then();
   }


   signUp(credentials: IUser): Observable<{ ok: boolean; token: string }> {
      return this._httpClient.post<{ ok: boolean; token: string }>(environment.host + 'sign-up', credentials)
         .pipe(
            switchMap((response: { ok: boolean; token: string }) => {
               this.authenticated = true;
               this.token = response?.token;
               this._router.navigate([ 'lessons' ]).then();
               return of(response);
            })
         );
   }

   signIn(credentials: { phone: string; password: string }): Observable<{ ok: boolean; token: string }> {
      return this._httpClient.post(environment.host + 'sign-in', credentials).pipe(
         switchMap((response: { ok: boolean; token: string }) => {
            this.authenticated = true;
            this.token = response?.token;
            this._router.navigate([ 'lessons' ]).then();
            return of(response);
         })
      );
   }

   googleAuth(idToken: string) {
      return this._httpClient.post(environment.host + 'google-auth', { idToken }).pipe(
         switchMap((response: { ok: boolean; token: string }) => {
            this.authenticated = true;
            this.token = response?.token;
            this._router.navigate([ 'lessons' ]).then();
            return of(response);
         })
      );
   }
}
