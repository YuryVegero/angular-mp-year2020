import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pluck } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CoursesState } from 'app/courses/courses-home/store/courses.reducer';
import { setSearchTerm } from 'app/courses/courses-home/store/courses.actions';
import { selectSearchTerm } from 'app/courses/courses-home/store/courses.selectors';

@Component({
  selector: 'mp-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: [ './search-course.component.scss' ]
})
export class SearchCourseComponent implements OnInit, OnDestroy {
  searchTerm$ = this.store.select(selectSearchTerm);

  private searchTermSubject$ = new Subject<KeyboardEvent>();
  private searchSub: Subscription;

  constructor(private store: Store<CoursesState>) {
  }

  ngOnInit(): void {
    this.searchSub = this.searchTermSubject$.pipe(
      pluck<KeyboardEvent, string>('target', 'value'), // could use map(...),
      map(term => term?.trim()),
      filter(term => term.length > 2 || !term),
      debounceTime(200),
      distinctUntilChanged(),
    ).subscribe((term) => {
      this.store.dispatch(setSearchTerm({ payload: term }));
    });
  }

  onKeyUp(event: KeyboardEvent): void {
    this.searchTermSubject$.next(event);
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }
}
