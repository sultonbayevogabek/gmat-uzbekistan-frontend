import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { ILesson } from '../../../interfaces/lesson.interface';

@Component({
   selector: 'lesson-modal',
   templateUrl: './lesson-modal.component.html',
   styleUrls: [ './lesson-modal.component.scss' ],
   encapsulation: ViewEncapsulation.None
})

export class LessonModalComponent {
   environment = environment;
   units = {
      all: 'Hammasi',
      numbers: 'Raqamlar',
      algorithms: 'Algoritmlar',
      combinatorics: 'Kombinatorika',
   };

   constructor(
      @Inject(MAT_DIALOG_DATA) public data: ILesson
   ) {
   }
}
