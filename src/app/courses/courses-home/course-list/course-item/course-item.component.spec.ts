import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { courses } from 'app/courses/courses-home/course.mock';
import { By } from '@angular/platform-browser';
import { Course } from 'app/courses/course.model';
import { SharedModule } from 'app/shared/shared.module';
import { DatePipe } from '@angular/common';
import { click } from 'tests/unit';

describe('CourseItemComponent class only', () => {
  let component: CourseItemComponent;

  beforeEach(() => {
    component = new CourseItemComponent();
    component.course = courses[0];
  });

  it('should emit the courseEdit event when calling the onEditClick fn', () => {
    spyOn(component.courseEdit, 'emit');
    component.onEditClick();
    expect(component.courseEdit.emit).toHaveBeenCalledWith(component.course);
  });

  it('should emit the courseDelete event when calling the onDeleteClick fn', () => {
    spyOn(component.courseDelete, 'emit');
    component.onDeleteClick();
    expect(component.courseDelete.emit).toHaveBeenCalledWith(component.course);
  });
});

describe('CourseItemComponent as component', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  let expectedCourse: Course;
  let courseDebug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseItemComponent],
      imports: [SharedModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    courseDebug = fixture.debugElement.query(By.css('.mp-course'));

    expectedCourse = courses[0];
    component.course = expectedCourse;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course title', () => {
    const expected = expectedCourse.title;
    const element = courseDebug.query(By.css('.mp-course__title')).nativeElement;
    expect(element.textContent).toContain(expected);
  });

  it('should display course duration', () => {
    const expected = `${expectedCourse.duration} mins`;
    const element = courseDebug.query(By.css('.mp-course__duration')).nativeElement;
    expect(element.textContent).toContain(expected);
  });

  it('should display course description', () => {
    const expected = expectedCourse.description;
    const element = courseDebug.query(By.css('.mp-course__description')).nativeElement;
    expect(element.textContent).toContain(expected);
  });

  it('should display course created-at', () => {
    const expected = new DatePipe('en-US').transform(component.course.createdAt, 'd MMM, y');
    const element = courseDebug.query(By.css('.mp-course__created-at')).nativeElement;
    expect(element.textContent).toContain(expected);
  });

  it('should call onEditClick fn on clicked event on the Edit button', () => {
    spyOn(component, 'onEditClick');

    const buttonDebug = courseDebug.query(By.css('mp-button'));
    click(buttonDebug);

    expect(component.onEditClick).toHaveBeenCalled();
  });

  it('should call onDeleteClick fn on click event on the Delete button', () => {
    spyOn(component, 'onDeleteClick');

    const buttonDebug = courseDebug.queryAll(By.css('mp-button'))[1];
    click(buttonDebug);

    expect(component.onDeleteClick).toHaveBeenCalled();
  });
});

describe('CourseItemComponent when inside a test host', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let courseDebug: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed
      .configureTestingModule({ declarations: [CourseItemComponent, TestHostComponent] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    courseDebug = fixture.debugElement.query(By.css('.mp-course'));
    fixture.detectChanges();
  });

  it('should display course title', () => {
    const titleElement = courseDebug.query(By.css('.mp-course__title')).nativeElement;
    const expectedTitle = testHost.course.title;
    expect(titleElement.textContent).toContain(expectedTitle);
  });

  it('should raise courseEdit event', () => {
    spyOn(testHost, 'onCourseEdit');

    const buttonDebug = courseDebug.query(By.css('mp-button'));
    click(buttonDebug);

    expect(testHost.onCourseEdit).toHaveBeenCalledWith(testHost.course);
  });

  it('should raise courseDelete event', () => {
    spyOn(testHost, 'onCourseDelete');

    const buttonDebug = courseDebug.queryAll(By.css('mp-button'))[1];
    click(buttonDebug);

    expect(testHost.onCourseDelete).toHaveBeenCalledWith(testHost.course);
  });
});

@Component({
  template: `
      <mp-course-item
              [course]="course"
              (courseDelete)="onCourseDelete($event)"
              (courseEdit)="onCourseEdit($event)"
      >
      </mp-course-item>
  `
})
class TestHostComponent {
  course: Course = courses[0];

  onCourseDelete(deletedCourse: Course): void {
  }

  onCourseEdit(editedCourse: Course): void {
  }
}
