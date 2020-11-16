import { HighlightFreshDirective } from './highlight-fresh.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'app/shared';
import { Component } from '@angular/core';

const todayDate = new Date(2020, 9, 23);
const newClassName = 'mp-highlight--new';
const futureClassName = 'mp-highlight--future';

describe('HighlightFreshDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(todayDate);
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlightFreshDirective, TestDirectiveComponent ],
      imports: [ SharedModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    component.date = new Date();
  });

  it(`should add the "${futureClassName}" css class for a future date`, () => {
    component.date = new Date(2020, 9, 24);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(el.classList).toContain(futureClassName);
  });

  describe(`should add the "${newClassName}" class if date is within 2 weeks until today`, () => {
    it('1 day before today', () => {
      component.date = new Date(2020, 9, 22);
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('div');
      expect(el.classList).toContain(newClassName);
    });

    it('14 days before today', () => {
      component.date = new Date(2020, 9, 9);
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('div');
      expect(el.classList).toContain(newClassName);
    });

    it('15 days before today', () => {
      component.date = new Date(2020, 9, 8);
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('div');
      expect(el.classList).not.toContain(newClassName);
    });
  });

  it('should not have border', () => {
    component.date = new Date(2020, 8, 1);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(el.style.border).toBe('');
  });
});

@Component({
  selector: 'mp-test-directive',
  template: '<div [mpHighlightFresh]="date"></div>',
})
class TestDirectiveComponent {
  date: Date;
}
