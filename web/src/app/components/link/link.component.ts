import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'tara-link',
  template: `<a [routerLink]="href" tabindex="0" (keydown.enter)="navigate($event)" (keydown.space)="navigate($event)"><ng-content></ng-content></a>`,
  styles: `a {
    color: var(--primary);
    text-decoration: none;
    display: block;
    &:focus {
      outline: 2px solid var(--accent-fg);
    }
  }`,
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class LinkComponent {
  @Input() href: string | any[] | null | undefined;
  router = inject(Router);
  navigate($event: Event) {
    if (!this.href) return;
    this.router.navigate([...this.href]);
    $event.stopPropagation()
  }
}