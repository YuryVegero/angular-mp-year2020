import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { click } from 'tests/unit';
import { DebugElement } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router';

import { userMock } from 'tests/unit/mocks/user.mock';
import { of, throwError } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';

describe('LoginComponent', () => {
/* let httpTestingController: HttpTestingController;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let componentDebug: DebugElement;
  let authService: AuthService;
  let routerService: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule ],
      providers: [
        AuthService,
        provideMockStore(),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.credentials = {
      login: 'email',
      password: 'password'
    };
    componentDebug = fixture.debugElement;

    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    routerService = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit fn on Login button click', () => {
    spyOn(component, 'onSubmit');

    const loginBtnDebug = componentDebug.query(By.css('button'));
    click(loginBtnDebug);

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('#onSubmit: should call login', () => {
    spyOn(authService, 'login').and.returnValue(of());
    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith({ login: 'email', password: 'password' });
  });

  it('#onSubmit: should navigate to "/courses" if logged in without errors', () => {
    spyOn(authService, 'login').and.returnValue(of(userMock));
    spyOn(routerService, 'navigateByUrl');
    component.onSubmit();
    expect(routerService.navigateByUrl).toHaveBeenCalledWith('/courses');
  });


  it('#onSubmit: should set error if there is login error', () => {
    spyOn(authService, 'login').and.returnValue(throwError(''));
    component.onSubmit();
    expect(component.error).toBe('Wrong email or password');
  });*/
});
