import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { courses } from 'tests/unit/mocks/course.mock';
import { SharedModule } from 'app/shared';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, SimpleChange } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { CourseService } from 'app/courses/course.service';
import { Router } from '@angular/router';
import { Course } from 'app/courses/course.model';
import { click } from 'tests/unit';
import Spy = jasmine.Spy;
import { Observable, of } from 'rxjs';

describe('CourseListComponent as component', () => {
  let fixture: ComponentFixture<CourseListComponent>;
  let component: CourseListComponent;
  let componentDebug: DebugElement;
  let courseService: CourseService;
  let routerService: Router;
  let spyGetAll: Spy;
  const expectedCourse = courses[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ SharedModule, RouterTestingModule ],
      providers: [ CourseService ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    courseService = TestBed.inject(CourseService);
    routerService = TestBed.inject(Router);
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    componentDebug = fixture.debugElement;

    spyGetAll = spyOn(courseService, 'getAll').and.returnValue(of(courses));
  });

  describe('Hooks', () => {
    it('onChanges: should call #filterCourses after first change', () => {
      const fetchCoursesSpy = spyOn<any>(component, 'fetchCourses');
      const searchTermChange = new SimpleChange(null, null, true);

      component.ngOnChanges({ searchTerm: searchTermChange });
      expect(fetchCoursesSpy).not.toHaveBeenCalled();

      searchTermChange.firstChange = false;
      component.ngOnChanges({ searchTerm: searchTermChange });
      expect(fetchCoursesSpy).toHaveBeenCalled();
    });

  });

  describe('Methods', () => {

    describe('#onCourseDelete', () => {
      let confirmSpy;

      beforeEach(() => {
        confirmSpy = spyOn(window, 'confirm');
      });

      it('should ask delete confirmation when called', () => {
        component.onCourseDelete(courses[0]);
        expect(confirmSpy).toHaveBeenCalled();
      });

      it('should call courseService.delete fn if confirmed', () => {
        confirmSpy.and.returnValue(true);
        const serviceDeleteSpy = spyOn(courseService, 'delete').and.returnValue(of());
        component.onCourseDelete(courses[0]);
        expect(serviceDeleteSpy).toHaveBeenCalledWith(courses[0].id);
      });

      it('should not call courseService.delete fn if not confirmed', () => {
        confirmSpy.and.returnValue(false);
        const serviceDeleteSpy = spyOn(courseService, 'delete');
        component.onCourseDelete(courses[0]);
        expect(serviceDeleteSpy).not.toHaveBeenCalled();
      });
    });

    it('#onLoadMoreClick: should call fetchCourses, set courses', () => {
      const fetchCoursesSpy = spyOn<any>(component, 'fetchCourses').and.returnValue([]);
      expect(component.courses$).toBeUndefined();
      component.onLoadMoreClick();
      expect(fetchCoursesSpy).toHaveBeenCalled();
      expect(component.courses$).toBeDefined();
    });
  });

  describe('Events', () => {
    it('$courseDelete: should call #onCourseDelete', () => {
      fixture.detectChanges();
      spyOn(component, 'onCourseDelete');

      const courseItemDebug = componentDebug.query(By.css('mp-course-item'));
      courseItemDebug.triggerEventHandler('courseDelete', expectedCourse);

      expect(component.onCourseDelete).toHaveBeenCalledWith(expectedCourse);
    });

    it('$click: should call onLoadMoreClick', () => {
      fixture.detectChanges();
      spyOn(component, 'onLoadMoreClick');
      const loadMoreDebug = componentDebug.query(By.css('.mp-course-list__load-more > a'));
      click(loadMoreDebug);
      expect(component.onLoadMoreClick).toHaveBeenCalled();
    });
  });

  describe('Rendering', () => {
    it('should render mp-course-list if #hasCourses returns true', () => {
      fixture.detectChanges();
      const child = componentDebug.query(By.css('mp-course-list'));
      expect(child).toBeDefined();
    });
  });

});
