import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { courses } from 'tests/unit/mocks/course.mock';
import { SharedModule } from 'app/shared';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { CourseService } from 'app/courses/course.service';
import { Router } from '@angular/router';
import { click } from 'tests/unit';
import { of } from 'rxjs';
import Spy = jasmine.Spy;
import { provideMockStore } from '@ngrx/store/testing';

describe('CourseListComponent as component', () => {
/*
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
      providers: [ CourseService, provideMockStore() ],
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

      it('should not call courseService.delete fn if not confirmed', () => {
        confirmSpy.and.returnValue(false);
        const serviceDeleteSpy = spyOn(courseService, 'delete');
        component.onCourseDelete(courses[0]);
        expect(serviceDeleteSpy).not.toHaveBeenCalled();
      });
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
*/

});
