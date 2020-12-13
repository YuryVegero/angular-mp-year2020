import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'app/auth/auth.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/app.reducer';
import { login } from 'app/auth/store/auth.actions';
import { authSelector } from 'app/auth/store/auth.selectors';

@Component({
  selector: 'mp-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;

  credentials: LoginRequest = {
    login: '',
    password: '',
  };
  error: string = null;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.storeSub = this.store.select(authSelector).subscribe(authState => {
      this.error = authState.error;
    });
  }

  onSubmit(): void {
    this.store.dispatch(login({ payload: { ...this.credentials } }));
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
