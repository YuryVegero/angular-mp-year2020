import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'app/auth/auth.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mp-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnDestroy {
  private loginSub: Subscription;

  credentials: LoginRequest = {
    login: '',
    password: '',
  };
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  onSubmit(): void {
    this.loginSub = this.authService.login(this.credentials)
      .subscribe(
        () => {
          this.router.navigateByUrl('/courses');
        },
        () => {
          this.error = 'Wrong email or password';
        }
      );
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
