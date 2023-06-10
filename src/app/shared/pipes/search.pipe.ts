import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
   name: 'search',
   pure: false
})
export class SearchPipe implements PipeTransform {
   transform(value: any[], search: string, key: string): any[] {
      if (!search) {
         return value
      }
      return value.filter(item => item[key]?.toLowerCase()?.includes(search?.toLowerCase()))
   }
}
