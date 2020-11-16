import { DateInputDirective } from 'app/shared/directives/date-input.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('DateInputDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateInputDirective, TestDirectiveComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
  });

  it('should render to DOM', () => {
    component.date = new Date(2020, 9, 24);
    fixture.detectChanges();
    const el: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(el.value).toBe('2020-10-24');
  });

  it('should update date on input', () => {
    fixture.detectChanges();
    const date = new Date(2020, 8, 21);
    const dateStr = '2020-09-21';
    const el: HTMLInputElement = fixture.nativeElement.querySelector('input');
    el.value = dateStr;
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.date.getMilliseconds).toBe(date.getMilliseconds);
  });

});

@Component({
  selector: 'mp-test-directive',
  template: '<input [(mpDateInput)]="date" type="date">',
})
class TestDirectiveComponent {
  date: Date;
}
