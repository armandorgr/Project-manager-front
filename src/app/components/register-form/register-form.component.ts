import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ConfirmPasswordValDirective } from '../../directives/validations/confirm-password-val.directive';
import { User } from '../../model/auth/user';
import { PasswordValDirective } from '../../directives/validations/password-val.directive';
import { MatListModule} from '@angular/material/list';
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
    JsonPipe, 
    ConfirmPasswordValDirective,
    PasswordValDirective,
    MatListModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  userData:User = {
    username: "",
    email: "",
    password:""
  }
  confirmPassword:string = "";
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  toggleVisibility(e: number) {
    if (e === 0) {
      this.hidePassword.update((value) => !value);
    } else if (e === 1) {
      this.hideConfirmPassword.update((value) => !value);
    }
  }
}
