import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchCourseComponent } from './search-course.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CourseSearchTermService } from 'app/courses/course-search-term.service';

describe('SearchCourseComponent', () => {
  let component: SearchCourseComponent;
  let fixture: ComponentFixture<SearchCourseComponent>;
  let courseSearchService: CourseSearchTermService;
  let searchCourseDebug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCourseComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ FormsModule ],
      providers: [ CourseSearchTermService ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    courseSearchService = TestBed.inject(CourseSearchTermService);
    fixture = TestBed.createComponent(SearchCourseComponent);
    component = fixture.componentInstance;
    searchCourseDebug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call courseSearchService.changeSearch fn on key up', fakeAsync(() => {
    spyOn(courseSearchService, 'changeSearch');
    const inputDebug = searchCourseDebug.query(By.css('input'));
    const event = {
      target: {
        value: 'search',
      }
    };
    inputDebug.triggerEventHandler('keyup', event);
    tick(300);
    expect(courseSearchService.changeSearch).toHaveBeenCalledWith('search');
  }));
});
