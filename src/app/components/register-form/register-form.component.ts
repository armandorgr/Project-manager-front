import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmPasswordValDirective } from '../../directives/validations/confirm-password-val.directive';
import { PasswordValDirective } from '../../directives/validations/password-val.directive';
import { MatListModule } from '@angular/material/list';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpResponse } from '@angular/common/http';
import {
  ModalDialogComponent,
  ModalDialogData,
} from '../modal/modal.component';
import { ApiResponse, RegisterRequest } from '../../model';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    FormsModule,
    ConfirmPasswordValDirective,
    PasswordValDirective,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  constructor(private readonly dialog: MatDialog) {}
  private readonly router: Router = inject(Router);
  authenticationService = inject(AuthenticationService);
  userData: RegisterRequest = {
    username: '',
    email: '',
    password: '',
  };
  confirmPassword: string = '';
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  submitting = signal(false);
  submitted = signal(false);

  resetPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  private showResponseModal(response: HttpResponse<ApiResponse<null>>) {
    const data: ModalDialogData = {
      icon: response.status === 201 ? 'check' : 'error',
      iconClass: response.status === 201 ? 'success' : 'error',
      message: response.body?.message || 'Undefined',
      actions:
        response.status === 201
          ? [
              {
                label: 'Ir a login',
                color: 'primary',
                action: 'custom',
                value: '/login',
              },
            ]
          : [{ label: 'Volver a intentarlo', color: 'warn', action: 'close' }],
    };

    const dialogRef = this.dialog.open(ModalDialogComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === '/login') {
        this.router.navigateByUrl(result);
      } else {
        this.resetPage();
      }
    });
  }

  onSubmit() {
    this.submitting.update((value) => !value);
    this.authenticationService.register(this.userData).subscribe((response) => {
      // Request has ended
      this.submitting.update((value) => !value);
      this.submitted.set(true);
      this.showResponseModal(response);
    });
  }
  toggleVisibility(e: number) {
    if (e === 0) {
      this.hidePassword.update((value) => !value);
    } else if (e === 1) {
      this.hideConfirmPassword.update((value) => !value);
    }
  }
}
