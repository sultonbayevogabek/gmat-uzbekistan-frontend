import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'settings-account',
    templateUrl: './account.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsAccountComponent implements OnInit {
    accountForm: UntypedFormGroup;
    constructor(
        private _formBuilder: UntypedFormBuilder
    ) {
    }

    ngOnInit(): void {
        // Create the form
        this.accountForm = this._formBuilder.group({
            name: [''],
            email: [''],
            phone: ['999639773']
        });
    }
}
