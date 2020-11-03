import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
  transform(items: any[], field: string, term: string): any[] {
    if (!items) {
      return [];
    }
    if (!term) {
      return items;
    }

    const searchTerm = term.toLowerCase();
    return items.filter(item => item[field]?.toLowerCase()?.includes(searchTerm));
  }
}
