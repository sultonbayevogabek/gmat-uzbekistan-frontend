import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from 'app/modules/auth/auth.service';

@Injectable({
   providedIn: 'root'
})
export class AdminGuard implements CanActivate {
   constructor(
      private _authService: AuthService,
      private _router: Router
   ) {
   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this._authService.currentUser && this._authService.currentUser?.role === 'admin') {
         return true;
      }
      return this._authService.getUser().pipe(
         map(response => {
            if (response?.user && response?.user?.role === 'admin') {
               return true;
            } else {
               this._router.navigate(['404']).then();
               return false;
            }
         })
      );
   }
}
