import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from '../settings.service';
import { IScreenshot } from '../../../interfaces/screenshot.interface';
import { environment } from '../../../../environments/environment';
import { Confirmable } from '../../../decorators/confirmation.decorator';

@Component({
   selector: 'settings-plan-billing',
   templateUrl: './plan-billing.component.html',
   encapsulation: ViewEncapsulation.None,
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class SettingsPlanBillingComponent implements OnInit {
   environment = environment;
   screenshots: IScreenshot[] = [];
   loaded = false;

   constructor(
      private _snackbar: MatSnackBar,
      private _settingsService: SettingsService,
      private _changeDetectorRef: ChangeDetectorRef
   ) {
   }

   ngOnInit(): void {
      this.getScreenshots();
   }

   uploadScreenshot(fileList: FileList): void {
      if (!fileList.length) {
         return;
      }

      const allowedTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ];
      const file = fileList[0];

      if (!allowedTypes.includes(file.type)) {
         return;
      }

      if (file.size > 3145728) {
         this._snackbar.open(`Skrinshot hajmi 3 MB dan oshmasligi kerak`, 'OK', {
            duration: 10000
         });
         return;
      }

      const formData = new FormData();
      formData.append('screenshot', file);

      this._settingsService.uploadScreenshot(formData)
         .subscribe(() => {
            this.getScreenshots();
            this._snackbar.open(`Skrinshot muvaffaqiyatli yuklandi`, 'OK', {
               duration: 5000
            });
         }, () => {
            this._snackbar.open(`Bittadan ortiq skrinshot yuklash mumkin emas`, 'OK', {
               duration: 5000
            });
         });
   }

   getScreenshots() {
      this._settingsService.getScreenshots().subscribe((res) => {
         this.loaded = true;
         this.screenshots = res?.screenshots || [];
         this._changeDetectorRef.markForCheck();
      });
   }

   @Confirmable({
      title: `Skrinshotni o'chirish`,
      message: `Skrinshotni o'chirishni tasdiqlaysizmi?`,
      dismissible: true
   })
   deleteScreenshot(id: string) {
      this._settingsService.deleteScreenshot(id).subscribe(() => {
         this.getScreenshots();
      });
   }
}
