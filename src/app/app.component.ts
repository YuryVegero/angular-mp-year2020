import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth';
import { LoadingService } from 'app/core/services/loading.service';
import { iif, Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'mp-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
  ) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
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
