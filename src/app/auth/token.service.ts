import { Injectable } from '@angular/core';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private TOKEN = 'token';

  constructor(private storage: LocalStorageService) {
  }

  getToken(): string {
    return this.storage.get(this.TOKEN);
  }

  saveToken(token: string): void {
    this.storage.set(this.TOKEN, token);
  }

  clearToken(): void {
    this.storage.remove(this.TOKEN);
  }
}
