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

   openSubscribeModal() {
      if (!localStorage.getItem('dontShowSubscribeModal') || localStorage.getItem('dontShowSubscribeModal') !== 'true') {
         const modal = this._matDialog.open(SubscribeModalComponent, {
            width: '500px',
         });

         setTimeout(() => {
            modal.close();
         }, 150000);
      }
   }

   ngOnInit() {
      this.openSubscribeModal();

      setInterval(() => {
         this.openSubscribeModal();
      }, 300000);
   }
}
