import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  menuItems = [
    { label: 'Projects', icon: 'folder', route: '/home/projects' },
    {
      label: 'Assigned Tasks',
      icon: 'assignment',
      route: '/home/assigned-tasks',
    },
    { label: 'Invitations', icon: 'mail', route: '/home/invitations' },
  ];

  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al cerrar sesión:', error);
        // Redirigir al login incluso si hay error
        this.router.navigate(['/login']);
      },
    });
  }
}
