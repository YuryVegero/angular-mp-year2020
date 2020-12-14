import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CourseSearchTermService {
  private termChanged = new Subject<string>();
  termChanged$ = this.termChanged.asObservable();

  changeSearch(searchTerm): void {
    this.termChanged.next(searchTerm);
  }
}
