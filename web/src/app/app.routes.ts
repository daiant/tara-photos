import { Routes } from '@angular/router';
import { TrashComponent } from './views/trash/trash.component';
import { ImagesComponent } from './views/images/list/images.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { ImageDetailsComponent } from './views/images/details/image-details.component';

export const routes: Routes = [
  { path: "trash", component: TrashComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "photo/:id", component: ImageDetailsComponent },
  { path: "", component: ImagesComponent },
];
