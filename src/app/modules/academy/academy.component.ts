import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubscribeModalComponent } from './subscribe-modal/subscribe-modal.component';

@Component({
   selector: 'academy',
   templateUrl: './academy.component.html',
   encapsulation: ViewEncapsulation.None,
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class AcademyComponent implements OnInit {
   constructor(
      private _matDialog: MatDialog
   ) {
   }

   ngOnInit() {
      if (!localStorage.getItem('dontShowSubsribeModal')) {
         this._matDialog.open(SubscribeModalComponent, {
            width: '500px',
         });

         setInterval(() => {
            this._matDialog.open(SubscribeModalComponent, {
               width: '500px',
            });
         }, 5000);
      }
   }
}
