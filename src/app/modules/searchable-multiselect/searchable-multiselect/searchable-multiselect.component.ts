import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

type valueType = number | string | number[] | string[] | null;

@Component({
    selector: 'searchable-multiselect',
    templateUrl: './searchable-multiselect.component.html',
    styleUrls: ['./searchable-multiselect.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SearchableMultiselectComponent {
    @Input() options: Array<any> = [];
    @Input() optionTextKey: string;
    @Input() optionValueKey: string;
    @Input() multiple?: boolean = true;
    @Input() emptyOption?: boolean = false;
    @Input() required?: boolean = false;
    @Input() classes?: string = 'w-full';
    @Input() label?: string = ''
    @Input() searchInputPlaceHolder?: string = 'Қидириш';
    @Input() selectBoxPlaceholder?: string;
    @Input() set defaultValue(value: valueType) {
        this.matSelectValue = value;
    }
    @Output() onSelectionChange: EventEmitter<valueType> = new EventEmitter<valueType>();
    matSelectValue: valueType;

    selectionChange($event: MatSelectChange): void {
        this.onSelectionChange.emit($event.value);
    }
}
