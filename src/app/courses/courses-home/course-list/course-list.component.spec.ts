import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { courses } from 'app/courses/course.mock';
import { SharedModule } from 'app/shared';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, SimpleChange } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { CourseService } from 'app/courses/course.service';
import { Router } from '@angular/router';
import { Course } from 'app/courses/course.model';
import { click } from 'tests/unit';
import Spy = jasmine.Spy;

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

    spyGetAll = spyOn(courseService, 'getAll').and.returnValue(courses);
  });

  describe('Hooks', () => {
    it('onChanges: should call #filterCourses after first change', () => {
      const filterCoursesSpy = spyOn<any>(component, 'filterCourses');
      const searchTermChange = new SimpleChange(null, null, true);

      component.ngOnChanges({ searchTerm: searchTermChange });
      expect(filterCoursesSpy).not.toHaveBeenCalled();

      searchTermChange.firstChange = false;
      component.ngOnChanges({ searchTerm: searchTermChange });
      expect(filterCoursesSpy).toHaveBeenCalled();
    });

    describe('onInit', () => {
      it('should set filteredCourses', () => {
        expect(component.filteredCourses.length).toBe(0);
        fixture.detectChanges();

        expect(courseService.getAll).toHaveBeenCalled();
        expect(component.filteredCourses.length).not.toBe(0);
      });

      it('should call #filterCourses', () => {
        const filterCoursesSpy = spyOn<any>(component, 'filterCourses');
        fixture.detectChanges();

        expect(filterCoursesSpy).toHaveBeenCalled();
      });

      it('should subscribe to $courseService.coursesChanged', () => {
        const subscribeSpy = spyOn(courseService.coursesChanged, 'subscribe');
        fixture.detectChanges();

        expect(subscribeSpy).toHaveBeenCalled();
      });

      it('should call #filterCourses on $courseService.coursesChanged.emit', () => {
        spyGetAll.and.returnValue([]);
        const filterCoursesSpy = spyOn<any>(component, 'filterCourses');
        component.ngOnInit();

        courseService.coursesChanged.subscribe((newCourses: Course[]) => {
          expect(newCourses).toEqual(courses);
        });

        courseService.coursesChanged.emit(courses);
        expect(filterCoursesSpy).toHaveBeenCalledTimes(2);
      });
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
        const serviceDeleteSpy = spyOn(courseService, 'delete');
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

    it('#onCourseEdit: should navigate to "courses/:id/edit"', () => {
      spyOn(routerService, 'navigateByUrl');
      component.onCourseEdit(courses[0]);
      expect(routerService.navigateByUrl).toHaveBeenCalledWith(`courses/${courses[0].id}/edit`);
    });

    describe('#hasCourses ', () => {
      it('should return true if there are filteredCourses', () => {
        component.filteredCourses = courses;
        expect(component.hasCourses()).toBeTrue();
      });
      it('should return false if there are no filteredCourses', () => {
        component.filteredCourses = [];
        expect(component.hasCourses()).toBeFalse();
      });
    });

    it('#onLoadMoreClick: should log', () => {
      spyOn(console, 'log');
      component.onLoadMoreClick();
      expect(console.log).toHaveBeenCalled();
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

    it('$courseEdit: should call #onCourseEdit', () => {
      fixture.detectChanges();
      spyOn(component, 'onCourseEdit');

      const courseItemDebug = componentDebug.query(By.css('mp-course-item'));
      courseItemDebug.triggerEventHandler('courseEdit', expectedCourse);

      expect(component.onCourseEdit).toHaveBeenCalledWith(expectedCourse);
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

    it('should render "No data" message if #hasCourses return false', () => {
      spyOn(component, 'hasCourses').and.returnValue(false);
      fixture.detectChanges();

      const child = componentDebug.query(By.css('mp-course-list'));
      expect(child).toBeNull();
      expect(componentDebug.nativeElement.innerHTML).toContain('No data. Feel free to add a new course.');
    });
  });

});
