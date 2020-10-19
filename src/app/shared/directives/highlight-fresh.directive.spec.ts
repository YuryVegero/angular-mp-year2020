import { HighlightFreshDirective } from './highlight-fresh.directive';
import { CourseItemComponent } from 'app/courses/courses-home/course-list/course-item';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'app/shared/shared.module';
import { courses } from 'app/courses/courses-home/course.mock';

const todayDate = new Date(2020, 9, 23);
const borderGreen = '2px solid green';
const borderBlue = '2px solid blue';

describe('HighlightFreshDirective', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(todayDate);
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, HighlightFreshDirective ],
      imports: [ SharedModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = courses[0];
  });

  it('should have blue border for a future date course', () => {
    component.course.createdAt = new Date(2020, 9, 24);
    fixture.detectChanges();
    const courseEl: HTMLElement = fixture.nativeElement.querySelector('.mp-course');
    expect(courseEl.style.border).toBe(borderBlue);
  });

  describe('should have green border for a course within 2 weeks until today', () => {
    it('1 day before today', () => {
      component.course.createdAt = new Date(2020, 9, 22);
      fixture.detectChanges();
      const courseEl: HTMLElement = fixture.nativeElement.querySelector('.mp-course');
      expect(courseEl.style.border).toBe(borderGreen);
    });

    it('14 days before today', () => {
      component.course.createdAt = new Date(2020, 9, 9);
      fixture.detectChanges();
      const courseEl: HTMLElement = fixture.nativeElement.querySelector('.mp-course');
      expect(courseEl.style.border).toBe(borderGreen);
    });

    it('15 days before today', () => {
      component.course.createdAt = new Date(2020, 9, 8);
      fixture.detectChanges();
      const courseEl: HTMLElement = fixture.nativeElement.querySelector('.mp-course');
      expect(courseEl.style.border).not.toBe(borderGreen);
    });
  });

  it('should not have border', () => {
    component.course.createdAt = new Date(2020, 8, 1);
    fixture.detectChanges();
    const courseEl: HTMLElement = fixture.nativeElement.querySelector('.mp-course');
    expect(courseEl.style.border).toBe('');
  });
});
