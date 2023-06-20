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
import { AcademyListComponent } from 'app/modules/academy/list/list.component';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LessonModalComponent } from './lesson-modal/lesson-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YoutubePlayer } from './youtube-player/youtube-player.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { SubscribeModalComponent } from './subscribe-modal/subscribe-modal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
   declarations: [
      AcademyComponent,
      AcademyListComponent,
      LessonModalComponent,
      YoutubePlayer,
      VideoPlayerComponent,
      SubscribeModalComponent
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
      MatRippleModule,
      MatSnackBarModule,
      MatMenuModule,
      MatProgressSpinnerModule,
      MatDialogModule,
      YouTubePlayerModule,
      MatCheckboxModule
   ]
})

export class AcademyModule {
}
