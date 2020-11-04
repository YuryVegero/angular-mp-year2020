import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';
import { LoginCredentials, UserResponse } from './auth.model';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userChanged = new EventEmitter<User>();

  private currentUser: User;

  constructor(
    private storage: LocalStorageService,
    private router: Router
  ) {
  }

  login({ email, password }: LoginCredentials): User {
    // sign in api call goes here
    const response: UserResponse = {
      email,
      id: Date.now().toString(),
      token: 'token',
    };
    return this.saveUser(response);
  }

  logout(): boolean {
    this.saveUser();
    this.router.navigateByUrl('/login');
    console.log('logout');
    return true;
  }

  autoLogin(): void {
    const loadedUser: User = this.loadUser();
    if (loadedUser?.accessToken) {
      this.currentUser = loadedUser;
      this.userChanged.emit(this.currentUser);
    }
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  private saveUser(userData?: UserResponse): User {
    if (userData) {
      this.currentUser = Object.freeze(new User(userData.id, userData.email, userData.token));
      this.storage.set('user', this.currentUser);
    } else {
      this.currentUser = null;
      this.storage.remove('user');
    }

    this.userChanged.emit(this.currentUser);
    return this.currentUser;
  }

  private loadUser(): User {
    const userData: UserResponse = this.storage.get('user');
    if (userData) {
      return Object.freeze(new User(userData.id, userData.email, userData.token));
    }
    return null;
  }
}
