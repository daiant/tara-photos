import { Routes } from '@angular/router';
import { TrashComponent } from './views/trash/trash.component';
import { ImagesComponent } from './views/images/images.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  { path: "trash", component: TrashComponent },
  { path: "login", component: LoginComponent },
  { path: "", component: ImagesComponent },
];
