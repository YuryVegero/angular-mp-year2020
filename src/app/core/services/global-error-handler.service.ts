import { ErrorHandler, Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  handleError(error): void {
    let errorMessage;
    if (error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    // process error
    console.error(errorMessage);
  }
}
