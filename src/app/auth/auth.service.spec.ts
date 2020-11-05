import { AuthService } from './auth.service';
import { LocalStorageService } from 'app/core/services';
import { User } from 'app/auth/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let routerServiceSpy;
  let storageServiceSpy;

  beforeEach(() => {
    routerServiceSpy = jasmine.createSpyObj('Router', [ 'navigateByUrl' ]);
    storageServiceSpy = jasmine.createSpyObj('LocalStorageService', [ 'set', 'get', 'remove' ]);
    service = new AuthService(storageServiceSpy, routerServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should call saveUser fn and return a new user', () => {
      const saveUserSpy = spyOn<any>(service, 'saveUser').and.returnValue({});
      const loggedInUser = service.login({ email: '', password: '' });
      expect(saveUserSpy).toHaveBeenCalled();
      expect(loggedInUser).toBeDefined();
    });

    it('private saveUser should set the user to storage and emit the user', () => {
      const email = 'email';
      const password = 'password';

      service.userChanged.subscribe((newUser) => {
        expect(newUser).toEqual(jasmine.objectContaining({ email }));
      });

      service.login({ email, password });
      expect(storageServiceSpy.set).toHaveBeenCalled();
    });
  });

  describe('#logout', () => {
    it('should call saveUser fn and navigate to "/login"', () => {
      const saveUserSpy = spyOn<any>(service, 'saveUser');

      service.logout();
      expect(saveUserSpy).toHaveBeenCalledWith();
      expect(routerServiceSpy.navigateByUrl).toHaveBeenCalledWith('/login');
    });

    it('private saveUser should remove user from storage and emit null', () => {
      service.userChanged.subscribe((newUser) => {
        expect(newUser).toBeNull();
      });

      service.logout();
      expect(storageServiceSpy.remove).toHaveBeenCalled();
    });
  });

  describe('#autoLogin', () => {
    it('should call loadUser fn', () => {
      const loadUserSpy = spyOn<any>(service, 'loadUser');
      service.autoLogin();
      expect(loadUserSpy).toHaveBeenCalled();
    });

    it('should set and emit the loaded user if has accessToken', () => {
      const user = new User('1', 'test@gmail.com', 'token');
      spyOn<any>(service, 'loadUser').and.returnValue(user);

      service.userChanged.subscribe((newUser) => {
        expect(newUser).toEqual(user);
      });
      service.autoLogin();
      expect(service.getCurrentUser()).toEqual(user);
    });

    it('should not set and emit the loaded user if has no accessToken', () => {
      spyOn<any>(service, 'loadUser');
      spyOn(service.userChanged, 'emit');

      service.autoLogin();
      expect(service.getCurrentUser()).toBeUndefined();
      expect(service.userChanged.emit).not.toHaveBeenCalled();
    });
  });

  it('#isAuthenticated should be truthy for existing user, and falsy otherwise', () => {
    service['currentUser'] = new User('1', 'test@gmail.com', 'token');
    expect(service.isAuthenticated()).toBeTrue();

    service['currentUser'] = null;
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('#getCurrentUser should return current user', () => {
    const user = new User('1', 'test@gmail.com', 'token');
    service['currentUser'] = user;
    expect(service.getCurrentUser()).toEqual(user);
  });
});
