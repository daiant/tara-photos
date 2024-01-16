import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "tara-logo",
  template: `<a routerLink="/" class="title" tabindex="1" (keydown.enter)="gotoIndex()" (keydown.space)="gotoIndex()">
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
    border-radius: 3px;
    &:focus, &:active {
      outline: 2px solid var(--accent-fg);  
    }
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
  router = inject(Router)
  gotoIndex() {
    this.router.navigate(['/']);
  }

}