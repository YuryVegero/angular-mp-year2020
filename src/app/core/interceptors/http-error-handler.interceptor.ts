import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/app.reducer';
import { logout } from 'app/auth/store/auth.actions';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        catchError(error => this.handleError(error)),
      );
  }

  private handleError(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (error.status === 401) {
      this.store.dispatch(logout());
    }
    return throwError(error);
  }
}
