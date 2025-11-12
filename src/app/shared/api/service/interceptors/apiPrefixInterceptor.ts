import {
  HttpInterceptorFn,
} from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

export const ApiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  const apiRequest = req.clone({ url: `${environment.apiUrl}${req.url}` });
  return next(apiRequest);
};
