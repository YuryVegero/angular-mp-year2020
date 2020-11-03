import { Component } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mp-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  onSubmit(): void {
    this.authService.login({ email: this.email, password: this.password });
    this.router.navigateByUrl('/');
  }
}
