import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "../../../lib/token/token.service";

@Component({
  template: ""
})
export class LogoutComponent implements OnInit {
  router = inject(Router)
  tokenService = inject(TokenService)
  ngOnInit(): void {
    this.tokenService.deleteToken()
    this.tokenService.removeItem("user")
    globalThis.location.href = "/"
  }
}