import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiResponse, RegisterRequest } from '../model';
import { BaseService } from '../shared/api/service/api.base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  public register(
    request: RegisterRequest
  ): Observable<HttpResponse<ApiResponse<null>>> {
    return this.httpClient
      .request<ApiResponse<null>>('post', '/auth/register', {
        context: new HttpContext(),
        headers: new HttpHeaders(),
        body: request,
        responseType: 'json',
        observe: 'response',
      })
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }
}
