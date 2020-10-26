import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesHomeComponent } from './courses-home.component';
import { courses } from 'app/courses/courses-home/course.mock';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

describe('CoursesComponent', () => {
  let component: CoursesHomeComponent;
  let fixture: ComponentFixture<CoursesHomeComponent>;
  let coursesHomeDebug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesHomeComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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
    spyOn(component, 'getCourses').and.returnValue(courses);
    expect(component.courses.length).toBe(0);
    fixture.detectChanges();
    expect(component.courses.length).not.toBe(0);
  });

  it('should call getCourses on ngInit', () => {
    spyOn(component, 'getCourses');
    fixture.detectChanges();
    expect(component.getCourses).toHaveBeenCalled();
  });

  it('should log on onCourseDelete fn call', () => {
    spyOn(console, 'log');
    component.onCourseDelete(courses[0]);
    expect(console.log).toHaveBeenCalled();
  });

  it('should call onCourseDelete fn on courseDelete event', () => {
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

  it('should call onCourseEdit fn on courseDelete event', () => {
    spyOn(component, 'onCourseEdit');
    const courseListDebug = coursesHomeDebug.query(By.css('mp-course-list'));
    courseListDebug.triggerEventHandler('courseEdit', courses[0]);
    expect(component.onCourseEdit).toHaveBeenCalledWith(courses[0]);
  });

  it('should render mp-course-list', () => {
    const child = coursesHomeDebug.query(By.css('mp-course-list'));
    expect(child).toBeDefined();
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
