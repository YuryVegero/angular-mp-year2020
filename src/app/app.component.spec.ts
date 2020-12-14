import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { AuthService } from 'app/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingService } from 'app/core/services/loading.service';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture;
  let appComponent;
  let loadingService: LoadingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        AuthService,
        LoadingService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    loadingService = TestBed.inject(LoadingService);
  });

  it('should call autoLogin on init', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'autoLogin');
    fixture.detectChanges();
    expect(authService.autoLogin).toHaveBeenCalled();
  });

  it('should show loading indicator', () => {
    appComponent.isLoading = true;
    fixture.detectChanges();

    const indicatorDebug = fixture.debugElement.query(By.css('mp-loading-indicator'));
    expect(indicatorDebug).toBeDefined();
  });

  it('should show loading indicator if LoadingService emits true', () => {
    appComponent.isLoading = false;
    fixture.detectChanges();
    loadingService.setLoading(true);
    const indicatorDebug = fixture.debugElement.query(By.css('mp-loading-indicator'));
    expect(indicatorDebug).toBeDefined();
  });

  it('should not show loading indicator', () => {
    appComponent.isLoading = false;
    fixture.detectChanges();

    const indicatorDebug = fixture.debugElement.query(By.css('mp-loading-indicator'));
    expect(indicatorDebug).toBeNull();
  });

  it('should not show loading indicator if LoadingService emits false', () => {
    appComponent.isLoading = true;
    fixture.detectChanges();
    loadingService.setLoading(false);
    const indicatorDebug = fixture.debugElement.query(By.css('mp-loading-indicator'));
    expect(indicatorDebug).toBeNull();
  });

});
