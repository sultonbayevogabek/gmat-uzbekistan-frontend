import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { AuthSignUpComponent } from 'app/modules/auth/sign-up/sign-up.component';
import { authSignupRoutes } from 'app/modules/auth/sign-up/sign-up.routing';
import { NgxMaskModule } from 'ngx-mask';
import { SocialLoginModule } from '@abacritt/angularx-social-login';

@NgModule({
   declarations: [
      AuthSignUpComponent
   ],
   imports: [
      RouterModule.forChild(authSignupRoutes),
      MatButtonModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatProgressSpinnerModule,
      FuseAlertModule,
      SharedModule,
      NgxMaskModule.forRoot(),
      SocialLoginModule
   ]
})
export class AuthSignUpModule {
}
