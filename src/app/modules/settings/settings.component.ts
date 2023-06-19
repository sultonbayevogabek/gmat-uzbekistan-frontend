import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   OnDestroy,
   OnInit,
   ViewChild,
   ViewEncapsulation
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';

@Component({
   selector: 'settings',
   templateUrl: './settings.component.html',
   encapsulation: ViewEncapsulation.None,
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class SettingsComponent implements OnInit, OnDestroy {
   @ViewChild('drawer') drawer: MatDrawer;
   drawerMode: 'over' | 'side' = 'side';
   drawerOpened: boolean = true;
   panels: any[] = [];
   selectedPanel: string = 'account';
   private _unsubscribeAll: Subject<any> = new Subject<any>();

   constructor(
      private _changeDetectorRef: ChangeDetectorRef,
      private _fuseMediaWatcherService: FuseMediaWatcherService
   ) {
   }

   ngOnInit(): void {
      this.panels = [
         {
            id: 'account',
            icon: 'heroicons_outline:user-circle',
            title: 'Profil',
            description: `Profil ma'lumotlarini o'zgartirish`
         },
         {
            id: 'plan-billing',
            icon: 'heroicons_outline:credit-card',
            title: `To'lov`,
            description: `Kursga yozilish uchun to'lov qilish`
         }
      ];

      this._fuseMediaWatcherService.onMediaChange$
         .pipe(takeUntil(this._unsubscribeAll))
         .subscribe(({ matchingAliases }) => {
            if (matchingAliases.includes('lg')) {
               this.drawerMode = 'side';
               this.drawerOpened = true;
            } else {
               this.drawerMode = 'over';
               this.drawerOpened = false;
            }

            this._changeDetectorRef.markForCheck();
         });
   }

   ngOnDestroy(): void {
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
   }

   goToPanel(panel: string): void {
      this.selectedPanel = panel;

      // Close the drawer on 'over' mode
      if (this.drawerMode === 'over') {
         this.drawer.close();
      }
   }

   getPanelInfo(id: string): any {
      return this.panels.find(panel => panel.id === id);
   }

   trackByFn(index: number, item: any): any {
      return item.id || index;
   }
}
