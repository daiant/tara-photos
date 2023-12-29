import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TokenService {
  TOKEN_KEY = "token";
  persistToken(token: string): void {
    globalThis.localStorage.setItem(this.TOKEN_KEY, token);
  }
  getToken(): string | null {
    return globalThis.localStorage.getItem(this.TOKEN_KEY);
  }
  deleteToken(): void {
    globalThis.localStorage.removeItem(this.TOKEN_KEY);
  }
  removeItem(key: string): void {
    globalThis.localStorage.removeItem(key);
  }
  getItem(key: string): string | null {
    return globalThis.localStorage.getItem(key);
  }
  persistItem(key: string, value: string) {
    return globalThis.localStorage.setItem(key, value);
  }

}
