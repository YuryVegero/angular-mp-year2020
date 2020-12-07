import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/auth/user.model';
import { LoginRequest, Token } from 'app/auth/auth.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { TokenService } from 'app/auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authPrefix = '/auth';

  private userSubject = new BehaviorSubject<User>({} as User);
  public user$ = this.userSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject(undefined);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
    this.fetchUser = this.fetchUser.bind(this);
    this.setAuth = this.setAuth.bind(this);
  }

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<Token>(`${this.authPrefix}/login`, credentials)
      .pipe(
        tap(({ token }) => {
          this.tokenService.saveToken(token);
        }),
        mergeMap(this.fetchUser),
      );
  }

  logout(): void {
    this.clearAuth();
    this.router.navigateByUrl('/login');
  }

  autoLogin(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.fetchUser({ token } as Token)
        .subscribe(
          this.setAuth,
          this.clearAuth,
        );
    } else {
      this.clearAuth();
    }
  }

  private fetchUser(token: Token): Observable<User> {
    return this.http.post<User>(`${this.authPrefix}/userinfo`, token)
      .pipe(tap(this.setAuth));
  }

  private setAuth(user: User): void {
    this.userSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private clearAuth(): void {
    this.tokenService.clearToken();
    this.userSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }
}
