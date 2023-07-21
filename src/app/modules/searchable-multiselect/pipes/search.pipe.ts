import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(array: any[], prop: string, keyword: string): any[] {
        if (!keyword?.length) {
            array.forEach((item): void => {
                item.hidden = false;
            });
            return array;
        }

        array.forEach((item): void => {
            if (item[prop]?.toLowerCase()?.includes(keyword?.toLowerCase())) {
                item.hidden = false;
                return;
            }
            item.hidden = true;
        });
        return array;
    }
}
