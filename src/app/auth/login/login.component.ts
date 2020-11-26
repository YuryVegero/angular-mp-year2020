import { Component } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router';
import { LoginCredentials } from 'app/auth/auth.model';

@Component({
  selector: 'mp-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent {
  credentials: LoginCredentials = {
    email: '',
    password: '',
  };
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  onSubmit(): void {
    const user = this.authService.login(this.credentials);
    if (user) {
      this.router.navigateByUrl('/courses');
    } else {
      this.error = 'Wrong email or password';
    }
  }
}
