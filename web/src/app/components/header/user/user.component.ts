import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { TokenService } from "../../../../lib/token/token.service";

@Component({
  selector: "tara-header-user",
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.css",
  standalone: true,
  imports: [CommonModule]
})
export class HeaderUserComponent {
  tokenService = inject(TokenService);
  get user(): string {
    const idToken = this.tokenService.getItem("user")
    if (!idToken) return ""
    return this.getUserByToken(idToken)?.Username ?? ""
  }
  getUserByToken(token: string): { Username: string } | undefined {
    const user_info = atob(token.split(".")[1])
    try {
      return JSON.parse(user_info);
    } catch (error) {
      return undefined;
    }
  }
}