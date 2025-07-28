import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { authGuard } from '../core/guards/auth-guard';
import { TestErrors } from '../features/test-errors/test-errors';
import { NotFound } from '../shared/errors/not-found/not-found';
import { ServerError } from '../shared/errors/server-error/server-error';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    loadChildren:() => import('./feature.routes').then(m => m.featureRoutes)
  },
  {
    path:'errors',
    component: TestErrors
  },
  {
    path:'server-error',
    component: ServerError
  },
  {
    path: '**',
    component: NotFound
  },
];
