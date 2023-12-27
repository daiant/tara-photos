import { Routes } from '@angular/router';
import { TrashComponent } from './views/trash/trash.component';
import { ImagesComponent } from './views/images/images.component';

export const routes: Routes = [
  { path: "trash", component: TrashComponent },
  { path: "", component: ImagesComponent },
];
