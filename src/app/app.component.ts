import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'app/core/services/loading.service';
import { iif, Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/app.reducer';
import { autoLogin } from 'app/auth/store/auth.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'mp-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private loadingService: LoadingService,
    private store: Store<AppState>,
    private translateService: TranslateService,
  ) {
    translateService.addLangs(['en', 'ru']);
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
    this.isLoading$ = this.loadingService.isLoading$
      .pipe(
        switchMap((loading) =>
          iif(() => loading,
            of(loading).pipe(delay(300)),
            of(loading),
          ),
        ),
      );
  }
}
