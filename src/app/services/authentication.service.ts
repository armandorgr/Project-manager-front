import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiResponse, LoginRequest, RegisterRequest } from '../model';
import { BaseService } from '../shared/api/service/api.base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  register(
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

  login(request: LoginRequest): Observable<HttpResponse<ApiResponse<null>>> {
    return this.httpClient
      .request<ApiResponse<null>>('post', '/auth/login', {
        context: new HttpContext(),
        headers: new HttpHeaders(),
        body: request,
        responseType: 'json',
        observe: 'response',
        withCredentials: true,
      })
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }

  checkAuth(): Observable<HttpResponse<ApiResponse<null>>> {
    return this.httpClient
      .request<ApiResponse<null>>('get', '/auth/me', {
        context: new HttpContext(),
        headers: new HttpHeaders(),
        responseType: 'json',
        observe: 'response',
        withCredentials: true,
      })
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }
  
  refresh(): Observable<HttpResponse<ApiResponse<null>>> {
    return this.httpClient
      .request<ApiResponse<null>>('post', '/auth/refresh', {
        context: new HttpContext(),
        headers: new HttpHeaders(),
        responseType: 'json',
        observe: 'response',
        withCredentials: true,
      })
      .pipe(catchError(this.handleErrors<ApiResponse<null>>));
  }


}
