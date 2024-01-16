import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { LinkComponent } from "../link/link.component";

@Component({
  selector: "tara-aside",
  templateUrl: "./aside.component.html",
  styleUrl: "./aside.component.css",
  standalone: true,
  imports: [CommonModule, LinkComponent]
})
export class AsideComponent {
  isCurrentLink(link: string): boolean {
    return link === this.pathname;
  }
  router = inject(Router);
  pathname?: string;
  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this._checkUrl(val.url);
      }
    });
    this._checkUrl(this.router.url);
  }
  _checkUrl(url: string) {
    const pathname = new URL("http://test.com" + url).pathname;
    this.pathname = pathname;
  }
}