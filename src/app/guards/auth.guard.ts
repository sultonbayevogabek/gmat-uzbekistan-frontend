import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
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
      console.log(this._authService.authenticated)
      if (this._authService.authenticated) {
         return true;
      }
      if (!this._authService.token) {
         this._router.navigate(['sign-in']).then();
         return false;
      }
      this._authService.getUser()
         .subscribe((auth) => {
            return auth;
         })
   }

   canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(childRoute, state);
   }
}
