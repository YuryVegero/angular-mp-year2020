import { HighlightFreshDirective } from './highlight-fresh.directive';
import { CourseItemComponent, courses } from 'app/courses';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'app/shared';

const todayDate = new Date(2020, 9, 23);
const newClassName = 'mp-highlight--new';
const futureClassName = 'mp-highlight--future';

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

  it(`should add the "${futureClassName}" css class for a future date course`, () => {
    component.course.createdAt = new Date(2020, 9, 24);
    fixture.detectChanges();
    const courseEl: HTMLElement = fixture.nativeElement.querySelector('.mp-course');
    expect(courseEl.classList).toContain(futureClassName);
  });

  describe(`should add the "${newClassName}" for a course within 2 weeks until today`, () => {
    it('1 day before today', () => {
      component.course.createdAt = new Date(2020, 9, 22);
      fixture.detectChanges();
      const courseEl: HTMLElement = fixture.nativeElement.querySelector('.mp-course');
      expect(courseEl.classList).toContain(newClassName);
    });

    it('14 days before today', () => {
      component.course.createdAt = new Date(2020, 9, 9);
      fixture.detectChanges();
      const courseEl: HTMLElement = fixture.nativeElement.querySelector('.mp-course');
      expect(courseEl.classList).toContain(newClassName);
    });

    it('15 days before today', () => {
      component.course.createdAt = new Date(2020, 9, 8);
      fixture.detectChanges();
      const courseEl: HTMLElement = fixture.nativeElement.querySelector('.mp-course');
      expect(courseEl.classList).not.toContain(newClassName);
    });
  });

  it('should not have border', () => {
    component.course.createdAt = new Date(2020, 8, 1);
    fixture.detectChanges();
    const courseEl: HTMLElement = fixture.nativeElement.querySelector('.mp-course');
    expect(courseEl.style.border).toBe('');
  });
});
