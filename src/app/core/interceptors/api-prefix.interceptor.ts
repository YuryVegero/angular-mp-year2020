import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url } = request;
    if (url.startsWith('/api')) {
      request = request.clone({
        url: environment.apiBase + url.replace('/api', ''),
      });
    }
    return next.handle(request);
  }
}
