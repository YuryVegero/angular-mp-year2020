import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pluck } from 'rxjs/operators';
import { CourseSearchTermService } from 'app/courses/course-search-term.service';

@Component({
  selector: 'mp-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: [ './search-course.component.scss' ]
})
export class SearchCourseComponent implements OnInit, OnDestroy {
  searchTerm: string;
  private searchTerm$ = new Subject<KeyboardEvent>();
  private searchSub: Subscription;

  constructor(private courseSearchService: CourseSearchTermService) {
  }

  ngOnInit(): void {
    this.searchSub = this.searchTerm$.pipe(
      pluck<KeyboardEvent, string>('target', 'value'), // could use map(...),
      map(term => term?.trim()),
      filter(term => term.length > 2 || !term),
      debounceTime(200),
      distinctUntilChanged(),
    ).subscribe((term) => {
      this.courseSearchService.changeSearch(term);
    });
  }

  onKeyUp(event: KeyboardEvent): void {
    this.searchTerm$.next(event);
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }
}
