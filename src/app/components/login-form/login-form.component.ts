import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiResponse, LoginRequest } from '../../model';
import { AuthenticationService } from '../../services/authentication.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';
import {
  ModalDialogComponent,
  ModalDialogData,
} from '../modal/modal.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    FormsModule,
    MatProgressSpinner,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  constructor(
    private readonly dialog: MatDialog,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}
  submitting = signal(false);
  submitted = signal(false);
  hidePassword = signal(true);

  request: LoginRequest = {
    username: '',
    password: '',
  };

  private showResponseModal(response: HttpResponse<ApiResponse<null>>) {
    const data: ModalDialogData = {
      icon: response.status === 200 ? 'check' : 'error',
      iconClass: response.status === 200 ? 'success' : 'error',
      message: response.body?.message || 'Undefinied',
      actions:
        response.status === 200
          ? [
              {
                label: 'Ir a Home',
                action: 'custom',
                value: '/home',
              },
            ]
          : [
              {
                label: 'Intentar de nuevo',
                action: 'close',
              },
            ],
    };

    const dialogRef = this.dialog.open(ModalDialogComponent, { data });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.router.navigateByUrl(res);
      } else {
        this.submitted.set(false);
        this.submitting.set(false);
      }
    });
  }

  onSubmit() {
    this.submitting.update((value) => !value);
    this.authenticationService.login(this.request).subscribe((res) => {
      this.submitting.update((value) => !value);
      this.submitted.set(true);
      this.showResponseModal(res);
    });
  }

  toggleVisibility() {
    this.hidePassword.update((v) => !v);
  }
}
