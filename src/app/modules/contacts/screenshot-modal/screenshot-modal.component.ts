import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';

@Component({
   selector: 'screenshot-modal',
   templateUrl: './screenshot-modal.component.html'
})

export class ScreenshotModalComponent {
   environment = environment;

   constructor(@Inject(MAT_DIALOG_DATA) public data: {
      paymentScreenshot: string
   }) {
      console.log(this.data);
   }
}