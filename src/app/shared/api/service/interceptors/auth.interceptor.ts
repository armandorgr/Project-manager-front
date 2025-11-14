import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si es un error 401 y no es la petición de refresh
      if (error.status === 401 && !req.url.includes('/auth/refresh')) {
        // Intentar refresh del token
        return authService.refresh().pipe(
          switchMap(() => {
            // Si el refresh fue exitoso, reintentar la petición original
            return next(req);
          }),
          catchError((refreshError: HttpErrorResponse) => {
            // Si el refresh falla con 403, redirigir al login
            if (refreshError.status === 403) {
              router.navigate(['/login']);
            }
            return throwError(() => refreshError);
          })
        );
      }

      // Si es un 403 en el refresh, redirigir al login
      if (error.status === 403 && req.url.includes('/auth/refresh')) {
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
