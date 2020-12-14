import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from 'app/core/services/loading.service';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private reqCount = 0;

  constructor(private loadingService: LoadingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.reqCount === 0) {
      this.loadingService.setLoading(true);
    }
    this.reqCount += 1;

    return next.handle(request).pipe(
      // delay(1000), // emulate delay
      finalize(() => {
        this.reqCount -= 1;
        if (this.reqCount === 0) {
          this.loadingService.setLoading(false);
        }
      }));
  }
}
