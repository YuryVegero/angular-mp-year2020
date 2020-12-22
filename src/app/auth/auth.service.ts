import { Injectable } from '@angular/core';
import { User } from 'app/auth/user.model';
import { LoginRequest, Token } from 'app/auth/auth.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authPrefix = '/auth';

  constructor(private http: HttpClient) {
  }

  login(credentials: LoginRequest): Observable<Token> {
    return this.http.post<Token>(`${this.authPrefix}/login`, credentials);
  }

  fetchUser(token: Token): Observable<User> {
    return this.http.post<User>(`${this.authPrefix}/userinfo`, token);
  }
}
