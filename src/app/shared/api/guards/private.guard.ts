import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.checkAuth().pipe(
    map((response) => {
      // Si el usuario está autenticado, permitir acceso
      if (response.status === 200) {
        return true;
      }
      // Si no está autenticado, redirigir a login
      router.navigate(['/login']);
      return false;
    }),
    catchError(() => {
      // Si hay error, redirigir a login
      router.navigate(['/login']);
      return of(false);
    })
  );
};