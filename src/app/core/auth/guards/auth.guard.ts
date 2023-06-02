import { Injectable } from '@angular/core';
import {
   ActivatedRouteSnapshot,
   CanActivate,
   CanActivateChild,
   Router,
   RouterStateSnapshot,
   UrlTree
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from '../../user/user.service';

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
   constructor(
      private _authService: AuthService,
      private _router: Router,
      private _userService: UserService
   ) {
   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this._authService.token) {
         this._router.navigate(['/sign-in'])
         return false
      }

      if (!this._userService.user) {
         this._userService.getUser()
      }

      return true
   }

   canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(childRoute, state);
   }
}
