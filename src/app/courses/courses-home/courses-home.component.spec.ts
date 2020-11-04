import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesHomeComponent, CourseListComponent, courses } from 'app/courses';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'app/shared';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

describe('CoursesHomeComponent', () => {
  let component: CoursesHomeComponent;
  let fixture: ComponentFixture<CoursesHomeComponent>;
  let coursesHomeDebug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesHomeComponent, CourseListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ SharedModule ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesHomeComponent);
    component = fixture.componentInstance;
    coursesHomeDebug = fixture.debugElement.query(By.css('.mp-courses'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set courses on ngInit', () => {
    const getCoursesSpy = spyOn<any>(component, 'getCourses').and.returnValue(courses);
    expect(component.filteredCourses.length).toBe(0);
    fixture.detectChanges();
    expect(getCoursesSpy).toHaveBeenCalled();
    expect(component.filteredCourses.length).not.toBe(0);
  });

  it('should log on onCourseDelete fn call', () => {
    spyOn(console, 'log');
    component.onCourseDelete(courses[0]);
    expect(console.log).toHaveBeenCalled();
  });

  it('should call onCourseDelete fn on courseDelete event', () => {
    fixture.detectChanges();
    spyOn(component, 'onCourseDelete');
    const courseListDebug = coursesHomeDebug.query(By.css('mp-course-list'));
    courseListDebug.triggerEventHandler('courseDelete', courses[0]);
    expect(component.onCourseDelete).toHaveBeenCalledWith(courses[0]);
  });

  it('should log on onCourseEdit fn call', () => {
    spyOn(console, 'log');
    component.onCourseEdit(courses[0]);
    expect(console.log).toHaveBeenCalled();
  });

  it('should call onCourseEdit fn on courseEdit event', () => {
    fixture.detectChanges();
    spyOn(component, 'onCourseEdit');
    const courseListDebug = coursesHomeDebug.query(By.css('mp-course-list'));
    courseListDebug.triggerEventHandler('courseEdit', courses[0]);
    expect(component.onCourseEdit).toHaveBeenCalledWith(courses[0]);
  });

  it('should filter courses on onCourseSearch fn call', () => {
    fixture.detectChanges();
    const filterCoursesSpy = spyOn<any>(component, 'filterCourses');
    expect(filterCoursesSpy).not.toHaveBeenCalled();

    component.onCourseSearch('abc');
    fixture.detectChanges();
    expect(filterCoursesSpy).toHaveBeenCalled();
  });

  it('should call onCourseSearch fn on courseSearch event', () => {
    fixture.detectChanges();
    spyOn(component, 'onCourseSearch');
    const searchCourseDebug = coursesHomeDebug.query(By.css('mp-search-course'));
    searchCourseDebug.triggerEventHandler('courseSearch', 'term');
    expect(component.onCourseSearch).toHaveBeenCalledWith('term');
  });

  describe('Conditional rendering of mp-course-list', () => {
    it('should render mp-course-list if hasCourses returns true', () => {
      spyOn(component, 'hasCourses').and.returnValue(true);
      fixture.detectChanges();
      const child = coursesHomeDebug.query(By.css('mp-course-list'));
      expect(child).toBeDefined();
    });

    it('should render "No data" message if hasCourses return false', () => {
      spyOn(component, 'hasCourses').and.returnValue(false);
      fixture.detectChanges();

      const child = coursesHomeDebug.query(By.css('mp-course-list'));
      expect(child).toBeNull();
      expect(coursesHomeDebug.nativeElement.innerHTML).toContain('No data. Feel free to add a new course.');
    });
  });

  it('should render mp-breadcrumb', () => {
    const child = coursesHomeDebug.query(By.css('mp-breadcrumb'));
    expect(child).toBeDefined();
  });

  it('should render mp-search-course', () => {
    const child = coursesHomeDebug.query(By.css('mp-search-course'));
    expect(child).toBeDefined();
  });

  it('should render mp-load-more', () => {
    const child = coursesHomeDebug.query(By.css('mp-load-more'));
    expect(child).toBeDefined();
  });

  it('should render mp-add-course', () => {
    const child = coursesHomeDebug.query(By.css('mp-add-course'));
    expect(child).toBeDefined();
  });
});
