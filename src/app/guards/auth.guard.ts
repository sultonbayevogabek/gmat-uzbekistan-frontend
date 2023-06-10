import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
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
         this._router.navigate(['sign-in']).then();
         return false;
      }
      return true;
   }

   canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(childRoute, state);
   }
}
