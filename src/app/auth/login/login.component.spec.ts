import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { click } from 'tests/unit';
import { DebugElement } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'app/auth/user.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let componentDebug: DebugElement;
  let authService: AuthService;
  let routerService: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ RouterTestingModule, FormsModule ],
      providers: [ AuthService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.credentials = {
      email: 'email',
      password: 'password'
    };
    componentDebug = fixture.debugElement;

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

  it('should call login and navigate to "/courses"', () => {
    spyOn(authService, 'login').and.returnValue(new User('1', 'email'));
    spyOn(routerService, 'navigateByUrl');

    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith({ email: 'email', password: 'password' });
    expect(routerService.navigateByUrl).toHaveBeenCalledWith('/courses');
  });
});
