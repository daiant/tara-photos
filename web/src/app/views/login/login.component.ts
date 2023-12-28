import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "tara-login",
  template: `<h1>Login</h1><button (click)="setToken()">Set token</button>`
})
export class LoginComponent {
  router = inject(Router);
  setToken() {
    globalThis.localStorage.setItem("user", "charli");
    globalThis.localStorage.setItem("token", "uuuuuuquerandommmmmm");
    this.router.navigate(["/"])
  }

}