import { Injectable } from '@angular/core';
import {
   ActivatedRouteSnapshot,
   CanActivate,
   CanActivateChild,
   Router,
   RouterStateSnapshot,
   UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'app/modules/auth/auth.service';

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
   constructor(
      private _authService: AuthService,
      private _router: Router
   ) {
   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this._authService.token) {
         this._router.navigate(['/sign-in'])
         return false
      }

      if (!this._authService.user) {
         this._authService.getUser()
      }

      return true
   }

   canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(childRoute, state);
   }
}
