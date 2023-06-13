import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   OnDestroy,
   OnInit,
   ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs';
import { AcademyService } from 'app/modules/academy/academy.service';
import { Category, Course } from 'app/modules/academy/academy.types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'academy-list',
   templateUrl: './list.component.html',
   encapsulation: ViewEncapsulation.None,
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class AcademyListComponent implements OnInit, OnDestroy {
   title: string = '';
   duration: string = '';
   unit: string = '';
   videoId: string = '';
   description: string = '';
   files = [];

   categories: Category[];
   courses: Course[];
   filteredCourses: Course[];
   filters: {
      categorySlug$: BehaviorSubject<string>;
      query$: BehaviorSubject<string>;
      hideCompleted$: BehaviorSubject<boolean>;
   } = {
      categorySlug$: new BehaviorSubject('all'),
      query$: new BehaviorSubject(''),
      hideCompleted$: new BehaviorSubject(false)
   };

   private _unsubscribeAll: Subject<any> = new Subject<any>();

   /**
    * Constructor
    */
   constructor(
      private _activatedRoute: ActivatedRoute,
      private _changeDetectorRef: ChangeDetectorRef,
      private _router: Router,
      private _academyService: AcademyService,
      private _snackbar: MatSnackBar
   ) {
   }

   // -----------------------------------------------------------------------------------------------------
   // @ Lifecycle hooks
   // -----------------------------------------------------------------------------------------------------

   /**
    * On init
    */
   ngOnInit(): void {
      // Get the categories
      this._academyService.categories$
         .pipe(takeUntil(this._unsubscribeAll))
         .subscribe((categories: Category[]) => {
            this.categories = categories;

            // Mark for check
            this._changeDetectorRef.markForCheck();
         });

      // Get the courses
      this._academyService.courses$
         .pipe(takeUntil(this._unsubscribeAll))
         .subscribe((courses: Course[]) => {
            this.courses = this.filteredCourses = courses;

            // Mark for check
            this._changeDetectorRef.markForCheck();
         });

      // Filter the courses
      combineLatest([ this.filters.categorySlug$, this.filters.query$, this.filters.hideCompleted$ ])
         .subscribe(([ categorySlug, query, hideCompleted ]) => {

            // Reset the filtered courses
            this.filteredCourses = this.courses;

            // Filter by category
            if (categorySlug !== 'all') {
               this.filteredCourses = this.filteredCourses.filter(course => course.category === categorySlug);
            }

            // Filter by search query
            if (query !== '') {
               this.filteredCourses = this.filteredCourses.filter(course => course.title.toLowerCase().includes(query.toLowerCase())
                  || course.description.toLowerCase().includes(query.toLowerCase())
                  || course.category.toLowerCase().includes(query.toLowerCase()));
            }

            // Filter by completed
            if (hideCompleted) {
               this.filteredCourses = this.filteredCourses.filter(course => course.progress.completed === 0);
            }
         });
   }

   /**
    * On destroy
    */
   ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
   }

   // -----------------------------------------------------------------------------------------------------
   // @ Public methods
   // -----------------------------------------------------------------------------------------------------

   /**
    * Filter by search query
    *
    * @param query
    */
   filterByQuery(query: string): void {
      this.filters.query$.next(query);
   }

   /**
    * Filter by category
    *
    * @param change
    */
   filterByCategory(change: MatSelectChange): void {
      this.filters.categorySlug$.next(change.value);
   }

   /**
    * Show/hide completed courses
    *
    * @param change
    */
   toggleCompleted(change: MatSlideToggleChange): void {
      this.filters.hideCompleted$.next(change.checked);
   }

   onPdfFilesSelected(fileList: FileList) {
      const files = fileList;

      for (let i = 0, f; f = files[i]; i++) {
         if (!f.type.match('application/pdf') || f.size > 3 * 1024 * 1024) {
            continue;
         }

         this.files.push(f);
      }
   }

   removeFile(i: number) {
      this.files.splice(i, 1);
   }

   create() {
      console.log(this.title.trim());
      console.log(this.duration.trim());
      console.log(this.unit.trim());
      console.log(this.videoId.trim());
      console.log(this.videoId.trim());
      console.log(this.files);
      if (
         !this.title.trim().length || !this.duration.trim().length ||
         !this.unit || !this.videoId.trim().length ||
         !this.description.trim().length || !this.files.length
      ) {
         this._snackbar.open(`Ma'lumotlarni to'liq kiriting`, 'OK', {
            duration: 5000
         });
         return;
      }
      const formData: FormData = new FormData();

      formData.append('title', this.title);
      formData.append('duration', this.duration);
      formData.append('unit', this.unit);
      formData.append('videoId', this.videoId);
      formData.append('description', this.description);

      this.files.forEach(file => {
         formData.append('file', file);
      });

      this._academyService.createLesson(formData)
         .subscribe(() => {

         }, () => {

         });
   }

   trackByFn(index: number, item: any): any {
      return item.id || index;
   }
}
