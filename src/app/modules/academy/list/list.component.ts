import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   OnDestroy,
   OnInit,
   ViewEncapsulation
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AcademyService } from 'app/modules/academy/academy.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ILesson } from '../../../interfaces/lesson.interface';
import { IUser } from '../../../interfaces/user.interface';
import { AuthService } from '../../auth/auth.service';
import { Confirmable } from '../../../decorators/confirmation.decorator';

@Component({
   selector: 'academy-list',
   templateUrl: './list.component.html',
   encapsulation: ViewEncapsulation.None,
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class AcademyListComponent implements OnInit, OnDestroy {
   loaded = false;
   user: IUser;
   units = {
      all: 'Hammasi',
      numbers: 'Raqamlar',
      algorithms: 'Algoritmlar',
      combinatorics: 'Kombinatorika',
   };
   editableLessonId: string;
   searchParams = {
      unit: 'all',
      title: ''
   };
   title: string = 'Murakkab sonlar ustida amallar bajarish';
   duration: string = '27 minut';
   unit: string = 'numbers';
   videoId: string = 'TLuaTrYh7Pk';
   description: string = 'Bu darsda murakkab sonlar ustida turli qiyinlikdagi masalalarni ishlashni o\'rganamiz';
   files = [];
   lessons: ILesson[] = [];

   private _unsubscribeAll: Subject<any> = new Subject<any>();

   constructor(
      private _changeDetectorRef: ChangeDetectorRef,
      private _academyService: AcademyService,
      private _authService: AuthService,
      private _snackbar: MatSnackBar
   ) {
   }

   ngOnInit(): void {
      this._authService.user$.subscribe((user) => {
         this.user = user;
      });
      this.getLessons();
   }

   getLessons() {
      this._academyService.getLessons(this.searchParams)
         .pipe(takeUntil(this._unsubscribeAll))
         .subscribe((res) => {
            this.loaded = true;
            this.lessons = res?.lessons;
            this._changeDetectorRef.markForCheck();
         });
   }

   onPdfFilesSelected(fileList: FileList) {
      for (let i = 0, f; f = fileList[i]; i++) {
         if (!f.type.match('application/pdf') || f.size > 3 * 1024 * 1024) {
            continue;
         }

         this.files.push(f);
      }
   }

   removeFile(i: number) {
      this.files.splice(i, 1);
   }

   createOrUpdate() {
      if (
         !this.title.trim().length || !this.duration.trim().length ||
         !this.unit || !this.videoId.trim().length ||
         !this.description.trim().length
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
         formData.append('files', file);
      });

      if (!this.editableLessonId) {
         this._academyService.createLesson(formData)
            .subscribe(() => {
               this.clear();
               this._snackbar.open(`Yangi dars yaratildi`, 'OK', {
                  duration: 5000
               });
               this.getLessons();
            }, () => {
               this._snackbar.open(`Darsni yaratishda xatolik yuz berdi`, 'OK', {
                  duration: 5000
               });
            });
         return;
      }

      formData.append('id', this.editableLessonId);
      this._academyService.updateLesson(formData)
         .subscribe(() => {
            this.clear();
            this._snackbar.open(`Yangi dars yaratildi`, 'OK', {
               duration: 5000
            });
            this.getLessons();
         }, () => {
            this._snackbar.open(`Darsni yaratishda xatolik yuz berdi`, 'OK', {
               duration: 5000
            });
         });
   }

   edit(lesson: ILesson) {
      this.editableLessonId = lesson?.id;
      this.title = lesson?.title;
      this.duration = lesson?.duration;
      this.unit = lesson?.unit;
      this.videoId = lesson?.videoId;
      this.description = lesson?.description;
      this.files = [];
   }

   clear() {
      this.title = '';
      this.duration = '';
      this.unit = '';
      this.videoId = '';
      this.description = '';
      this.files = [];
      this._changeDetectorRef.markForCheck();
   }

   @Confirmable({
      title: `Darsni o'chirish`,
      message: `Darsni o'chirishni tasdiqlaysizmi?`
   })
   deleteLesson(id: string) {
      this._academyService.deleteLesson(id)
         .pipe(takeUntil(this._unsubscribeAll))
         .subscribe(() => {
            this.getLessons();
         });
   }

   incrementViewsCount(id: string) {
      this._academyService.incrementViewsCount(id);
   }

   ngOnDestroy() {
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
   }
}
