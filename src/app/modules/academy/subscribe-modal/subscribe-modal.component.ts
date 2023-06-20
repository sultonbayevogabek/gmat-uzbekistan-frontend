import { Component, Inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
   selector: 'subscribe-modal',
   templateUrl: './subscribe-modal.component.html'
})

export class SubscribeModalComponent {
   dontShowSubscribeModal($event: MatCheckboxChange) {
      localStorage.setItem('dontShowSubscribeModal', String($event.checked));
   }
}
