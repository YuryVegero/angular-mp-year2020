import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { courses } from 'app/courses/courses-home/course.mock';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('CourseListComponent class only', () => {
  let component: CourseListComponent;
  const expectedCourse = courses[0];

  beforeEach(() => {
    component = new CourseListComponent();
    component.courses = [ ...courses ];
  });

  it('should emit the courseEdit event when calling the onCourseEdit fn', () => {
    spyOn(component.courseEdit, 'emit');
    component.onCourseEdit(expectedCourse);
    expect(component.courseEdit.emit).toHaveBeenCalledWith(expectedCourse);
  });

  it('should emit the courseDelete event when calling the onCourseDelete fn', () => {
    spyOn(component.courseDelete, 'emit');
    component.onCourseDelete(expectedCourse);
    expect(component.courseDelete.emit).toHaveBeenCalledWith(expectedCourse);
  });
});

describe('CourseListComponent as component', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let courseListDebug: DebugElement;
  const expectedCourse = courses[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    component.courses = [ ...courses ];
    courseListDebug = fixture.debugElement.query(By.css('.mp-course-list'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render courses', () => {
    const courseItemsList = courseListDebug.queryAll(By.css('mp-course-item'));
    expect(courseItemsList).toBeDefined();
    expect(courseItemsList.length).toBe(component.courses.length);
  });

  it('should call onCourseEdit fn on courseEdit event', () => {
    spyOn(component, 'onCourseEdit');

    const buttonDebug = courseListDebug.query(By.css('mp-course-item'));
    buttonDebug.triggerEventHandler('courseEdit', expectedCourse);

    expect(component.onCourseEdit).toHaveBeenCalledWith(expectedCourse);
  });

  it('should call onCourseDelete fn on courseDelete event', () => {
    spyOn(component, 'onCourseDelete');

    const buttonDebug = courseListDebug.query(By.css('mp-course-item'));
    buttonDebug.triggerEventHandler('courseDelete', expectedCourse);

    expect(component.onCourseDelete).toHaveBeenCalledWith(expectedCourse);
  });
});
