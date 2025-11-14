import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './shared/api/guards';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register-form/register-form.component').then(
        (m) => m.RegisterFormComponent
      ),
    title: 'Registro',
    canActivate: [publicGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login-form/login-form.component').then(
        (m) => m.LoginFormComponent
      ),
    title: 'Inicio de sesión',
    canActivate: [publicGuard],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    title: 'Home',
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
