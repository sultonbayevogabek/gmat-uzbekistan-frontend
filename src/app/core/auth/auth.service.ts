import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { IUser } from '../../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
   private _authenticated: boolean = false;

   /**
    * Constructor
    */
   constructor(
      private _httpClient: HttpClient,
      private _userService: UserService
   ) {
   }

   // -----------------------------------------------------------------------------------------------------
   // @ Accessors
   // -----------------------------------------------------------------------------------------------------

   /**
    * Setter & getter for access token
    */
   set token(token: string) {
      localStorage.setItem('token', token);
   }

   get token(): string {
      return localStorage.getItem('token') ?? '';
   }

   /**
    * Sign in using the access token
    */
   signInUsingToken(): Observable<any> {
      // Sign in using the token
      return this._httpClient.post('api/auth/sign-in-with-token', {
         token: this.token
      }).pipe(
         catchError(() =>

            // Return false
            of(false)
         ),
         switchMap((response: any) => {

            // Replace the access token with the new one if it's available on
            // the response object.
            //
            // This is an added optional step for better security. Once you sign
            // in using the token, you should generate a new one on the server
            // side and attach it to the response object. Then the following
            // piece of code can replace the token with the refreshed one.
            if (response.accessToken) {
               this.token = response.accessToken;
            }

            // Set the authenticated flag to true
            this._authenticated = true;

            // Store the user on the user service
            this._userService.user = response.user;

            // Return true
            return of(true);
         })
      );
   }

   signOut(): Observable<any> {
      // Remove the access token from the local storage
      localStorage.removeItem('accessToken');

      // Set the authenticated flag to false
      this._authenticated = false;

      // Return the observable
      return of(true);
   }


   signUp(user: IUser): Observable<any> {
      return this._httpClient.post(environment.host + 'sign-up', user);
   }

   signIn(credentials: { phone: string; password: string }): Observable<any> {
      return this._httpClient.post(environment.host + 'sign-in', credentials).pipe(
         switchMap((response: any) => {
            this.token = response.token;
            this._authenticated = true;
            this._userService.user = response.user;
            return of(response);
         })
      );
   }

   unlockSession(credentials: { email: string; password: string }): Observable<any> {
      return this._httpClient.post('api/auth/unlock-session', credentials);
   }

   /**
    * Check the authentication status
    */
   check(): Observable<boolean> {
      // Check if the user is logged in
      if (this._authenticated) {
         return of(true);
      }

      // Check the access token availability
      if (!this.token) {
         return of(false);
      }

      // Check the access token expire date
      if (AuthUtils.isTokenExpired(this.token)) {
         return of(false);
      }

      // If the access token exists and it didn't expire, sign in using it
      return this.signInUsingToken();
   }
}
