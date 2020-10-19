import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(items: any[], field: string): any[] {
    if (!items) {
      return [];
    }

    return items.sort((a, b) => {
      if (b[field] < a[field]) {
        return -1;
      }
      if (b[field] > a[field]) {
        return 1;
      }
      return 0;
    });
  }
}
