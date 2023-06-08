import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { IUser } from '../../../../interfaces/user.interface';
import {AuthService} from "../../../../modules/auth/auth.service";

@Component({
   selector: 'classy-layout',
   templateUrl: './classy.component.html',
   encapsulation: ViewEncapsulation.None
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
   isScreenSmall: boolean;
   navigation: Navigation;
   user: IUser;
   private _unsubscribeAll: Subject<any> = new Subject<any>();

   constructor(
      private _activatedRoute: ActivatedRoute,
      private _router: Router,
      private _navigationService: NavigationService,
      private _fuseMediaWatcherService: FuseMediaWatcherService,
      private _fuseNavigationService: FuseNavigationService,
      private _authService: AuthService
   ) {
   }

   get currentYear(): number {
      return new Date().getFullYear();
   }

   ngOnInit(): void {
      this._navigationService.navigation$
         .pipe(takeUntil(this._unsubscribeAll))
         .subscribe((navigation: Navigation) => {
            this.navigation = navigation;
         });

      this._authService.userObservable$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(user => {
             this.user = user;
          })

      // Subscribe to media changes
      this._fuseMediaWatcherService.onMediaChange$
         .pipe(takeUntil(this._unsubscribeAll))
         .subscribe(({ matchingAliases }) => {
            this.isScreenSmall = !matchingAliases.includes('md');
         });
   }

   ngOnDestroy(): void {
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
   }

   // -----------------------------------------------------------------------------------------------------
   // @ Public methods
   // -----------------------------------------------------------------------------------------------------

   /**
    * Toggle navigation
    *
    * @param name
    */
   toggleNavigation(name: string): void {
      // Get the navigation
      const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

      if (navigation) {
         // Toggle the opened status
         navigation.toggle();
      }
   }
}
