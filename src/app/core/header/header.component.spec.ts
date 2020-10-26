import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let headerDebug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    headerDebug = fixture.debugElement.query(By.css('.mp-header'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include wrapper', () => {
    expect(headerDebug).toBeDefined();
  });

  it('should render title', () => {
    const element = headerDebug.query(By.css('.mp-header__title')).nativeElement;
    expect(element.textContent).toBe(component.title);
  });

  it('should render user-auth', () => {
    expect(headerDebug.query(By.css('mp-user-auth'))).toBeDefined();
  });
});
