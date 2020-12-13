import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'app/auth/token.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { userMock } from 'tests/unit/mocks/user.mock';
import { User } from 'app/auth/user.model';
import { of } from 'rxjs';

describe('AuthService', () => {
  /*let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let routerServiceSpy: jasmine.SpyObj<Router>;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    const fakeRouterService = jasmine.createSpyObj('Router', [ 'navigateByUrl' ]);
    const fakeTokenService = jasmine.createSpyObj('TokenService', [ 'saveToken', 'getToken', 'clearToken' ]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: fakeRouterService },
        { provide: TokenService, useValue: fakeTokenService },
      ],
      imports: [ HttpClientTestingModule ],
    });

    authService = TestBed.inject(AuthService);
    routerServiceSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('#login', () => {
    it('should send POST req to proper endpoint', () => {
      spyOn<any>(authService, 'fetchUser').and.returnValue(of(userMock));
      authService.login({ login: 'a', password: 'a' })
        .subscribe((user) => {
          expect(user).toEqual(userMock);
        });

      const req = httpTestingController.expectOne('/auth/login');
      expect(req.request.method).toBe('POST');

      req.flush(userMock);
    });

    it('should call tokenService.saveToken and fetchUser if request is successful', () => {
      const fetchUserSpy = spyOn<any>(authService, 'fetchUser').and.returnValue(of());

      authService.login({ login: 'login', password: 'password' })
        .subscribe(() => {
          expect(tokenServiceSpy.saveToken).toHaveBeenCalled();
          expect(fetchUserSpy).toHaveBeenCalled();
        });

      const req = httpTestingController.expectOne('/auth/login');
      req.flush(userMock);
    });

    afterEach(() => {
      httpTestingController.verify();
    });
  });


  describe('#logout', () => {
    it('should call clearAuth fn and navigate to "/login"', () => {
      const clearAuthSpy = spyOn<any>(authService, 'clearAuth');

      authService.logout();
      expect(clearAuthSpy).toHaveBeenCalledWith();
      expect(routerServiceSpy.navigateByUrl).toHaveBeenCalledWith('/login');
    });

    it('private clearAuth should call tokenServiceSpy.clearToken, update user$ and isAuthenticated$', () => {
      authService.isAuthenticated$.subscribe((isAuth) => {
        expect(isAuth).toBeFalsy();
      });
      authService.user$.subscribe((user) => {
        expect(user).toEqual({} as User);
      });
      authService.logout();
      expect(tokenServiceSpy.clearToken).toHaveBeenCalled();
    });
  });

  describe('#autoLogin', () => {
    it('should call tokenService.getToken', () => {
      authService.autoLogin();
      expect(tokenServiceSpy.getToken).toHaveBeenCalled();
    });

    it('should call fetchUser and setAuth if token exists', () => {
      tokenServiceSpy.getToken.and.returnValue('token');
      const fetchUserSpy = spyOn<any>(authService, 'fetchUser').and.returnValue(of());
      authService.autoLogin();
      expect(fetchUserSpy).toHaveBeenCalledWith({ token: 'token' });
    });
  });*/
});

