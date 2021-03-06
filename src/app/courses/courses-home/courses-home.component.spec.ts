import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesHomeComponent } from './courses-home.component';
import { SharedModule } from 'app/shared';

describe('CoursesHomeComponent', () => {
  let component: CoursesHomeComponent;
  let fixture: ComponentFixture<CoursesHomeComponent>;
  let coursesHomeDebug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesHomeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ SharedModule, RouterTestingModule ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesHomeComponent);
    component = fixture.componentInstance;
    coursesHomeDebug = fixture.debugElement.query(By.css('.mp-courses'));
  });

  it('should render mp-breadcrumb', () => {
    const child = coursesHomeDebug.query(By.css('mp-breadcrumb'));
    expect(child).toBeDefined();
  });

  it('should render mp-search-course', () => {
    const child = coursesHomeDebug.query(By.css('mp-search-course'));
    expect(child).toBeDefined();
  });

  it('should render mp-add-course', () => {
    const child = coursesHomeDebug.query(By.css('mp-add-course'));
    expect(child).toBeDefined();
  });
});
