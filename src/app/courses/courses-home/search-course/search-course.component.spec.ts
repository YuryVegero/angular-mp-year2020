import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchCourseComponent } from './search-course.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { click } from 'tests/unit';

describe('SearchCourseComponent', () => {
  let component: SearchCourseComponent;
  let fixture: ComponentFixture<SearchCourseComponent>;
  let searchCourseDebug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCourseComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ FormsModule ],
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
    const buttonDebug = searchCourseDebug.query(By.css('button.btn-success'));
    click(buttonDebug);
    expect(component.onSearchClick).toHaveBeenCalled();
  });

  it('should emit searchTerm on onSearchClick call', () => {
    component.courseSearch.subscribe((term: string) => {
      expect(component.searchTerm).toBe(term);
    });
    component.onSearchClick();
  });
});
