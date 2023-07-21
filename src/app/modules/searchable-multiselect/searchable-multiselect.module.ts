import {NgModule} from '@angular/core';
import {SearchableMultiselectComponent} from "./searchable-multiselect/searchable-multiselect.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {TranslocoModule} from "@ngneat/transloco";
import {SearchPipe} from "./pipes/search.pipe";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [SearchableMultiselectComponent, SearchPipe],
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        CommonModule,
        TranslocoModule,
        MatButtonModule,
        MatIconModule,
        FormsModule
    ],
    exports: [SearchableMultiselectComponent]
})

export class SearchableMultiselectModule {
}
