import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AUTO_LOGIN, CLEAR_AUTH, clearAuth, LOGIN, LOGIN_SUCCESS, loginFail, loginSuccess, LOGOUT, setUser } from './auth.actions';
import { AuthService } from 'app/auth/auth.service';
import { TokenService } from 'app/auth/token.service';

const handleLoginError = (errorRes: any) => {
  // process error response here
  const errorMessage = errorRes.error ?? 'An unknown error occurred!';
  return of(loginFail({ payload: errorMessage }));
};

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGIN),
      mergeMap(({ payload }) => this.authService.login(payload)
        .pipe(
          tap(({ token }) => {
            this.tokenService.saveToken(token);
          }),
          mergeMap((token) => this.authService.fetchUser(token)),
          mergeMap((user) => ([
              setUser({ payload: user }),
              loginSuccess(),
            ])
          ),
          catchError(error => handleLoginError(error)),
        )),
    ),
  );

  loginRedirect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LOGIN_SUCCESS),
        tap(() => {
          this.router.navigateByUrl('/courses');
        })
      ),
    { dispatch: false },
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AUTO_LOGIN),
      map(() => this.tokenService.getToken()),
      mergeMap((token) => {
        if (!token) {
          return of(clearAuth());
        }
        return this.authService.fetchUser({ token })
          .pipe(
            map((user) => setUser({ payload: user }))
          );
      }),
      catchError(() => of(clearAuth())),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGOUT),
      tap(() => {
        this.router.navigateByUrl('/login');
      }),
      map(() => clearAuth()),
    ),
  );

  clearAuth$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CLEAR_AUTH),
        tap(() => {
          this.tokenService.clearToken();
        }),
      ),
    { dispatch: false },
  );
}
