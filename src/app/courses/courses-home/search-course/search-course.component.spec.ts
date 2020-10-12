import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCourseComponent } from './search-course.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { click } from 'tests/unit';

describe('SearchCourseComponent', () => {
  let component: SearchCourseComponent;
  let fixture: ComponentFixture<SearchCourseComponent>;
  let searchCourseDebug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCourseComponent);
    component = fixture.componentInstance;
    searchCourseDebug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSearchClick fn on click', () => {
    spyOn(component, 'onSearchClick');
    const buttonDebug = searchCourseDebug.query(By.css('mp-button'));
    click(buttonDebug);
    expect(component.onSearchClick).toHaveBeenCalled();
  });

  it('should log on onSearchClick call', () => {
    spyOn(console, 'log');
    component.onSearchClick();
    expect(console.log).toHaveBeenCalled();
  });
});
