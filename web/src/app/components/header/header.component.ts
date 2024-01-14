import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { UploadComponent } from "../upload/upload.component";
import { HeaderUserComponent } from "./user/user.component";
import { LogoComopnent } from "../logo/logo.component";

@Component({
  selector: "tara-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
  standalone: true,
  imports: [CommonModule, UploadComponent, HeaderUserComponent, LogoComopnent]
})
export class HeaderComponent {
}