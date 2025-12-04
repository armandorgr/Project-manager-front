import { HttpResponse } from '@angular/common/http';
import { ApiResponse } from './auth';
import { Observable } from 'rxjs';

export type ApiResponseSuccess<T> = HttpResponse<ApiResponse<T>>;
export type ApiResponseError = HttpResponse<ApiResponse<null>>;
export type ApiCall<T> = Observable<ApiResponseSuccess<T> | ApiResponseError>;
