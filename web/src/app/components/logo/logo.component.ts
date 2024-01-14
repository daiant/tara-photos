import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "tara-logo",
  template: `<a routerLink="/" class="title">
    <img src="/assets/logo.svg" alt="logo"/>
    <h1>Tara photos</h1>
    </a>`,
  styles: `
  a {
    color: unset;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
    h1 {
      margin: 0;
      font-weight: 400; 
      font-size: var(--text-title);
    }
  }
  `,
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class LogoComopnent {

}