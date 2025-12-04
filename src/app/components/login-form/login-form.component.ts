import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DialogService } from '../../shared/service/dialog.service';
import { LoginRequest } from '../../model';

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
    private readonly dialogService: DialogService,
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

  onSubmit() {
    this.submitting.update((value) => !value);
    this.authenticationService.login(this.request).subscribe((res) => {
      this.submitting.update((value) => !value);
      this.submitted.set(true);
      this.dialogService
        .openResponseDialog(
          res,
          res.ok ? 'Login successful' : 'Error trying to log in'
        )
        .subscribe(() => {
          this.submitting.set(false);
          this.submitted.set(false);
          if (res.ok) {
            this.router.navigateByUrl('/home');
          }
        });
    });
  }

  toggleVisibility() {
    this.hidePassword.update((v) => !v);
  }
}
