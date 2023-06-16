import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';

@Component({
   selector: 'lesson-modal',
   templateUrl: './lesson-modal.component.html',
   styleUrls: [ './lesson-modal.component.scss' ],
   encapsulation: ViewEncapsulation.None
})

export class LessonModalComponent implements OnInit {
   environment = environment;

   constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _changeDetectorRef: ChangeDetectorRef
   ) {
   }

   ngOnInit() {

   }
}