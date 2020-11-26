import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { HeaderComponent } from './header.component';
import { AuthService } from 'app/auth';
import { click } from 'tests/unit';

const eventSubject = new ReplaySubject<RouterEvent>(1);
const routerMock = {
  navigate: jasmine.createSpy('navigate'),
  events: eventSubject.asObservable(),
  url: '/courses'
};

describe('HeaderComponent', () => {
  /*let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let componentDebug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: routerMock,
        }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    componentDebug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should display auth block if not on login page', () => {
    eventSubject.next(new NavigationEnd(1, '/courses', 'redirect'));
    expect(component.authBlockVisible).toBeTrue();

    const authBlockDebug = componentDebug.query(By.css('.mp-header__auth-block'));
    expect(authBlockDebug).toBeDefined();
  });

  it('should hide auth block if on login page', () => {
    eventSubject.next(new NavigationEnd(1, '/login', 'redirect'));

    fixture.detectChanges();

    const authBlockDebug = componentDebug.query(By.css('.mp-header__auth-block'));
    expect(authBlockDebug).toBeNull();
    expect(component.authBlockVisible).toBeFalse();
  });

  it('should not call "checkAuthBlockVisible" fn for non NavigationEnd events', () => {
    eventSubject.next(new NavigationStart(2, '/login'));
    const checkVisibleSpy = spyOn<any>(component, 'checkAuthBlockVisible');

    fixture.detectChanges();

    expect(checkVisibleSpy).not.toHaveBeenCalled();
  });

  it('should display Login and hide Logout button if user is not authenticated', () => {
    component.authBlockVisible = true;
    component.authenticated = false;
    fixture.detectChanges();

    const loginBtnDebug = componentDebug.query(By.css('.mp-header__login-btn'));
    expect(loginBtnDebug).toBeDefined();

    const logoutBtnDebug = componentDebug.query(By.css('.mp-header__logout-btn'));
    expect(logoutBtnDebug).toBeNull();
  });

  it('should display Logout and hide Login button if user is authenticated', () => {
    component.authBlockVisible = true;
    component.authenticated = true;
    fixture.detectChanges();

    const loginBtnDebug = componentDebug.query(By.css('.mp-header__login-btn'));
    expect(loginBtnDebug).toBeNull();

    const logoutBtnDebug = componentDebug.query(By.css('.mp-header__logout-btn'));
    expect(logoutBtnDebug).toBeDefined();
  });

  it('should call logout fn on Logout link click', () => {
    component.authBlockVisible = true;
    component.authenticated = true;
    fixture.detectChanges();

    spyOn(component, 'logout');
    const logoutBtnDebug = componentDebug.query(By.css('.mp-header__logout-btn'));
    click(logoutBtnDebug);
    expect(component.logout).toHaveBeenCalled();
  });

  it('should call authService.logout on logout() call', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'logout');

    component.logout();
    const logoutBtnDebug = componentDebug.query(By.css('.mp-header__logout-btn'));
    expect(authService.logout).toHaveBeenCalled();
  });
  */
});
