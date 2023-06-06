import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsComponent } from 'app/modules/admin/pages/settings/settings.component';
import { SettingsAccountComponent } from 'app/modules/admin/pages/settings/account/account.component';
import { SettingsPlanBillingComponent } from 'app/modules/admin/pages/settings/plan-billing/plan-billing.component';
import { SettingsTeamComponent } from 'app/modules/admin/pages/settings/team/team.component';
import { settingsRoutes } from 'app/modules/admin/pages/settings/settings.routing';
import { NgxMaskModule } from 'ngx-mask';
import { SettingsService } from './settings.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        SettingsComponent,
        SettingsAccountComponent,
        SettingsPlanBillingComponent,
        SettingsTeamComponent
    ],
   imports: [
      RouterModule.forChild(settingsRoutes),
      MatButtonModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatRadioModule,
      MatSelectModule,
      MatSidenavModule,
      MatSlideToggleModule,
      FuseAlertModule,
      SharedModule,
      NgxMaskModule.forRoot(),
      MatProgressSpinnerModule
   ],
   providers: [SettingsService]
})
export class SettingsModule
{
}
