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
import { DialogService } from '../../shared/service/dialog.service';
import { RegisterRequest } from '../../model';
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
  private readonly router: Router = inject(Router);
  private readonly dialogService = inject(DialogService);
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

  onSubmit() {
    this.submitting.update((value) => !value);
    this.authenticationService.register(this.userData).subscribe((response) => {
      // Request has ended
      this.submitting.update((value) => !value);
      this.submitted.set(true);
      this.dialogService
        .openResponseDialog(
          response,
          response.ok ? 'Registration Successful.' : 'Error trying to register.'
        )
        .subscribe(() => {
          if (response.ok) {
            this.router.navigateByUrl('/login');
          }
        });
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
