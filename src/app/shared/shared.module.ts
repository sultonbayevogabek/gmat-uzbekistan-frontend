import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
   declarations: [SearchPipe],
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule
   ],
   exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      SearchPipe
   ]
})

export class SharedModule {
}
