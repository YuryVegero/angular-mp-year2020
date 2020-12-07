import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'app/auth';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
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
      this.authService.logout();
    }
    return throwError(error);
  }
}
