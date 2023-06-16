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
import { SettingsComponent } from 'app/modules/settings/settings.component';
import { SettingsAccountComponent } from 'app/modules/settings/account/account.component';
import { SettingsPlanBillingComponent } from 'app/modules/settings/plan-billing/plan-billing.component';
import { settingsRoutes } from 'app/modules/settings/settings.routing';
import { NgxMaskModule } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatRippleModule} from "@angular/material/core";

@NgModule({
   declarations: [
      SettingsComponent,
      SettingsAccountComponent,
      SettingsPlanBillingComponent
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
        MatProgressSpinnerModule,
        HttpClientModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatRippleModule
    ]
})

export class SettingsModule {
}
