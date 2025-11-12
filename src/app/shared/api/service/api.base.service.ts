import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

export class BaseService {
  protected handleErrors<T>(err: HttpErrorResponse) {
    const response = new HttpResponse<T>({
      body: err.error,
      status: err.status,
      statusText: err.statusText,
    });
    return of(response);
  }
}
