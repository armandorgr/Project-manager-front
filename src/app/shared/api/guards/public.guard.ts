import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.checkAuth().pipe(
    map((response) => {
      // Si el usuario está autenticado, redirigir a home
      if (response.status === 200) {
        router.navigate(['/home']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      // Si hay error (no autenticado), permitir acceso
      return of(true);
    })
  );
};