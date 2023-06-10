import { Injector, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    declarations: [
        FuseConfirmationDialogComponent
    ],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        CommonModule,
        TranslocoModule
    ],
    providers: [
        FuseConfirmationService
    ]
})
export class FuseConfirmationModule {
    static injector: Injector;

    /**
     * Constructor
     */
    constructor(private _fuseConfirmationService: FuseConfirmationService, injector: Injector) {
        FuseConfirmationModule.injector = injector;
    }
}
