import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { SharedModule } from 'app/shared/shared.module';
import { academyRoutes } from 'app/modules/academy/academy.routing';
import { AcademyComponent } from 'app/modules/academy/academy.component';
import { AcademyDetailsComponent } from 'app/modules/academy/details/details.component';
import { AcademyListComponent } from 'app/modules/academy/list/list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
   declarations: [
      AcademyComponent,
      AcademyDetailsComponent,
      AcademyListComponent
   ],
   imports: [
      RouterModule.forChild(academyRoutes),
      MatButtonModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatProgressBarModule,
      MatSelectModule,
      MatSidenavModule,
      MatSlideToggleModule,
      MatTooltipModule,
      FuseFindByKeyPipeModule,
      SharedModule,
      MatTabsModule,
      NgxYoutubePlayerModule,
      MatRippleModule,
      MatSnackBarModule
   ]
})

export class AcademyModule {
}
