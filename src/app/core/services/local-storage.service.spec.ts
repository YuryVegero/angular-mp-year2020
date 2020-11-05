import { LocalStorageService } from './local-storage.service';

describe('AuthService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    service = new LocalStorageService();
  });

  it('#get should call localStorage.getItem if localStorage supported', () => {
    spyOnProperty(service, 'isLocalStorageSupported').and.returnValue(true);
    spyOn(localStorage, 'getItem').and.returnValue('{}');
    service.get('key');
    expect(localStorage.getItem).toHaveBeenCalledWith('key');
  });

  it('#get should not call localStorage.getItem if localStorage is not supported', () => {
    spyOnProperty(service, 'isLocalStorageSupported').and.returnValue(false);
    spyOn(localStorage, 'getItem');
    service.get('key');
    expect(localStorage.getItem).not.toHaveBeenCalled();
  });

  it('#set should call localStorage.setItem if localStorage supported', () => {
    spyOnProperty(service, 'isLocalStorageSupported').and.returnValue(true);
    spyOn(localStorage, 'setItem');
    const result = service.set('key', {});
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(result).toBeTrue();
  });

  it('#set should not call localStorage.setItem if localStorage is not supported', () => {
    spyOnProperty(service, 'isLocalStorageSupported').and.returnValue(false);
    spyOn(localStorage, 'setItem');
    const result = service.set('key', {});
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(result).toBeFalse();
  });

  it('#remove should call localStorage.removeItem if localStorage supported', () => {
    spyOnProperty(service, 'isLocalStorageSupported').and.returnValue(true);
    spyOn(localStorage, 'removeItem');
    const result = service.remove('key');
    expect(localStorage.removeItem).toHaveBeenCalled();
    expect(result).toBeTrue();
  });

  it('#remove should not call localStorage.removeItem if localStorage is not supported', () => {
    spyOnProperty(service, 'isLocalStorageSupported').and.returnValue(false);
    spyOn(localStorage, 'removeItem');
    const result = service.remove('key');
    expect(localStorage.removeItem).not.toHaveBeenCalled();
    expect(result).toBeFalse();
  });
});
