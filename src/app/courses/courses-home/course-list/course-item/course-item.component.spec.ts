import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { courses } from 'app/courses/course.mock';
import { By } from '@angular/platform-browser';
import { Course } from 'app/courses/course.model';
import { DurationPipe, SharedModule } from 'app/shared';
import { DatePipe } from '@angular/common';
import { click } from 'tests/unit';

const expectedCourse = courses[0];

describe('CourseItemComponent class only', () => {
  let component: CourseItemComponent;

  beforeEach(() => {
    component = new CourseItemComponent();
    component.course = courses[0];
  });

  it('should emit the courseDelete event when calling the onDeleteClick fn', () => {
    spyOn(component.courseDelete, 'emit');
    const event = new MouseEvent('dxcontextmenu', { bubbles: true });
    component.onDeleteClick(event);
    expect(component.courseDelete.emit).toHaveBeenCalledWith(component.course);
  });
});

describe('CourseItemComponent as component', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  let courseDebug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseItemComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ SharedModule ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = expectedCourse;
    fixture.detectChanges();
    courseDebug = fixture.debugElement.query(By.css('.mp-course'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course title', () => {
    const expected = expectedCourse.title.toUpperCase();
    const element = courseDebug.query(By.css('.mp-course__title')).nativeElement;
    expect(element.textContent).toContain(expected);
  });

  it('should display course duration', () => {
    const expected = new DurationPipe().transform(component.course.duration);
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

  it('should call onDeleteClick fn on click event on the Delete button', () => {
    spyOn(component, 'onDeleteClick');

    const buttonDebug = courseDebug.query(By.css('button.btn-primary'));
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
      .configureTestingModule({
        declarations: [ CourseItemComponent, TestHostComponent ],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        imports: [ SharedModule ],
      })
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
    const expectedTitle = testHost.course.title.toUpperCase();
    expect(titleElement.textContent).toContain(expectedTitle);
  });

  it('should raise courseDelete event', () => {

    spyOn(testHost, 'onCourseDelete');

    const buttonDebug = courseDebug.query(By.css('button.btn-primary'));
    click(buttonDebug);

    expect(testHost.onCourseDelete).toHaveBeenCalledWith(testHost.course);
  });
});

@Component({
  template: `<mp-course-item [course]="course" (courseDelete)="onCourseDelete($event)"></mp-course-item>`
})
class TestHostComponent {
  course: Course = courses[0];

  onCourseDelete(deletedCourse: Course): void {
  }
}
