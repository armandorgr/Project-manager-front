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

  // HOME → Layout container
  {
    path: 'home',
    loadComponent: () =>
      import('./components/pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    title: 'Home',
    canActivate: [authGuard],
    children: [
      // ─────────────────────────────
      // PROJECTS LIST
      // /home/projects
      // ─────────────────────────────
      {
        path: 'projects',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './components/pages/projects-page/projects-page.component'
              ).then((m) => m.ProjectsPageComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './components/project-details/project-details.component'
              ).then((m) => m.ProjectDetailsComponent),
          },
          {
                path: ':id/tasks/:taskId',
                loadComponent: () =>
                  import(
                    './components/pages/task-details-page/task-details-page.component'
                  ).then((m) => m.TaskDetailsPageComponent),
              },
        ],
      },

      // ─────────────────────────────
      // ASSIGNED TASKS PAGE
      // ─────────────────────────────
      {
        path: 'assigned-tasks',
        loadComponent: () =>
          import(
            './components/pages/assigned-tasks-page/assigned-tasks-page.component'
          ).then((m) => m.AssignedTasksPageComponent),
      },

      // ─────────────────────────────
      // INVITATIONS
      // ─────────────────────────────
      {
        path: 'invitations',
        loadComponent: () =>
          import(
            './components/pages/invitations-page/invitations-page.component'
          ).then((m) => m.InvitationsPageComponent),
      },

      // Redirect to /home/projects
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
      },
    ],
  },

  // Redirect root to /home
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
